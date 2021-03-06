import StarRating, { rate } from "./StarRating";
import { useEffect, useState } from "react";
import {STATE_CHANGED ,firestore, serverTimestamp, storage } from '../lib/firebase';

let newRating = 0;
let oldRating = 0;

interface Details {
    name: string;
    rate: number;
}

function Cards( props: {
    name: string,
    artist: string,
    rate: number,
    cover: string,
} ) {
    oldRating = ((props.rate == NaN) ? 0 : props.rate);
    const [cardDetails, setCardDetails] = useState<Details>({} as Details);


    async function updateRating(finalRating: number) {
        let rating = finalRating;

        const songRef = firestore.collection('songs').where('name', '==', props.name).get();
        songRef.then(snapshot => {
            snapshot.forEach(doc => {
                // console.log(doc.data().name);
                if (doc.data().name == cardDetails.name) {
                    firestore.collection('songs').doc(doc.id).update({
                        rate: rating
                    });
                }
            });
        });
    }

    useEffect(() => {
        newRating = (oldRating + cardDetails.rate) / 2;
        updateRating((newRating == NaN) ? 0 : newRating);
    }, [cardDetails.rate]);

    return(
        <a className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
            <div className="py-3 px-2 w-full flex item-center justify-center">
                <img className="w-20 h-20 rounded-full mr-4" src={props?.cover || "/profile.jpg"} alt=""/>
            </div>
            <div className="pb-4 w-full flex item-center justify-center">
            <div className="flex flex-col item-center justify-between">

                    <div className="flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-1.235-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                        </svg>
                        <span className="text-2xl text-gray-600">{props.rate}</span>

                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="ml-4">
                        <h3 className="text-xl font-bold">{props.name}</h3>
                        <p className="text-gray-600">{props.artist}</p>
                    </div>
                </div>

            </div>
            <div
                className="flex justify-center self-center items-center"
                onClick={() => {
                    setCardDetails({
                    name: props.name,
                    rate: (rate == 0) ? props.rate : rate,
                    })
                }}
            >
                <StarRating />
            </div>
        </a>
    )
}

export default Cards;

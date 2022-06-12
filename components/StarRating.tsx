import { useEffect, useState } from "react";

export var rate = 0;
function StarRating() {
    const [rating, setRating] = useState(0);

    useEffect(() => {
        rate = rating;
        // console.log(rating);
    }, [rating]);

    return(
        <>
        <div className="rating text-2xl">
            {
                [5,4,3,2,1].map(i => {
                    return(
                        <span
                            key={i}
                            onClick={() => setRating(i)}
                        >
                            ☆
                        </span>
                    )
                })
            }
        </div>
        </>
    )
}

export default StarRating;

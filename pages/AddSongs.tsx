import Head from 'next/head'
import NavBar from '../components/NavBar'
import { MultiSelect } from "react-multi-select-component";
import { useState } from 'react';
import Link from 'next/link';
import {STATE_CHANGED ,firestore, serverTimestamp, storage } from '../lib/firebase';

interface Options {
    label: string;
    value: string;
}

export const getServerSideProps = async () => {
    let options: Options[] = [];
    try {
        const snapshot = await firestore.collection('artists').get();
        snapshot.forEach(doc => {
            options.push({
                label: doc.data().name,
                value: doc.id
            });
        }
        );

    } catch (error) {
        console.log(error);
    }
    return {
        props: {
            options
        }
    }
}
interface Artists {
    label: string;
}

function listToString(list: Artists[]) {
    let str = '';
    list.forEach(artist => {
        str += artist.label + ', ';
    });
    return str;
}

function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function AddSongs({ options }: { options: Options[] }) { 
    const [selected, setSelected] = useState([]);
    const [songName, setSongName] = useState('');
    const [dateReleased, setDateReleased] = useState('');
    // TODO: image artwork
    const [artwork, setArtwork] = useState<File>();
    const [artworkAsUrl, setArtworkAsUrl] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(`${songName} was added to the database`);
        const songRef = firestore.collection('songs').doc();
        songRef.set({
            name: songName,
            dateReleased: dateReleased,
            artwork: artworkAsUrl,
            rate: randomNumber(1, 5),
            createdAt: serverTimestamp(),
            artists: listToString(selected).substring(0, listToString(selected).length - 2)
        });
        setSongName('');
        setDateReleased('');
        setArtwork(undefined);
        setSelected([]);
    }

    const uploadFile = async (file: any) => {
        const fileRef = storage.ref(`images/${file.name}`);
        const snapshot = await fileRef.put(file);
        const url = await snapshot.ref.getDownloadURL();
        return url;
    }
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSongName(e.target.value);
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateReleased(e.target.value);
    }

    const handleArtworkChange = (e: any) => {
        setArtwork(e.target.files[0]);
        uploadFile(e.target.files[0]).then(url => {
            setArtworkAsUrl(url);
        });
        console.log(artworkAsUrl);
    }

    const handleSelectChange = (selected: []) => {
        setSelected(selected);
    }

    return (
        <>
            <NavBar />
            <div className='px-16 py-6 w-full flex justify-between self-center'>
                <div>
                    <h1 className="text-3xl font-bold text-gray-700">
                        Adding a New Song
                    </h1>
                </div>
            </div>
                

            <div className="flex min-h-screen flex-col items-center py-2">

                <Head>
                    <title>Add Songs</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                
                
                <form onSubmit={handleSubmit}>
                    <div className="flex w-full m-4">
                        <label className="w-1/2 block text-gray-700 text-2xl font-bold px-3 py-2">
                            Song Name
                        </label>
                        
                        <input 
                        className="w-1/2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="name" 
                        type="text"
                        value={songName}
                        onChange={handleNameChange} 
                        placeholder="Name" 
                        required/>
                    </div>
                    <div className="flex w-full m-4">
                        <label className="w-1/2 block text-gray-700 text-2xl font-bold px-3 py-2">
                            Date Released
                        </label>
                        <input 
                        className="w-1/2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="date" 
                        type="text"
                        value={dateReleased}
                        onChange={handleDateChange} 
                        placeholder="DD/MM/YYYY" 
                        required/>
                    </div>
                    <div className="flex w-full m-4">
                        <label className="w-1/2 block text-gray-700 text-2xl font-bold px-3 py-2">
                            Artwork
                        </label>
                        <input 
                        className="w-1/2 shadow appearance-none border rounded py-2 px-3 bg-gray-400 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="image"
                        onChange={handleArtworkChange}
                        type="file" /> 

                    </div>
                    <div className="flex w-full m-4">
                        <label className="w-1/3 block text-gray-700 text-2xl font-bold px-3 py-2">
                            Artist
                        </label>
                        <MultiSelect
                            className='w-1/2'
                            options={options}
                            value={selected}
                            onChange={setSelected}
                            labelledBy="Select"
                        />
                        <Link href={"/AddArtist"}>
                            <button className="ml-2 px-1 py-1 w-1/5 h-10 bg-gray-700 text-white text-sm font-bold rounded" type='button'>
                                Add Artist
                            </button>
                        </Link>
                    </div>

                    <div className="flex w-full m-4 justify-evenly">
                        <Link href={"/"}>
                            <button className="w-1/4 shadow appearance-none border rounded py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="button">
                                Cancel
                            </button>
                        </Link>
                        <button className="w-1/3 shadow appearance-none border rounded py-2 px-3 bg-gray-400 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="submit">
                            Submit
                        </button>
                    </div>
                </form>

                <footer className="flex mt-20 h-24 w-full items-center justify-center border-t">
                    <a
                    className="flex items-center justify-center gap-2 "
                    href="https://github.com/Dipendra-creator/DeltaX"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Created by{' '}
                    <a className='text-blue-600'>
                        Dipendra Bhardwaj
                    </a>
                    </a>
                </footer>
                
            </div>
        </>
    );
};

export default AddSongs;


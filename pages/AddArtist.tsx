import type { NextPage } from 'next'
import Head from 'next/head'
import NavBar from '../components/NavBar'
import { MultiSelect } from "react-multi-select-component";
import { useState } from 'react';
import Link from 'next/link';

const options = [
    { label: "Lewis Cadaver", value: "Lewis Cadaver" },
    { label: "The Weeknd", value: "The Weeknd" },
    { label: "Kanye West", value: "Kanye West" },
    { label: "Kendrick Lamar", value: "Kendrick Lamar" },
    { label: "Lewisd Cadaver", value: "Ledwis Cadaver" },
    { label: "The Weedknd", value: "The dWeeknd" },
    { label: "Kanyde West", value: "Kanye Wedst" },
    { label: "Kenddrick Lamar", value: "Kenddrick Lamar" },
];

const AddArtist: NextPage = () => { 
    const [selected, setSelected] = useState([]);
    
    return (
        <>
            <NavBar />
            <div className='px-16 py-6 w-full flex justify-between self-center'>
                <div>
                    <h1 className="text-3xl font-bold text-gray-700">
                        Adding a New Artist
                    </h1>
                </div>
            </div>
                

            <div className="flex min-h-screen flex-col items-center py-2">

                <Head>
                    <title>Add Artist</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                
                
                <form>
                    <div className="flex w-full m-4">
                        <label className="w-1/2 block text-gray-700 text-2xl font-bold px-3 py-2">
                            Artist Name
                        </label>
                        
                        <input className="w-1/2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="ArtistName" type="text" placeholder="Name" required/>
                    </div>
                    <div className="flex w-full m-4">
                        <label className="w-1/2 block text-gray-700 text-2xl font-bold px-3 py-2">
                            Date of Birth
                        </label>
                        <input className="w-1/2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="dob" type="date" required/>
                    </div>
                    <div className="flex w-full m-4">
                        <label className="w-1/2 block text-gray-700 text-2xl font-bold px-3 py-2">
                            Bio
                        </label>
                        <textarea className="w-1/2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bio" /> 
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
                        <Link href={"/AddSongs"}>
                            <button className="w-1/4 shadow appearance-none border rounded py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="button">
                                Add Songs
                            </button>
                        </Link>
                    </div>
                </form>

                <footer className="flex mt-20 h-24 w-full items-center justify-center border-t">
                    <a
                    className="flex items-center justify-center gap-2 "
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
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

export default AddArtist;


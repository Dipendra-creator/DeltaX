import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import NavBar from '../components/NavBar'
import Cards from "../components/Cards";
import Link from 'next/link';

const Home: NextPage = () => {
  const songsList = [
    {
      name: 'The Best of Me',
      artist: 'The Weeknd',
      rate: '4.5',
      cover: 'https://online.berklee.edu/takenote/wp-content/uploads/2019/03/killerHooks-1920x1200.png',
    },
    {
      name: 'The Hills',
      artist: 'The Weeknd',
      rate: '4.5',
      cover: 'https://online.berklee.edu/takenote/wp-content/uploads/2019/03/killerHooks-1920x1200.png',
    },
    {
      name: 'The Best of Me',
      artist: 'The Weeknd',
      rate: '4.5',
      cover: 'https://online.berklee.edu/takenote/wp-content/uploads/2019/03/killerHooks-1920x1200.png',
    },
    {
      name: 'The Hills',
      artist: 'The Weeknd',
      rate: '4.5',
      cover: 'https://online.berklee.edu/takenote/wp-content/uploads/2019/03/killerHooks-1920x1200.png',
    },
  ]

  return (
    <>
      <NavBar />

      <div className="flex min-h-screen flex-col items-center justify-center py-2">

      <Head>
        <title>HOME</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='px-16 py-6 w-full flex justify-between self-center'>
        <div>
          <h1 className="text-3xl font-bold">
            Top{' '}
            <a className="text-blue-600">
              10{" "}
            </a>
            Songs
          </h1>
        </div>
        <div>
          <Link href="/AddSongs">
          <a className="flex py-2 px-3 bg-gray-700 items-center justify-center self-center text-white text-3xl rounded-xl">
            {/* Add Song + */}
            Add Songs
            <svg className="w-6 h-6 ml-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </a>
          </Link>
        </div>
      </div>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">

        <div className="mt-6 flex max-w-8xl flex-wrap items-center justify-around sm:w-full">
          
          {songsList.map((song, index) => (
            <Cards
              key={index}
              name={song.name}
              artist={song.artist}
              rate={song.rate}
              cover={song.cover}
            />
          ))}
          
        </div>
      </main>

      <div className='mt-6 px-16 py-6 w-full flex justify-between self-center'>
        <div>
          <h1 className="text-3xl font-bold">
            New{' '}
            <a className="text-blue-600">
              Songs
            </a>
          </h1>
        </div>
      </div>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">

        <div className=" flex max-w-8xl flex-wrap items-center justify-around sm:w-full">
          
          {songsList.map((song, index) => (
            <Cards
              key={index}
              name={song.name}
              artist={song.artist}
              rate={song.rate}
              cover={song.cover}
            />
          ))}
          
        </div>
      </main>

      <footer className="mt-20 flex h-24 w-full items-center justify-center border-t">
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
    
  )
}

export default Home

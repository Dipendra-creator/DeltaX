import Head from 'next/head'
import NavBar from '../components/NavBar'
import Cards from "../components/Cards";
import Link from 'next/link';
import { firestore, serverTimestamp } from '../lib/firebase';
import {rate} from "../components/StarRating";

interface SongsList {
    name: string;
    artist: string;
    rate: number;
    cover: string;
    dateReleased: string
}

export const getServerSideProps = async () => {
    let songsList: SongsList[] = [];
    try {
        const snapshot = await firestore.collection('songs').get();
        snapshot.forEach(doc => {
            songsList.push({
                name: doc.data().name,
                artist: doc.data().artists,
                rate: doc.data().rate,
                cover: doc.data().artwork,
                dateReleased: doc.data().dateReleased
            });
        });
    } catch (error) {
        console.log(error);
    }
    return {
        props: {
            songsList
        }
    }
}

// time days count DD/MM/YYYY upto now
function timeDiff(previous: string) {
    const now = new Date();
    const previousDate = new Date(previous);
    const diff = now.getTime() - previousDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days;
}

function Home ({ songsList }: { songsList: SongsList[] }) {

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
          <span className="flex py-2 px-3 bg-gray-700 items-center justify-center self-center text-white text-3xl rounded-xl">
            {/* Add Song + */}
            Add Songs
            <svg className="w-6 h-6 ml-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </span>
          </Link>
        </div>
      </div>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">

        <div className="mt-6 flex max-w-8xl flex-wrap items-center justify-around sm:w-full">

        {songsList.sort((a,b) => b.rate - a.rate ).map((song, index) => (
            <Cards
              key={index}
              name={song.name}
              artist={song.artist}
              rate={song?.rate || 0}
              cover={song.cover}
            />
          ))}
        </div>
      </main>

      <div className='mt-6 px-16 py-6 w-full flex justify-between self-center'>
        <div>
          <h1 className="text-3xl font-bold">
            New{' '}
            <span className="text-blue-600">
              Songs
            </span>
          </h1>
        </div>
      </div>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">

        <div className=" flex max-w-8xl flex-wrap items-center justify-around sm:w-full">

          {/* Show newly uploaded songs according to dateReleased 08/12/2021*/}
          {songsList.sort((a,b) => timeDiff(b.dateReleased) - timeDiff(a.dateReleased) ).map((song, index) => (
            <Cards
              key={index}
              name={song.name}
              artist={song.artist}
              rate={song?.rate || 0}
              cover={song.cover}
            />
          ))}
        </div>
      </main>

      <footer className="mt-20 flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2 "
          href="https://github.com/Dipendra-creator/DeltaX"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by{' '}
          <span className='text-blue-600'>
            Dipendra Bhardwaj
          </span>
        </a>
      </footer>
    </div>
    </>

  )
}

export default Home

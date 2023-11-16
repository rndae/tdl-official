import "tailwindcss/tailwind.css";
import Head from 'next/head';
import { signIn } from 'next-auth/react'
import { useState, useRef } from 'react';

const Home: React.FC = () => {
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  return (
    <div className="flex flex-col items-center justify-center">
       <Head>
          <title>TestDriveLive</title>
      </Head>
      <video
        ref={videoRef}
        onEnded={handleVideoEnd}
        className="w-full max-w-4xl rounded-lg shadow-lg"
        src="/video/tdl-preview.mp4"
        autoPlay
        controls        
      />
      <div className="flex flex-col items-center sm:items-start">
          <div className="flex items-center mt-4">
              <button 
                disabled={!videoEnded}
                onClick={() => signIn('code', { callbackUrl: `${window.location.origin}/contract` })}  
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${videoEnded ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-300'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
              Enter your code
              </button>
          </div>
      </div>
    </div>
  );
};

export default Home;

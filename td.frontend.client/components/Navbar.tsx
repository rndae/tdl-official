import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import "tailwindcss/tailwind.css";
import Image from "next/image";

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between w-full h-32 px-4 pt-4 text-gray-200 bg-transparent z-10 shadow-lg"> 
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex-shrink-0"> 
          <Link href="/" className="text-4xl font-bold ">
            <Image src="/logo/_TD_LOGO_FOR_WEB.png" alt="Logo" width={200} height={200} className="object-contain" /> 
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

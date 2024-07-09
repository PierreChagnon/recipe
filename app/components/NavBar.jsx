import React from 'react';
import Link from 'next/link';

const NavBar = () => {
    return (
        <nav className="text-gray-800 py-4 px-24 shadow-md border-b justify-center lg:flex hidden border-gray-300">
            <div className="container flex justify-between items-center">
                <Link className="text-lg" href='/'>The Diversity and Variability of Fictions</Link>
                <div className="flex space-x-4 font-light">
                    <a href="#table" className="hover:bg-gray-200 duration-200 py-1 px-4 rounded-md">Table</a>
                    <Link href="#abstract" className="hover:bg-gray-200 duration-200 py-1 px-4 rounded-md">Abstract</Link>
                    <a href="#contributors" className="hover:bg-gray-200 duration-200 py-1 px-4 rounded-md">Contributors</a>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

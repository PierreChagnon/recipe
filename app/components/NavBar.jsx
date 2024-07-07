import React from 'react';
import Link from 'next/link';

const NavBar = () => {
    return (
        <nav className="text-gray-800 py-4 px-24 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link className="text-2xl font-bold" href='/'>Recipes</Link>
                <div className="flex space-x-4">
                    <a href="#table" className="hover:bg-gray-200 duration-200 py-1 px-4 rounded-md">Table</a>
                    <Link href="#abstract" className="hover:bg-gray-200 duration-200 py-1 px-4 rounded-md">Abstract</Link>
                    <a href="#contributors" className="hover:bg-gray-200 duration-200 py-1 px-4 rounded-md">Contributors</a>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

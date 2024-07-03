import React from 'react';
import Link from 'next/link';

const NavBar = () => {
    return (
        <nav className="bg-black text-white py-4 px-24 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link className="text-2xl font-bold" href='/'>Recipes</Link>
                <div className="flex space-x-4">
                    <a href="#table" className="hover:underline">Table</a>
                    <a href="#abstract" className="hover:underline">Abstract</a>
                    <a href="#contributors" className="hover:underline">Contributors</a>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

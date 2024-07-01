import React from 'react';
import Link from 'next/link';

const NavBar = () => {
    return (
        <nav className="bg-black text-white py-4 px-24 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link className="text-2xl font-bold" href='/'>Recipe</Link>
                <div className="flex space-x-4">
                    <a href="#home" className="hover:underline">Home</a>
                    <a href="#about" className="hover:underline">About</a>
                    <a href="#research" className="hover:underline">Research</a>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

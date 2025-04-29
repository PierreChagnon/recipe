import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <div className='px-8 py-2 gap-6 hidden lg:flex flex-col items-center justify-center border-t border-gray-300'>
            <div className='flex w-2/3 gap-24 items-center justify-around'>
                <div className='w-8 h-8 md:w-20 md:h-16 relative'>
                    <Image sizes='100px' src='/assets/funders/ANR.png' className='object-contain' fill alt='logo funder' />
                </div>
                <div className='w-8 h-8 md:w-20 md:h-16 relative'>
                    <Image sizes='100px' src='/assets/funders/CNRS.png' className='object-contain' fill alt='logo funder' />
                </div>
                <div className='w-8 h-8 md:w-48 md:h-24 relative'>
                    <Image sizes='150px' priority src='/assets/funders/ENS-DEC.png' className='object-contain' fill alt='logo funder' />
                </div>
                <div className='w-8 h-8 md:w-20 md:h-20 relative rounded-full bg-white'>
                    <Image sizes='100px' src='/assets/funders/ENS-PSL.png' className='object-contain' fill alt='logo funder' />
                </div>
                <div className='w-8 h-8 md:w-20 md:h-16 relative'>
                    <Image sizes='100px' src='/assets/funders/nicod.png' className='object-contain' fill alt='logo funder' />
                </div>
            </div>
            <div className='flex flex-wrap w-full gap-8 md:gap-12 lg:gap-20 items-center justify-center mb-2'>
                <Link className='hover:underline opacity-50' target='blank' href="https://www.beyondgames.fr">© {currentYear} - Beyond Games SAS. All rights reserved.</Link>
            </div>
        </div>
    )
}
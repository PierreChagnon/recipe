import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <div className='px-8 py-2 gap-6 hidden lg:flex flex-col items-center justify-center border-t border-gray-300'>
            <div className='flex w-2/3 gap-24 items-center justify-around'>
                <div className='w-8 h-8 md:w-20 md:h-16 relative'>
                    <Image src='/assets/funders/ANR.png' objectFit='contain' fill alt='logo funder' />
                </div>
                <div className='w-8 h-8 md:w-20 md:h-16 relative'>
                    <Image src='/assets/funders/CNRS.png' objectFit='contain' fill alt='logo funder' />
                </div>
                <div className='w-8 h-8 md:w-48 md:h-24 relative'>
                    <Image src='/assets/funders/ENS-DEC.png' objectFit='contain' fill alt='logo funder' />
                </div>
                <div className='w-8 h-8 md:w-20 md:h-20 relative rounded-full bg-white'>
                    <Image src='/assets/funders/ENS-PSL.png' objectFit='contain' fill alt='logo funder' />
                </div>
                <div className='w-8 h-8 md:w-20 md:h-16 relative'>
                    <Image src='/assets/funders/nicod.png' objectFit='contain' fill alt='logo funder' />
                </div>
            </div>
            <div className='flex flex-wrap w-full gap-8 md:gap-12 lg:gap-20 items-center justify-center mb-2'>
                <Link className='hover:underline opacity-50' target='blank' href="https://www.beyondgames.fr">© 2024 - Beyond Games SAS. All rights reserved.</Link>
            </div>
        </div>
    )
}
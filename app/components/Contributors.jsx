import React, { useEffect, useState } from 'react';
import { contributorsArray } from '@/lib/contributors';
import Link from 'next/link';
import Image from 'next/image';

const Contributors = () => {

    return (
        <section id='contributors' className='flex flex-col gap-20 items-center pt-32 border-t border-gray-300'>
            <h2 className='text-4xl'>Contributors</h2>
            <div className='flex flex-wrap justify-center gap-2'>
                {contributorsArray.map((contributor, index) => (
                    <Link href={contributor.website} target='_blank' key={contributor.name} className='flex flex-col w-1/4 border-gray-300 bg-white border text-sm cursor-pointer p-4 rounded-lg gap-6 shadow-sm hover:shadow-md duration-200'>
                        <div className='flex items-center gap-3'>
                            <div className='w-12 h-12 3xl:w-14 3xl:h-14 rounded-full overflow-hidden relative'>
                                <Image src={contributor.imageUrl} alt={contributor.name} fill className='object-cover' sizes="100px" />
                            </div>
                            <p className='3xl:text-lg'>{contributor.name}</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-xs 3xl:text-sm text-gray-400'>{contributor.institution}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Contributors;

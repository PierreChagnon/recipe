import React from 'react';
import { contributorsArray } from '@/lib/contributors';
import Link from 'next/link';

const Contributors = () => {
    const contributors = Array(50).fill().map((_, index) => ({
        id: index + 1,
        name: `Contributor ${index + 1}`,
    }));

    const contributorsWithColor = contributors.map(contributor => ({
        id: contributor.id,
        color: getRandomBgColor(),
        name: generateRandomName(),
    }));

    function getRandomBgColor() {
        const colors = ['bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-orange-200', 'bg-purple-200'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function generateRandomName() {
        const names = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Olivia', 'Daniel', 'Sophia', 'Matthew', 'Emma'];
        const surnames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
        return `${randomName} ${randomSurname}`;
    }
    return (
        <section id='contributors' className='flex flex-col gap-16 items-center pt-32 border-t border-gray-300'>
            <h2 className='text-4xl text-center'>Contributors</h2>
            <div className='flex flex-wrap justify-center gap-2'>
                {contributorsArray.map(contributor => (
                    <Link href={contributor.website} target='_blank' key={contributor.name} className='flex flex-col w-1/4 border-gray-300 bg-white border text-sm cursor-pointer p-4 rounded-lg gap-6 shadow-sm hover:shadow-md duration-200'>
                        <div className={`w-8 h-8 rounded-full ${getRandomBgColor()}`}></div>
                        <div className='flex flex-col'>
                            <p className='text-nowrap'>{contributor.name}</p>
                            <p className='text-xs text-gray-400'>{contributor.institution}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Contributors;
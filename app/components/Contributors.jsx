import React from 'react';

const Contributors = () => {
    const contributors = Array(50).fill().map((_, index) => ({
        id: index + 1,
        name: `Contributor ${index + 1}`,
    }));

    const contributorsWithColor = contributors.map(contributor => ({
        id: contributor.id,
        color: getRandomColor(),
        name: generateRandomName(),
    }));

    function getRandomColor() {
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
        <section className='flex flex-col gap-12 items-center'>
            <h2 className='text-4xl text-center'>Contributors</h2>
            <div className='grid grid-cols-6 gap-4'>
                {contributorsWithColor.map(contributor => (
                    <div key={contributor.id} className='flex items-center border-gray-300 border cursor-pointer p-4 rounded-lg gap-4 shadow-sm hover:shadow-md duration-200'>
                        <div className={`w-8 h-8 rounded-full ${contributor.color}`}></div>
                        <p>{contributor.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Contributors;
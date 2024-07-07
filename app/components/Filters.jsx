import React, { useState } from 'react';

const filtersArray = [
    {
        title: 'Personality traits',
        title_ref: ['bigfive_ope', 'bigfive_con', 'bigfive_ext', 'bigfive_agr', 'bigfive_neu'], // référence à la base de données (le nom de la colonne)
        values: ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'],
        values_ref: ['low', 'high'],
    },
    {
        title: 'Developmental period',
        title_ref: 'age', // référence à la base de données (le nom de la colonne)
        values: ['Children', 'Adolescence', 'Adult'],
        values_ref: ['children', 'adolescence', 'adult'], // référence aux valeurs possibles de la base de données
    },
    {
        title: 'Ecological conditions',
        title_ref: 'ecology', // référence à la base de données (le nom de la colonne)
        values: ['Harsh', 'Affluent'],
        values_ref: ['harsh', 'affluent'], // référence aux valeurs possibles de la base de données
    },
    {
        title: 'Gender',
        title_ref: 'sex', // référence à la base de données (le nom de la colonne)
        values: ['Male', 'Female'],
        values_ref: ['male', 'female'], // référence aux valeurs possibles de la base de données
    },
];

const Chip = ({ children, filter, value, handleFilter, isActive, filterCategory }) => {
    return (
        <button
            onClick={() => handleFilter(filterCategory, filter, value)}
            className={`py-1 px-4 text-xs rounded-full border-gray-300 border ${isActive ? 'bg-slate-300' : 'bg-white text-black'} hover:bg-gray-200 duration-200`}
        >
            {children}
        </button>
    );
};

export default function Filters({ handleFilter, handleResetFilters }) {
    const [activeChips, setActiveChips] = useState({});

    const handleChipClick = (filterCategory, filter, value) => {
        setActiveChips((prevState) => {
            const isActive = prevState[filterCategory]?.filter === filter && prevState[filterCategory]?.value === value;

            // Utiliser la déstructuration pour omettre la propriété
            const { [filterCategory]: omitted, ...newState } = prevState;

            if (!isActive) {
                newState[filterCategory] = { filter, value };
            }

            return newState;
        });

        handleFilter(filter, value);
    };

    return (
        <div className='flex justify-center gap-8'>
            {filtersArray.map((filterGroup, index) => (
                <div key={index} className='flex flex-col items-center gap-2'>
                    <p>{filterGroup.title}</p>
                    <div className='flex flex-col gap-1'>
                        {filterGroup.title !== 'Personality traits' ?
                            filterGroup.values.map((value, i) => (
                                <Chip
                                    key={i}
                                    handleFilter={handleChipClick}
                                    filterCategory={filterGroup.title}
                                    filter={filterGroup.title_ref}
                                    value={filterGroup.values_ref[i]}
                                    isActive={activeChips[filterGroup.title]?.value === filterGroup.values_ref[i]}
                                >
                                    {value}
                                </Chip>
                            ))
                            :
                            filterGroup.values.map((trait, j) => (
                                <div className='flex justify-between' key={trait}>
                                    <p>{trait}</p>
                                    <div className='ml-2 flex gap-1'>
                                        {filterGroup.values_ref.map((level, i) => (
                                            <Chip
                                                key={i}
                                                handleFilter={handleChipClick}
                                                filterCategory={filterGroup.title + trait}
                                                filter={filterGroup.title_ref[j]}
                                                value={level}
                                                isActive={activeChips[filterGroup.title + trait]?.value === level}
                                            >
                                                {level.charAt(0).toUpperCase() + level.slice(1)}
                                            </Chip>
                                        ))}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            ))}
            <div className='flex items-start' >
                <button
                    onClick={() => {
                        setActiveChips({});
                        handleResetFilters();
                    }}
                    className='flex items-center bg-gray-200 hover:bg-slate-300 duration-200 px-4 py-1 rounded-md text-xs gap-2'
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear filters
                </button>
            </div>
        </div>
    );
}

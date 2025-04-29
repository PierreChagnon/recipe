import React, { useState, useEffect } from 'react';

const filtersArray = [
    {
        title: 'Personality traits',
        title_ref: ['bigfive_ope', 'bigfive_con', 'bigfive_ext', 'bigfive_agr', 'bigfive_neu'],
        values: ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'],
        values_ref: ['low', 'high'],
    },
    {
        title: 'Developmental period',
        title_ref: 'age',
        values: ['Children', 'Adolescents', 'Adults'],
        values_ref: ['children', 'adolescence', 'adult'],
    },
    {
        title: 'Ecological conditions',
        title_ref: 'ecology',
        values: ['Harsh', 'Affluent'],
        values_ref: ['harsh', 'affluent'],
    },
    {
        title: 'Gender',
        title_ref: 'sex',
        values: ['Male', 'Female'],
        values_ref: ['male', 'female'],
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

    useEffect(() => {
        if (Object.keys(activeChips).length === 0) {
            handleResetFilters();
        }
    }, [activeChips, handleResetFilters]);

    const handleChipClick = (filterCategory, filter, value) => {
        setActiveChips((prevState) => {
            if (filterCategory === 'Developmental period') {
                if (prevState[filterCategory]?.value.includes(value)) {
                    const newState = { ...prevState, [filterCategory]: { filter, value: prevState[filterCategory].value.filter((v) => v !== value) } };
                    if (newState[filterCategory].value.length === 0) {
                        delete newState[filterCategory];
                    }
                    return newState;
                }

                return {
                    ...prevState,
                    [filterCategory]: {
                        filter,
                        value: prevState[filterCategory] ? [...prevState[filterCategory].value, value] : [value],
                    },
                };
            }

            const isActive = prevState[filterCategory]?.filter === filter && prevState[filterCategory]?.value === value;
            const { [filterCategory]: omitted, ...newState } = prevState;

            if (!isActive) {
                newState[filterCategory] = { filter, value };
            }
            return newState;
        });

        handleFilter(filterCategory, filter, value);
    };

    return (
        <div className='flex justify-center gap-8 mb-12'>
            {filtersArray.map((filterGroup, index) => (
                <div key={index} className='flex flex-col items-center gap-3 2xl:gap-4'>
                    <p>{filterGroup.title}</p>
                    <div className='flex flex-col gap-1'>
                        {filterGroup.title === 'Developmental period' &&
                            filterGroup.values.map((value, i) => (
                                <Chip
                                    key={value}
                                    handleFilter={() => handleChipClick(filterGroup.title, filterGroup.title_ref, filterGroup.values_ref[i])}
                                    filterCategory={filterGroup.title}
                                    filter={filterGroup.title_ref}
                                    value={filterGroup.values_ref[i]}
                                    isActive={activeChips[filterGroup.title]?.value.includes(filterGroup.values_ref[i])}
                                >
                                    {value}
                                </Chip>
                            ))}

                        {filterGroup.title !== 'Personality traits' && filterGroup.title !== 'Developmental period' ?
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
                            filterGroup.title === 'Personality traits' &&
                            filterGroup.values.map((trait, j) => (
                                <div className='flex justify-between' key={trait}>
                                    <p className='text-sm'>{trait}</p>
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
            <div className={`flex flex-col items-center justify-between`} >
                <button
                    disabled={Object.keys(activeChips).length === 0}
                    onClick={() => {
                        setActiveChips({});
                        handleResetFilters();
                    }}
                    className='flex items-center disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400 bg-white border border-gray-300 hover:bg-gray-200 shadow-sm duration-200 px-4 py-1 rounded-full text-xs gap-2'
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

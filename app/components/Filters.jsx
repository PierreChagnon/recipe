import React from 'react'

const filtersArray = [
    {
        title: 'Kind of mechanism',
        title_ref: 'kind', // reference a la base de données (le nom de la colonne)
        values: ['Motivational', 'Conceptual'],
        values_ref: ['motivational', 'conceptual'], // référence aux valeurs possibles de la base de données
    },
    {
        title: 'Personality traits',
        title_ref: ['bigfive_ope', 'bigfive_con', 'bigfive_ext', 'bigfive_agr', 'bigfive_neu'], // reference a la base de données (le nom de la colonne)
        values: ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'],
        values_ref: ['low', 'high'],
    },
    {
        title: 'Developmental period',
        title_ref: 'age', // reference a la base de données (le nom de la colonne)
        values: ['Children', 'Adolescence', 'Adult'],
        values_ref: ['children', 'adolescence', 'adult'], // référence aux valeurs possibles de la base de données
    },
    {
        title: 'Ecological conditions',
        title_ref: 'ecology', // reference a la base de données (le nom de la colonne)
        values: ['Harsh', 'Affluent'],
        values_ref: ['harsh', 'affluent'], // référence aux valeurs possibles de la base de données
    },
    {
        title: 'Gender',
        title_ref: 'sex', // reference a la base de données (le nom de la colonne)
        values: ['Male', 'Female'],
        values_ref: ['male', 'female'], // référence aux valeurs possibles de la base de données
    },
]
const Chip = ({ children, filter, value, handleFilter }) => {
    return (
        <button onClick={() => handleFilter(filter, value)} className='py-1 px-4 text-sm rounded-full border-black border hover:bg-black hover:text-white'>{children}</button>
    )
}

export default function Filters({ handleFilter }) {



    return (
        <div className='flex justify-around'>
            {filtersArray.map((filter, index) => (
                <div key={index} className='flex flex-col items-center gap-2'>
                    <p>{filter.title}</p>
                    <div className='flex flex-col gap-1'>
                        {filter.title !== 'Personality traits' ?
                            filter.values.map((f, i) => (
                                <Chip handleFilter={handleFilter} filter={filter.title_ref} value={filter.values_ref[i]} key={i}>
                                    {f}
                                </Chip>
                            ))
                            :
                            filter.values.map((f, j) => (
                                <div className='flex justify-between' key={f}>
                                    <p>{f}</p>
                                    <div className='ml-2 flex gap-1'>
                                        {filter.values_ref.map((v, i) => (
                                            <Chip handleFilter={handleFilter} filter={filter.title_ref[j]} value={v} key={i}>
                                                {v.charAt(0).toUpperCase() + v.slice(1)}
                                            </Chip>
                                        ))}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}

'use client'
import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import Filters from './Filters';

const PeriodicTable = () => {
    const [selectedElement, setSelectedElement] = useState(null);
    const [elementsFiltered, setElementsFiltered] = useState();

    const [mechanisms, setMechanisms] = useState([]);

    const panelRef = useRef(null);

    useEffect(() => {
        const fetchMechanisms = async () => {
            const mechanismsCollection = collection(db, 'mechanisms');
            const mechanismsSnapshot = await getDocs(mechanismsCollection);
            const mechanismsList = mechanismsSnapshot.docs.map((doc) => doc.data());
            console.log('mechanislsList', mechanismsList);
            setMechanisms(mechanismsList);
            setElementsFiltered(mechanismsList);
        };

        fetchMechanisms();
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                setSelectedElement(null);
            }
        };

        if (selectedElement) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedElement]);

    const renderBibliography = (element) => {
        const refs = [];
        for (let i = 1; i <= 15; i++) {
            const refKey = `ref_${i}`;
            const lienKey = `lien_ref_${i}`;
            if (element[refKey] && element[lienKey]) {
                refs.push({ ref: element[refKey], lien: element[lienKey] });
            }
        }
        return (
            <ul className='flex flex-col gap-4'>
                {refs.map((ref, index) => (
                    <li key={index}>
                        <a href={ref.lien} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            {ref.ref}
                        </a>
                    </li>
                ))}
            </ul>
        );
    };

    const handleElementClick = (element) => {
        setSelectedElement(element);
    };

    const handleFilter = (filter, value = 0) => {
        console.log('filter :', filter, value);
        const temp = mechanisms.filter((element) => {
            return element[filter] === value;
        }
        );
        setElementsFiltered(temp);
        console.log('temp :', temp)
    }

    return (
        <section id='table' className="relative container">

            <Filters handleFilter={handleFilter} />

            <div className="grid grid-cols-6 gap-4 mt-8 p-4 rounded-lg">
                {elementsFiltered && elementsFiltered.map((element) => (
                    <div
                        key={element.cognitive_mechanism}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer shadow-sm hover:shadow-md hover:scale-105 duration-100 bg-blue-200`}
                        onClick={() => handleElementClick(element)}
                    >
                        <h2 className="text-xl text-center font-bold">{element.cognitive_mechanism}</h2>
                        <p className="text-sm truncate">{element.specific_adaptive_challenge}</p>
                    </div>
                ))}
            </div>



            {selectedElement && (
                <div ref={panelRef} className="fixed left-0 top-0 h-dvh w-1/3 bg-white p-4 gap-10 flex flex-col shadow-lg overflow-y-scroll">

                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        onClick={() => setSelectedElement(null)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className='flex flex-col gap-4'>
                        <h2 className="text-2xl font-bold text-center">{selectedElement.cognitive_mechanism}</h2>
                        <p className="">{selectedElement.summary_mechanism}</p>
                    </div>
                    <div className='flex flex-col gap-4 rounded-md border-2 px-2 py-4'>
                        <h3 className='text-2xl' >Cognition</h3>
                        <div className='flex'>
                            <p className='font-bold text-nowrap'>Adaptive challenge :</p>
                            <p>{selectedElement.specific_adaptive_challenge}</p>
                        </div>
                        <p>{selectedElement.cognitive_mechanism_ref}</p>
                        <table>
                            <thead>
                                <tr className='border'>
                                    <th className='border' scope="col">Big Five</th>
                                    <th className='border' scope="col">Age</th>
                                    <th className='border' scope="col">Ecology</th>
                                    <th className='border' scope="col">Sex</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='border'>
                                    <td className='text-sm border' scope="row">
                                        <div className='flex flex-col'>
                                            <p>{selectedElement.bigfive_ope && selectedElement.bigfive_ope + ' openness to experience'}</p>
                                            <p className='text-xs text-gray-600'>{selectedElement.bigfive_ope_ref && '(' + selectedElement.bigfive_ope_ref + ')'}</p>
                                        </div>
                                        <div className='flex flex-col'>
                                            <p>{selectedElement.bigfive_con && selectedElement.bigfive_con + ' conscientiousness'}</p>
                                            <p className='text-xs text-gray-600'>{selectedElement.bigfive_con_ref && '(' + selectedElement.bigfive_con_ref + ')'}</p>
                                        </div>
                                        <div className='flex flex-col'>
                                            <p>{selectedElement.bigfive_ext && selectedElement.bigfive_ext + ' extraversion'}</p>
                                            <p className='text-xs text-gray-600'>{selectedElement.bigfive_ext_ref && '(' + selectedElement.bigfive_ext_ref + ')'}</p>
                                        </div>
                                        <div className='flex flex-col'>
                                            <p>{selectedElement.bigfive_agr && selectedElement.bigfive_agr + ' agreeableness'}</p>
                                            <p className='text-xs text-gray-600'>{selectedElement.bigfive_agr_ref && '(' + selectedElement.bigfive_agr_ref + ')'}</p>
                                        </div>
                                        <div className='flex flex-col'>
                                            <p>{selectedElement.bigfive_neu && selectedElement.bigfive_neu + ' neuroticism'}</p>
                                            <p className='text-xs text-gray-600'>{selectedElement.bigfive_neu_ref && '(' + selectedElement.bigfive_neu_ref + ')'}</p>
                                        </div>
                                    </td>
                                    <td className='text-sm border'>
                                        <div className='flex flex-col'>
                                            <p>{selectedElement.age && selectedElement.age}</p>
                                            <p className='text-xs text-gray-600'>{selectedElement.age_ref && '(' + selectedElement.age_ref + ')'}</p>
                                        </div>
                                    </td>
                                    <td className='text-sm border'>
                                        <div className='flex flex-col'>
                                            <p>{selectedElement.ecology && selectedElement.ecology}</p>
                                            <p className='text-xs text-gray-600'>{selectedElement.ecology_ref && '(' + selectedElement.ecology_ref + ')'}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <p>{selectedElement.ecology && selectedElement.sex}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='flex flex-col gap-4 rounded-md border-2 px-2 py-4'>
                        <h3 className='text-2xl' >Fiction</h3>
                        <div className='flex'>
                            <p className='font-bold'>Description of the ingredient :</p>
                            <p>{selectedElement.description_ingredient}</p>
                        </div>
                        <div className='flex'>
                            <p className='font-bold'>Example of the ingredient :</p>
                            <p>{selectedElement.example_ingredient}</p>
                        </div>
                        <p className=''>{selectedElement.summary_ingredient}</p>
                    </div>
                    <div className='flex flex-col gap-4 rounded-md border-2 px-2 py-4'>
                        <h3 className='text-2xl' >Bibliography</h3>
                        {renderBibliography(selectedElement)}
                    </div>
                </div>
            )}
        </section>
    );
};

export default PeriodicTable;

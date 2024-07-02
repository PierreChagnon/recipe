'use client'
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

const PeriodicTable = () => {
    const [selectedElement, setSelectedElement] = useState(null);
    const [elementsDisplayed, setElementsDisplayed] = useState();

    const [mechanisms, setMechanisms] = useState([]);

    useEffect(() => {
        const fetchMechanisms = async () => {
            const mechanismsCollection = collection(db, 'mechanisms');
            const mechanismsSnapshot = await getDocs(mechanismsCollection);
            const mechanismsList = mechanismsSnapshot.docs.map((doc) => doc.data());
            console.log('mechanislsList', mechanismsList);
            setMechanisms(mechanismsList);
        };

        fetchMechanisms();
    }, [])


    const renderFilterButtons = () => {
        return (
            <div className="flex justify-center mb-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => filterElements('group1')}
                >
                    Group 1
                </button>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => filterElements('group2')}
                >
                    Group 2
                </button>
                <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => filterElements('group3')}
                >
                    Group 3
                </button>
                <button
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => filterElements('group4')}
                >
                    Group 4
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => filterElements('group5')}
                >
                    Group 5
                </button>
            </div>
        );
    };

    const handleElementClick = (element) => {
        setSelectedElement(element);
    };

    const filterElements = (group) => {
        if (elementsDisplayed.length === elements.length) {
            const filteredElements = elements.filter((element) => element.group === group);
            setElementsDisplayed(filteredElements);
        } else {
            setElementsDisplayed(elements);
        }
    };

    return (
        <div className="relative container">

            {renderFilterButtons()}

            <div className="grid grid-cols-6 gap-4 p-4 rounded-lg">
                {mechanisms.map((element) => (
                    <div
                        key={element.cognitive_mechanism}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer shadow-sm hover:shadow-md hover:scale-105 duration-100 bg-blue-200`}
                        onClick={() => handleElementClick(element)}
                    >
                        <h2 className="text-xl font-bold">{element.cognitive_mechanism}</h2>
                        <p className="text-sm truncate">{element.general_adaptive_challenge}</p> {/* specific_adaptive_challenge */}
                    </div>
                ))}
            </div>



            {selectedElement && (
                <div className="fixed left-0 top-0 h-dvh w-1/3 bg-white p-4 flex flex-col shadow-lg overflow-y-scroll">
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
                    <h2 className="text-2xl font-bold">{selectedElement.cognitive_mechanism}</h2>
                    <p className="text-sm">{selectedElement.summary_mechanism}</p>
                    <div className='flex flex-col'>
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
                    <div className='flex flex-col'>
                        <h3 className='text-2xl' >Fiction</h3>
                        <div className='flex'>
                            <p className='font-bold'>Description of the ingredient :</p>
                            <p>{selectedElement.description_ingredient}</p>
                        </div>
                        <div className='flex'>
                            <p className='font-bold'>Example of the ingredient :</p>
                            <p>{selectedElement.example_ingredient}</p>
                        </div>
                        <p>{selectedElement.summary_ingredient}</p>
                    </div>
                    <div className='flex flex-col'>
                        <h3 className='text-2xl' >Bibliography</h3>
                        <div className='flex'>
                            <p>Description of the ingredient</p>
                            <p>{selectedElement.description_ingredient}</p>
                        </div>
                        <div className='flex'>
                            <p>Example of the ingredient</p>
                            <p>{selectedElement.example_ingredient}</p>
                        </div>
                        <p>{selectedElement.summary_ingredient}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PeriodicTable;

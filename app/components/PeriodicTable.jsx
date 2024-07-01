'use client'
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

const elements = [
    { name: 'Motivational', description: 'Motivational mechanisms', group: 'group1' },
    { name: 'Conceptual', description: 'Conceptual mechanisms', group: 'group1' },
    { name: 'Element1', description: 'Description1', group: 'group1' },
    { name: 'Element2', description: 'Description2', group: 'group1' },
    { name: 'Element3', description: 'Description3', group: 'group1' },
    { name: 'Element4', description: 'Description4', group: 'group1' },
    { name: 'Element5', description: 'Description5', group: 'group1' },
    { name: 'Element6', description: 'Description6', group: 'group1' },
    { name: 'Element7', description: 'Description7', group: 'group1' },
    { name: 'Element8', description: 'Description8', group: 'group1' },
    { name: 'Element9', description: 'Description9', group: 'group1' },
    { name: 'Element10', description: 'Description10', group: 'group2' },
    { name: 'Element11', description: 'Description11', group: 'group2' },
    { name: 'Element12', description: 'Description12', group: 'group2' },
    { name: 'Element13', description: 'Description13', group: 'group2' },
    { name: 'Element14', description: 'Description14', group: 'group2' },
    { name: 'Element15', description: 'Description15', group: 'group2' },
    { name: 'Element16', description: 'Description16', group: 'group2' },
    { name: 'Element17', description: 'Description17', group: 'group2' },
    { name: 'Element18', description: 'Description18', group: 'group2' },
    { name: 'Element19', description: 'Description19', group: 'group2' },
    { name: 'Element20', description: 'Description20', group: 'group2' },
    { name: 'Element21', description: 'Description21', group: 'group2' },
    { name: 'Element22', description: 'Description22', group: 'group3' },
    { name: 'Element23', description: 'Description23', group: 'group3' },
    { name: 'Element24', description: 'Description24', group: 'group3' },
    { name: 'Element25', description: 'Description25', group: 'group3' },
    { name: 'Element26', description: 'Description26', group: 'group3' },
    { name: 'Element27', description: 'Description27', group: 'group3' },
    { name: 'Element28', description: 'Description28', group: 'group3' },
    { name: 'Element29', description: 'Description29', group: 'group3' },
    { name: 'Element30', description: 'Description30', group: 'group3' },
    { name: 'Element31', description: 'Description31', group: 'group4' },
    { name: 'Element32', description: 'Description32', group: 'group4' },
    { name: 'Element33', description: 'Description33', group: 'group4' },
    { name: 'Element34', description: 'Description34', group: 'group4' },
    { name: 'Element35', description: 'Description35', group: 'group4' },
    { name: 'Element36', description: 'Description36', group: 'group4' },
    { name: 'Element37', description: 'Description37', group: 'group4' },
    { name: 'Element38', description: 'Description38', group: 'group4' },
    { name: 'Element39', description: 'Description39', group: 'group5' },
    { name: 'Element40', description: 'Description40', group: 'group5' },
];

const getElementClass = (group) => {

    switch (group) {
        case 'group1':
            return 'bg-blue-200';
        case 'group2':
            return 'bg-green-200';
        case 'group3':
            return 'bg-yellow-200';
        case 'group4':
            return 'bg-purple-200';
        case 'group5':
            return 'bg-red-200';
        default:
            return 'bg-gray-200';
    }
};


const PeriodicTable = () => {
    const [selectedElement, setSelectedElement] = useState(null);
    const [elementsDisplayed, setElementsDisplayed] = useState(elements);

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
                        <p className="text-sm truncate">{element.general_adaptive_challenge}</p>
                    </div>
                ))}
            </div>



            {selectedElement && (
                <div className="fixed left-0 top-0 h-full w-1/4 bg-white p-4 shadow-lg">
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
                    {/* Ajoutez plus d'informations ici */}
                </div>
            )}
        </div>
    );
};

export default PeriodicTable;

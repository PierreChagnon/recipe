'use client'
import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import Filters from './Filters';
import DownloadButton from './DownloadButton';

const PeriodicTable = () => {
    const [selectedElement, setSelectedElement] = useState(null);
    const [elementsFiltered, setElementsFiltered] = useState();

    const [mechanisms, setMechanisms] = useState([]);

    const panelRef = useRef(null);
    const filtersArrayRef = useRef([]);

    // useffect pour vérifier que le tableau est bien a jour
    // lorsque tous les filtres sont retirés (préviens un bug lorsqu'on retire tous les filtres manuellement)
    // useEffect(() => {
    //     if (filtersArrayRef.current.length === 0) {
    //         setElementsFiltered(mechanisms);
    //     }
    // }, [elementsFiltered, mechanisms]);

    useEffect(() => {
        const applyFilters = () => {
            if (filtersArrayRef.current.length === 0) {
                setElementsFiltered(mechanisms);
                return;
            }

            const filteredElements = mechanisms.filter((element) => {
                return filtersArrayRef.current.every((f) => {
                    if (Array.isArray(f.value)) {
                        return f.value.includes(element[f.filter]);
                    }
                    return element[f.filter] === f.value;
                });
            });

            setElementsFiltered(filteredElements);
        };

        applyFilters();
    }, [filtersArrayRef.current, mechanisms]);

    useEffect(() => {
        const fetchMechanisms = async () => {
            const mechanismsCollection = collection(db, 'mechanisms');
            const mechanismsSnapshot = await getDocs(mechanismsCollection);
            const mechanismsList = mechanismsSnapshot.docs.map((doc) => doc.data());
            // console.log('mechanislsList', mechanismsList);

            // on met les éléments dans le bon ordre
            mechanismsList.sort((a, b) => a.id - b.id);
            // console.log('mechanismsList sorted', mechanismsList);

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

    const handleResetFilters = () => {
        // console.log('Reset filters');
        filtersArrayRef.current = [];
        setElementsFiltered(mechanisms);
    };


    // const handleFilter = (filterCategroy = 'default', filter, value) => {
    //     console.log('filter:', filter, value);

    //     const newFiltersArray = filtersArrayRef.current.filter((element) => element.filter !== filter);
    //     console.log('newFiltersArray:', newFiltersArray);

    //     const existingElement = filtersArrayRef.current.find((element) => element.filter === filter);
    //     console.log('existingElement:', existingElement);

    //     if (!existingElement) {
    //         // console.log("Le filtre n'existe pas, on l'ajoute");
    //         newFiltersArray.push({ filter, value });
    //     } else if (existingElement.value !== value) {

    //         // cas de age, on peut ajouter plusieurs valeurs différentes
    //         if (filterCategroy === 'Developmental period') {
    //             newFiltersArray.push({ filter, value });
    //             newFiltersArray.push(existingElement);
    //         } else {
    //             // console.log("Le filtre existe déjà, mais la valeur est différente");
    //             newFiltersArray.push({ filter, value });
    //         }
    //     }

    //     filtersArrayRef.current = newFiltersArray;
    //     console.log('Updated filtersArrayRef.current:', filtersArrayRef.current);

    //     if (filtersArrayRef.current.length === 0) {
    //         setElementsFiltered(mechanisms);
    //         return;
    //     }

    //     const temp = mechanisms.filter((element) => {
    //         // utilisation de every plutôt que forEach car elle retourne un booléen
    //         // ne pas oublier le return avant le every, afin de retourner le booléen
    //         return filtersArrayRef.current.every((f) => {
    //             return element[f.filter] === f.value;
    //         })
    //     }
    //     );

    //     setElementsFiltered(temp);
    //     // console.log('filtersArrayRef.current :', filtersArrayRef.current)
    //     // console.log('temp :', temp)
    // }

    const handleFilter = (filterCategory = 'default', filter, value) => {
        // console.log('filter:', filter, value);

        let newFiltersArray = filtersArrayRef.current.filter((element) => {
            if (element.filter === filter) {
                if (filterCategory === 'Developmental period') {
                    // Handle multi-selection for age
                    if (Array.isArray(element.value) && element.value.includes(value)) {
                        element.value = element.value.filter(v => v !== value);
                        if (element.value.length === 0) {
                            return false; // Remove the filter if no values are left
                        }
                        return true; // Keep the filter with updated values
                    } else {
                        if (!Array.isArray(element.value)) {
                            element.value = [element.value]; // Convert to array if not already
                        }
                        element.value.push(value);
                        return true; // Keep the filter with updated values
                    }
                } else {
                    return false; // Remove the filter for non-age categories
                }
            }
            return true; // Keep the filter
        });

        // Add new filter if not already present
        const existingElement = filtersArrayRef.current.find((element) => element.filter === filter);
        if (!existingElement) {
            if (filterCategory === 'Developmental period') {
                newFiltersArray.push({ filter, value: [value] }); // Initialize with array for multiple selections
            } else {
                newFiltersArray.push({ filter, value });
            }
        } else if (existingElement.value !== value && filterCategory !== 'Developmental period') {
            // Handle single-selection for non-age categories
            newFiltersArray = newFiltersArray.filter((element) => element.filter !== filter);
            newFiltersArray.push({ filter, value });
        }

        filtersArrayRef.current = newFiltersArray;
        // console.log('Updated filtersArrayRef.current:', filtersArrayRef.current);

        if (filtersArrayRef.current.length === 0) {
            setElementsFiltered(mechanisms);
            return;
        }

        const temp = mechanisms.filter((element) => {
            return filtersArrayRef.current.every((f) => {
                if (Array.isArray(f.value)) {
                    return f.value.includes(element[f.filter]);
                }
                return element[f.filter] === f.value;
            });
        });

        setElementsFiltered(temp);
        // console.log('filtersArrayRef.current :', filtersArrayRef.current);
        // console.log('temp :', temp);
    };













    const getColorByElementGeneralAdaptiveChallenge = (challenge) => {
        switch (challenge) {
            case "Self":
                return "bg-pastel-blue";
            case "Threats":
                return "bg-pastel-green";
            case "Cooperators":
                return "bg-pastel-brown";
            case "Competitors":
                return "bg-pastel-purple";
            case "Kin":
                return "bg-pastel-pink";
            case "Mates":
                return "bg-pastel-orange";
            default:
                return "bg-blue-200";
        }
    };

    const renderLegends = () => {
        return (
            <div className="flex justify-center items-center mt-8 2xl:mt-12">
                <span>General adaptive challenges :</span>
                <div
                    className="py-2 px-6 text-sm flex items-center gap-2 rounded"
                >
                    <span className='h-4 w-6 bg-pastel-blue' />
                    <p>Self</p>
                </div>
                <div
                    className="py-2 px-6 text-sm flex items-center gap-2 rounded"
                >
                    <span className='h-4 w-6 bg-pastel-green' />
                    <p>Threats</p>
                </div>
                <div
                    className="py-2 px-6 text-sm flex items-center gap-2 rounded"
                >
                    <span className='h-4 w-6 bg-pastel-brown' />
                    <p>Cooperators</p>
                </div>
                <div
                    className="py-2 px-6 text-sm flex items-center gap-2 rounded"
                >
                    <span className='h-4 w-6 bg-pastel-purple' />
                    <p>Competitors</p>
                </div>
                <div
                    className="py-2 px-6 text-sm flex items-center gap-2 rounded"
                >
                    <span className='h-4 w-6 bg-pastel-pink' />
                    <p>Kin</p>
                </div>
                <div
                    className="py-2 px-6 text-sm flex items-center gap-2 rounded"
                >
                    <span className='h-4 w-6 bg-pastel-orange' />
                    <p>Mates</p>
                </div>
            </div>
        );
    };

    return (
        <section id='table' className="relative container border border-gray-300 rounded-xl px-4 xl:px-8 2xl:px-16 3xl:px-24 py-10 bg-white">

            <Filters handleResetFilters={handleResetFilters} handleFilter={handleFilter} />

            <div className="grid grid-cols-5 gap-2 mt-8 rounded-lg">
                {elementsFiltered && elementsFiltered.map((element) => (
                    <div
                        key={element.id}
                        className={`flex flex-col items-center gap-2 justify-center p-4 rounded-lg cursor-pointer shadow-sm hover:shadow-md hover:scale-105 duration-200 ${getColorByElementGeneralAdaptiveChallenge(element.general_adaptive_challenge)}`}
                        onClick={() => handleElementClick(element)}
                    >
                        <p className="text-center text-sm font-bold">{element.cognitive_mechanism}</p>
                        <p className="text-xs text-center">{element.specific_adaptive_challenge}</p>
                    </div>
                ))}
            </div>


            {renderLegends()}

            <div className="mt-8 2xl:mt-12 flex justify-end">
                <DownloadButton />
            </div>


            {selectedElement && (
                <div ref={panelRef} className="fixed rounded-md border border-gray-300 bg-transparent backdrop-blur-3xl left-2 top-2 bottom-2 xl:left-2 xl:top-4 xl:bottom-4 w-[40%] px-4 py-12 2xl:px-10 3xl:px-16 gap-16 flex flex-col shadow-lg overflow-y-scroll z-10">

                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 border-2 border-gray-400 rounded-full p-1 transition duration-200"
                        onClick={() => setSelectedElement(null)}
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
                    </button>

                    <h2 className="text-2xl font-bold text-center">{selectedElement.cognitive_mechanism}</h2>
                    <div className='flex flex-col gap-6 bg-white rounded-md border-2 px-4 py-6'>
                        <h3 className='text-xl' >Cognition</h3>
                        <p className="">{selectedElement.summary_mechanism}</p>
                        <div className='flex'>
                            <p className='font-bold text-nowrap'>Adaptive challenge :</p>
                            <p className='ml-2'>{selectedElement.specific_adaptive_challenge}</p>
                        </div>
                        <p className='text-xs text-gray-600'>{selectedElement.cognitive_mechanism_ref}</p>
                        <table>
                            <thead>
                                <tr className='border'>
                                    <th className='border p-2' scope="col">Big Five</th>
                                    <th className='border p-2' scope="col">Age</th>
                                    <th className='border p-2' scope="col">Ecology</th>
                                    <th className='border p-2' scope="col">Sex</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='border'>
                                    <td className='text-sm text-center flex flex-col gap-2 p-2 border' scope="row">
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
                                    <td className='text-sm text-center border p-2'>
                                        <div className='flex flex-col'>
                                            <p>{selectedElement.age && selectedElement.age}</p>
                                            <p className='text-xs text-gray-600'>{selectedElement.age_ref && '(' + selectedElement.age_ref + ')'}</p>
                                        </div>
                                    </td>
                                    <td className='text-sm text-center border p-2'>
                                        <div className='flex flex-col'>
                                            <p>{selectedElement.ecology && selectedElement.ecology}</p>
                                            <p className='text-xs text-gray-600'>{selectedElement.ecology_ref && '(' + selectedElement.ecology_ref + ')'}</p>
                                        </div>
                                    </td>
                                    <td className='text-sm text-center border p-2'>
                                        <p>{selectedElement.ecology && selectedElement.sex}</p>
                                        <p className='text-xs text-gray-600'>{selectedElement?.sex_ref && '(' + selectedElement?.sex_ref + ')'}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='flex flex-col gap-6 bg-white rounded-md border-2 px-4 py-6'>
                        <h3 className='text-xl' >Fiction</h3>
                        <p className=''>{selectedElement.summary_ingredient}</p>
                        <div className='flex flex-col'>
                            <p className='font-bold'>Description of the ingredient :</p>
                            <p className=''>{selectedElement.description_ingredient}</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-bold'>Example of the ingredient :</p>
                            <p className=''>{selectedElement.example_ingredient}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 bg-white rounded-md border-2 px-4 py-6'>
                        <h3 className='text-xl' >Bibliography</h3>
                        {renderBibliography(selectedElement)}
                    </div>
                </div>
            )}
        </section>
    );
};

export default PeriodicTable;

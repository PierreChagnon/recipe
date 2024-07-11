'use client'
import React, { useState } from 'react'
import { storage, db } from '@/firebase/firebase'
import { ref, uploadBytes } from 'firebase/storage'
import Papa from 'papaparse'
import { writeBatch, doc, collection, getDocs } from 'firebase/firestore'


export default function Admin() {
    const [password, setPassword] = useState('')
    const [isLogged, setIsLogged] = useState(false)
    const [file, setFile] = useState(null)

    const handleUpload = async () => {
        try {
            const storageRef = ref(storage, 'data.csv')
            // uploadBytes met le fichier dans le storage
            const snapshot = await uploadBytes(storageRef, file)
            // console.log('Uploaded a blob or file!', snapshot)
            
            // process CSV se charge de mettre a jour la base de données firestore avec le nouveau fichier
            await processCSV(file)
        } catch (error) {
            console.error('Error uploading file', error)
        }
    }

    const clearCollection = async () => {
        // console.log('Clearing collection')
        const querySnapshot = await getDocs(collection(db, "mechanisms"));
        // console.log('querySnapshot', querySnapshot)

        const batch = writeBatch(db);

        querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });

        await batch.commit();
    }


    const processCSV = async (file) => {
        Papa.parse(file, {
            header: true,
            complete: async (result) => {
                // console.log('Parsed CSV', result)

                // Suppression des données existantes
                await clearCollection()

                // Création du batch
                const batch = writeBatch(db)
                result.data.forEach((row) => {
                    const docRef = doc(db, 'mechanisms', row.id)
                    batch.set(docRef, row)
                })

                //commit du batch
                try {
                    await batch.commit();
                    alert('CSV data has been processed and the website is now up to date.');
                    setIsLogged(false) // logout
                    setPassword('') // reset password
                    setFile(null) // reset file
                } catch (error) {
                    console.error('Error updating Firestore:', error);
                }

            },
            error: (error) => {
                console.error('Error parsing CSV', error)
            }
        })
    }


    return (
        <main className="py-20 px-24 flex flex-col gap-20 items-center">
            <h1 className="text-4xl text-center">Admin</h1>
            <div className='flex flex-col items-center w-fit'>

                <p>Password:</p>
                <input
                    className='border rounded-md p-2 mb-2'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                />

                <button
                    className='bg-blue-500 text-white p-2 rounded-md mt-2 cursor-pointer hover:bg-blue-700 duration-200'
                    onClick={() => {
                        console.log('Logging in')
                        if (process.env.NEXT_PUBLIC_SECRET_ADMIN_PASSWORD === password) {
                            // console.log('Logged in')
                            setIsLogged(true)
                        }
                    }}>
                    Login
                </button>

                {isLogged && (
                    <div className='mt-8'>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                        <button
                            className='bg-blue-500 text-white p-2 rounded-md mt-2 cursor-pointer hover:bg-blue-700 duration-200'
                            onClick={handleUpload}>
                            Upload
                        </button>
                    </div>
                )}
            </div>
        </main>
    )
}

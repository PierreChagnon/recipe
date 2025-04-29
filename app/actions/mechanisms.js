"use server"
import { db } from '@/firebase/firebase'
import { collection, getDocs } from 'firebase/firestore'

export async function fetchMechanisms() {
    try {
        const mechanismsCollection = collection(db, 'mechanisms');
        const mechanismsSnapshot = await getDocs(mechanismsCollection);
        const mechanismsList = mechanismsSnapshot.docs.map((doc) => doc.data());
        // console.log('mechanislsList', mechanismsList);

        // on met les éléments dans le bon ordre
        mechanismsList.sort((a, b) => a.id - b.id);
        // console.log('mechanismsList sorted', mechanismsList);

        return mechanismsList;
    } catch (error) {
        console.error('Erreur lors de la récupération des mécanismes:', error);
        return [];

    }
};
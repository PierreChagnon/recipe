"use server"
import { storage } from '@/firebase/firebase'
import { ref, getDownloadURL } from "firebase/storage";

export async function downloadCSV() {
    try {
        const fileRef = ref(storage, 'data.csv');
        const url = await getDownloadURL(fileRef);
        return url;
    } catch (err) {
        console.error(err);
    }
};
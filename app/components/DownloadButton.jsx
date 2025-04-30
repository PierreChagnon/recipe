import React, { useState } from 'react'
import { GoDownload } from "react-icons/go";
import { downloadCSV } from '../actions/downloadCSV';


export default function DownloadButton() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDownload = async () => {
        setLoading(true);
        setError(null);
        try {
            const url = await downloadCSV();
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            setError('Failed to download file');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }
    return (
        <button
            disabled={loading}
            onClick={handleDownload}
            className='text-center disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed items-center flex text-sm text-black bg-white py-2 px-6 border border-gray-400 rounded-lg hover:bg-gray-200 duration-200'
        >
            {loading ? (
                <>
                    <svg className="animate-spin mr-3 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">

                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p>Downloading...</p>
                </>
            ) : (
                <>
                    <GoDownload className='mr-2' />
                    <p>Download CSV</p>
                </>
            )
            }
        </button >
    )
}

import React from 'react'

export default function LoadingSpiner() {
    return (
        <div className="w-full h-[50vh] flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
        </div>
    )
}

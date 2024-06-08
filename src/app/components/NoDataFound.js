"use client";
import Link from "next/link";

const NoDataFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">No Data Found</h1>
                <p className="text-gray-600 mb-8">Sorry, we couldn't find any data to display.</p>
                <Link href={"/"} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Go Back
                </Link>
            </div>
        </div>
    );
}

export default NoDataFound;

'use client';

import { useSearchParams, useRouter } from 'next/navigation';

const limit = 10;

export const PaginationComponent = ({ skip }: { skip: number }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const updateQuery = (newSkip: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('skip', newSkip.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex justify-center space-x-4 mt-6">
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={() => updateQuery(skip - limit)}
                disabled={skip === 0}
            >
                Prev
            </button>
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                onClick={() => updateQuery(skip + limit)}
            >
                Next
            </button>
        </div>
    );
};

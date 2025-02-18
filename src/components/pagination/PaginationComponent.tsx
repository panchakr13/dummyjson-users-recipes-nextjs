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
        <div className="pagination">
            <button
                className="pagination-btn"
                onClick={() => updateQuery(skip - limit)}
                disabled={skip === 0}
            >
                Prev
            </button>
            <button className="pagination-btn" onClick={() => updateQuery(skip + limit)}>
                Next
            </button>
        </div>
    );
};

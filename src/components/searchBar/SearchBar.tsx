"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface SearchBarProps {
    placeholder: string;
}

export const SearchBar = ({ placeholder }: SearchBarProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());

        if (searchQuery) {
            params.set("q", searchQuery);
        } else {
            params.delete("q");
        }

        router.push(`?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSearch} className="mb-4">
            <input
                type="text"
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border p-2 rounded-md text-black"
            />
            <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-md">
                Search
            </button>
        </form>
    );
};

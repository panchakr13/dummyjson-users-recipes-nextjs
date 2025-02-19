import type {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "RecipesPageLayout",
    description: "RecipesPage",
};
type Props = { children: React.ReactNode }

const RecipesPageLayout  = ({children} : Props) => {
    return (
        <>
            {children}
        </>
    );
};

export default RecipesPageLayout;
import type {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "RecipesTagPageLayout",
    description: "RecipesTagPage",
};
type Props = { children: React.ReactNode }

const RecipesTagPageLayout  = ({children} : Props) => {
    return (
        <>
            {children}
        </>
    );
};

export default RecipesTagPageLayout;
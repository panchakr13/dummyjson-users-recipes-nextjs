import type {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "LoginPageLayout",
    description: "LoginPage",
};
type Props = { children: React.ReactNode }

const LoginPageLayout  = ({children} : Props) => {
    return (
        <>
            {children}
        </>
    );
};

export default LoginPageLayout;
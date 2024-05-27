import { createContext, useContext, useState } from "react";

const UserContext = createContext(null as any);

export const useUser = () => {

    const userDetails = useContext(UserContext);
    return userDetails;
};

export const UserProvider = (props: any) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    return (
        <UserContext.Provider value={{ name, setName, email, setEmail }}>
            {props.children}
        </UserContext.Provider>
    );
}; 
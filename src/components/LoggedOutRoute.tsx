import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/context/AuthContext";

interface Props {
    element: JSX.Element;
    forwardRoute: string;
}

export default function LoggedOutRoute({ element, forwardRoute }:Props) {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if(currentUser !== null) {
            navigate(forwardRoute);
        }
        setLoading(false);
    }, []);

    return <>
        {!loading && element}
    </>;
}
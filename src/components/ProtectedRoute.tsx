import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/context/AuthContext";

interface Props {
    element:  JSX.Element;
    forwardPath: string;
}

export default function ProtectedRoute({ element, forwardPath }:Props) {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if(currentUser === null) {
            navigate(forwardPath);
        }
        else if(!currentUser.emailVerified) {
            navigate("/verify-email");
        }
        else if(currentUser.displayName === null || currentUser.photoURL == null) {
            navigate("/account-setup");
        }
        setLoading(false);
    }, []);

    return <>
        {!loading && element}
    </>
}
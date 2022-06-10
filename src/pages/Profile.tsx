import { useAuth } from "../utils/context/AuthContext";

export default function Profile() {
    const { currentUser } = useAuth();

    return (
        <main>
            <h1>Profile</h1>
            {currentUser.email}
        </main>
    );
}
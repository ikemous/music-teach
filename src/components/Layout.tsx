import { Button, Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useAuth } from "../utils/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Layout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            <header>
                <Navbar>
                    <Container>
                        <NavbarBrand>Music Teach</NavbarBrand>
                        <Navbar.Toggle aria-controls="music-teach-nav" />
                        <Navbar.Collapse className="justify-content-end" id="music-teach-nav">
                            <Nav>
                                <Button variant="danger" onClick={handleLogout}>Logout</Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <Outlet />
            <footer></footer>
        </>
    );
}
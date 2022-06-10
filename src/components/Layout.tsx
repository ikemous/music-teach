import { Button, Container, Nav, Navbar, NavbarBrand, NavDropdown } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useAuth } from "../utils/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Layout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <>
            <header>
                <Navbar expand="lg">
                    <Container>
                        <NavbarBrand>Music Teach</NavbarBrand>
                        <Navbar.Toggle aria-controls="music-teach-nav" />
                        <Navbar.Collapse className="justify-content-end" id="music-teach-nav">
                            <NavDropdown title="Profile" id="profile-dropdown">
                                <NavDropdown.Item as={Link} to="/profile">View</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/profile/settings">
                                    Settings
                                </NavDropdown.Item>
                            </NavDropdown>
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
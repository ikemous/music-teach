import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <header>
                <Navbar>
                    <Container>
                        <NavbarBrand>Music Teach</NavbarBrand>
                    </Container>
                </Navbar>
            </header>
            <Outlet />
            <footer></footer>
        </>
    );
}
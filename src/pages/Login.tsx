import { useState } from "react";
import { Container, Form, FormGroup, Row, Col, Button, FormLabel, FormControl, Toast, ToastContainer } from "react-bootstrap";
import { useAuth } from "../utils/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    

    async function handleSubmit(event:any) {
        event.preventDefault();
        if(email === "" && password === "") {
            setError("Username and Password Required")
            return setShow(true);
        }
        try {
            const user = await login(email, password);
            if(user !== null) {
                navigate("/profile");
            } 
        } catch (e)  {
            if(e instanceof FirebaseError) {
                switch(e.code) {
                    case "auth/user-not-found":
                    default:
                        setError("Username and Password Incorrect")
                        setShow(true);
                }
            }
        }
    }

    return(
        <main className="d-flex justify-content-center align-items-center full-screen-height">
            <Container>
                <h1 className="text-center">Login</h1>
                <Form onSubmit={handleSubmit}>
                    <Container>
                        <Row>
                            <Col xs={12} md={{offset: 2, span: 8}} lg={{offset: 3, span: 6}}>
                                <FormGroup className="mb-3" controlId="email-input">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl 
                                        type="email" 
                                        value={email}
                                        onChange={({target}) => setEmail(target.value)}
                                    />
                                </FormGroup>
                                <FormGroup className="mb-3" controlId="password-input">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl 
                                        type="password"
                                        value={password}
                                        onChange={({target}) => setPassword(target.value)}
                                    />
                                </FormGroup>
                                <Row>
                                    <Col xs={12} md={{offset: 2, span: 8}}>
                                        <Button className="w-100" type="submit">Login</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Form>
                <p className="text-center pt-4">Need Account? <Link to="/register">Register Here!</Link></p>
                <p className="text-center"><Link to="/forgot-password">Forgot Password</Link></p>
            </Container>
            <ToastContainer className="p-3" position="bottom-center">
                <Toast bg="danger" onClose={() => setShow(false)} show={show} delay={4000} autohide>
                    <Toast.Header closeButton={false}>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Authentication Error</strong>
                        <small>:(</small>
                    </Toast.Header>
                    <Toast.Body>Username or Password invalid</Toast.Body>
                </Toast>
            </ToastContainer>
        </main>
    );
}
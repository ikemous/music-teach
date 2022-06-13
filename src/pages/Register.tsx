import { 
    Container, 
    Row, 
    Col, 
    Button,
    Form, 
    FormGroup, 
    FormLabel, 
    FormControl, 
    Toast,
    ToastContainer
} from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../utils/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { FirebaseError } from "firebase/app";

interface ErrorType {
    emailError: string;
    passwordError: string;
    confirmPassword: string;
    generalError: string;
}

export default function Register() {
    const { register } = useAuth();
    const navigator = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        if(email === "" || password === "" || confirmPassword === "") {
            setError("All fields are required");
            return setShow(true);
        }
        else if(password !== confirmPassword) {
            setError("Passwords don't match");
            return setShow(true);
        }
        try {
            const { user } = await register(email, password);
            if(user !== null) {
                await sendEmailVerification(user);
                navigator("/verify-email");
            }

        } catch (e) {
            if(e instanceof FirebaseError) {
                switch(e.code) {
                    case "auth/invalid-email":
                        setError("Invalid Email Address");
                        setShow(true);
                        break;
                    case "auth/email-already-in-use":
                        setError("Account Already Registered With Email");
                        setShow(true);
                        break;
                    case "auth/weak-password":
                        setError("Password must be 6 characters minimum");
                        setShow(true);
                        break;
                    default:
                        console.log(e)
                }
            }
        }
    }
    return(
        <main className="d-flex justify-content-center align-items-center full-screen-height">
            <Container>
                <h1 className="text-center">Register</h1>
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
                                <FormGroup className="mb-3" controlId="confirm-password-input">
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl 
                                        type="password" 
                                        value={confirmPassword}
                                        onChange={({target}) => setConfirmPassword(target.value)}
                                    />
                                </FormGroup>
                                <Row>
                                    <Col xs={12} md={{offset: 2, span: 8}}>
                                        <Button className="w-100" type="submit">Register</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Form>
                <p className="text-center pt-3">Already Registered? <Link to="/login">Login Here</Link></p>
            </Container>
            <ToastContainer className="p-3" position="bottom-center">
                <Toast bg="danger" onClose={() => setShow(false)} show={show} delay={4000} autohide>
                    <Toast.Header closeButton={false}>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Authentication Error</strong>
                        <small>:(</small>
                    </Toast.Header>
                    <Toast.Body>{error}</Toast.Body>
                </Toast>
            </ToastContainer>
        </main>
    );
}
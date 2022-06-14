import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row, Toast, ToastContainer } from "react-bootstrap"
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);

    function handleSubmit(event:any) {
        event.preventDefault();
        if(email === "") {
            setError("Email Required");
            return setShow(true);
        }
        try {
            
        } catch (e) {
            if(e instanceof FirebaseError) {
                switch(e.code) {
                    case "auth/user-not-found":
                    default:
                        setError("User Email Doesn't Exist")
                        setShow(true);
                }
            }
        }
    }

    return (
        <main className="d-flex justify-content-center align-items-center full-screen-height">
            <Container>
                <h1 className="text-center">Forgot Password?</h1>
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
                                <Row>
                                    <Col xs={12} md={{offset: 2, span: 8}}>
                                        <Button className="w-100" type="submit">Send Reset Link</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Form>
                <p className="text-center pt-4">
                    <Link to="/login">Login Here</Link>
                </p>
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
    )
}

export default ForgotPassword
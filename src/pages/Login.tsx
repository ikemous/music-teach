import { useState } from "react";
import { Container, Form, FormGroup, Row, Col, Button, FormLabel, FormControl } from "react-bootstrap";
import { useAuth } from "../utils/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function handleSubmit(event:any) {
        event.preventDefault();
        try {
            const user = await login(email, password);
            if(user !== null) {
                navigate("/profile");
            } 
        } catch (e) {
            console.log(e);
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
            </Container>
        </main>
    );
}
import { 
    Container, 
    Row, 
    Col, 
    Button,
    Form, 
    FormGroup, 
    FormLabel, 
    FormControl 
} from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../utils/context/AuthContext";

interface ErrorType {
    emailError: string;
    passwordError: string;
    confirmPassword: string;
    generalError: string;
}

export default function Register() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errors, setErrors] = useState<ErrorType>({
        emailError: "",
        passwordError: "",
        confirmPassword: "",
        generalError: "",
    });
    const { register } = useAuth();

    useState(() => {
        const tempError:ErrorType = {
            emailError: "",
            confirmPassword: "",
            generalError: "",
            passwordError: "",
        }
        if(errors.emailError !== "" && email === "") {
            tempError.emailError = "Email is required";
        }
        if(errors.passwordError !== "" && password === "") {
            tempError.emailError = "Email is required";
        }
        if(errors.confirmPassword !== "" && confirmPassword === "") {
            tempError.emailError = "Email is required";
        }
    });

    const handleSubmit = (event:any) => {
        event.preventDefault();
        console.log("Here")
        register(email, password);
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
            </Container>
        </main>
    );
}
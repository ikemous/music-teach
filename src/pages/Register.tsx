import { Container, Row, Col, Button, Form, FormGroup, FormLabel, FormControl } from "react-bootstrap";

export default function Register() {
    return(
        <main className="d-flex justify-content-center align-items-center full-screen-height">
            <Container>
                <h1 className="text-center">Register</h1>
                <Form>
                    <Container>
                        <Row>
                            <Col xs={12} md={{offset: 2, span: 8}} lg={{offset: 4, span: 4}}>
                                <FormGroup className="mb-3">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl type="email" />
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl type="password" />
                                </FormGroup>
                                <Row>
                                    <Col xs={12} md={{offset: 2, span: 8}}>
                                        <Button className="w-100">Register</Button>
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
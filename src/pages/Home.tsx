import { Container, Row, Col, Button } from "react-bootstrap";

export default function Home() {
    return (
        <main className="d-flex justify-content-center align-items-center full-screen-height">
            <Container>
                <h1 className="text-center">Music Teach</h1>
                <Row>
                    <Col xs={12} md={{offset: 4, span: 4}}>
                        <Button className="w-100 mb-3" href="/login">Login</Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={{offset: 4, span: 4}}>
                        <Button className="w-100 mb-3" href="/register">Register</Button>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}
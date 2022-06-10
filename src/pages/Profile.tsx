import { Col, Container, Row } from "react-bootstrap";
import { useAuth } from "../utils/context/AuthContext";

export default function Profile() {
    const { currentUser } = useAuth();
    console.log(currentUser);

    return (
        <main>
            <Container>
                <Row>
                    <Col lg={9}>
                        <h1>Proffile Information here</h1>
                    </Col>
                    <Col lg={3}>
                        <h2>User Card here</h2>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}
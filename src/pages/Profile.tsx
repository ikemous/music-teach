import { Col, Container, Row, Image } from "react-bootstrap";
import { useAuth } from "../utils/context/AuthContext";

export default function Profile() {
    const { currentUser } = useAuth();
    
    return (
        <main>
            <Container>
                <Row>
                    <Col lg={9}>
                        <h1>Proffile Information here</h1>
                    </Col>
                    <Col lg={3}>
                        <p className="text-center mb-0">Hello!</p>
                        <h2 className="text-center">Teacher Name</h2>
                        <Image src="/images/lilly.jpg" alt="teacher profile image" fluid roundedCircle  />
                        
                    </Col>
                </Row>
            </Container>
        </main>
    );
}
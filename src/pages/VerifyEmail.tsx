import { useAuth } from "../utils/context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";

export default function VerifyEmail() {
    const { currentUser , verifyEmail } = useAuth();
    const [loading, setLoading] = useState(true);
    const [verificationSent, setVerificationSent] = useState<boolean>(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(currentUser === null) {
            navigate("/login");
        }
        else if(currentUser.emailVerified) {
            navigate("/profile");
        }
        else {
            runInterval();
        }
        setLoading(false);
    }, []);

    function runInterval() {
        let interval = setInterval(async () => {
            if (currentUser.emailVerified) {
                clearInterval(interval);
                navigate("/profile");
            }
           await currentUser.reload();
        }, 2000);
    }
    async function sendVerificationEmail() {
        await verifyEmail();
        setVerificationSent(true);
    }

    return (
        <main className="d-flex justify-content-center align-items-center full-screen-height">
            {
                !loading && 
                <Container>
                    <h1 className="text-center">Verify Your Email</h1>
                    <Row>
                        <Col className="text-center" xs={12} md={{offset: 2, span: 8}} lg={{offset: 3, span: 6}}>
                            <p>Check your registered email address for the email verification</p>
                            <p>Haven't recieved the email? Feel free to resend using the button below :)</p>
                            <Button 
                                onClick={sendVerificationEmail} 
                                disabled={verificationSent}
                            >
                                {verificationSent ? "Email Sent!" : "Resend Verification"}
                            </Button>
                        </Col>
                    </Row>
                </Container>
            }
        </main>
    );
}
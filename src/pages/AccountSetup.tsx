import { useState } from "react";
import { Container, Row, Col, Form, FormGroup, FormControl, FormLabel, Button, ToastContainer, Toast, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/context/AuthContext";
import { v4 as uuidv4 } from 'uuid';
import userImages from "../utils/imageList";
import { UserImageData } from "../utils/types";


const AccountSetup = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState<number>(1);
    const [displayName, setDisplayName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [profileImage, setProfileImage] = useState<string>("")
    const [show, setShow] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    
    if(currentUser.displayName !== null) {
        navigate("/profile");
    }
    
    function handleSubmit(event:any) {
        event.preventDefault();
        if(displayName === "" && phoneNumber === "") {
            return setShow(true);
        }
        setStep(2);
    }

    const FirstStep = (
        <>
            <h1 className="text-center">Almost There!</h1>
            <p className="text-center text-muted">We just need a little more information</p>
            <Form onSubmit={handleSubmit}>
                <Container>
                    <Row>
                        <Col xs={12} md={{offset: 2, span: 8}} lg={{offset: 3, span: 6}}>
                            <FormGroup className="mb-3" controlId="display-name-input">
                                <FormLabel>Display Name</FormLabel>
                                <FormControl 
                                    type="text" 
                                    value={displayName}
                                    onChange={({target}) => setDisplayName(target.value)}
                                />
                            </FormGroup>
                            <FormGroup className="mb-3" controlId="phone-number-input">
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl 
                                    type="text" 
                                    value={phoneNumber}
                                    onChange={({target}) => setPhoneNumber(target.value)}
                                />
                            </FormGroup>
                            <Row>
                                <Col xs={12} md={{offset: 2, span: 8}}>
                                    <Button className="w-100" type="submit">
                                        Next Step
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Form>
            <ToastContainer className="p-3" position="bottom-center">
                <Toast bg="danger" onClose={() => setShow(false)} show={show} delay={4000} autohide>
                    <Toast.Header closeButton={false}>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Missing Information</strong>
                        <small>:(</small>
                    </Toast.Header>
                    <Toast.Body>Phone number and email are required!</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );

    const SecondStep = (
        <>
            <h1 className="text-center">Please Select Profile Image</h1>
            <Container className="icons-container">
                <Row>
                    <Col xs={12} md={{offset: 2, span: 8}}>
                        <Row>
                            {
                                userImages.map((userImage:UserImageData) => {
                                    return (
                                        <Col xs={4} lg={2} key={uuidv4()}>
                                            <Image src={userImage.path} alt={userImage.altTag} roundedCircle fluid style={{height: "100%", width: "100%"}} />
                                        </Col>
                                    );
                                })
                            }   
                        </Row>
                    </Col>
                    
                </Row>
            </Container>
            <Container className="pt-4">
                <Row>
                    <Col xs={12} md={{offset: 3, span: 6}}>
                        <Row>
                            <Col>
                                <Button variant="danger" className="w-100">Back</Button>
                            </Col>
                            <Col>
                                <Button variant="success" disabled={profileImage === ""} className="w-100">Finish</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
    return (
        <main className="d-flex justify-content-center align-items-center full-screen-height account-setup-container">
            <Container className="progress-container">
                <Container className="custom-progress-bar">
                    <Row className="text-center h-100">
                        <Col 
                            xs={6} 
                            className="step-one d-flex" 
                            style={ step === 1 ? { background: "#c2fe9c", fontWeight: "bold" } :{ background: "lawngreen" }}
                        >
                            <p className="align-self-center mb-0 w-100 text-center">Update Account</p>
                        </Col>
                        <Col 
                            xs={6} 
                            className="step-two d-flex" 
                            style={ step === 1 ? { background: "white", fontWeight: "bold" } :{ background: "#c2fe9c", fontWeight: "bold" }}
                        >
                            <p className="align-self-center mb-0 w-100 text-center">Choose Image</p>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Container>
            {
                step === 1 ? FirstStep : SecondStep
            }
            </Container>
        </main>
    )
}

export default AccountSetup;
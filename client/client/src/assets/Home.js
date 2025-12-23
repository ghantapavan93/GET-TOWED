import React, {useState} from 'react';
import { Container } from 'react-bootstrap';
import './search.css'; 
import './Search'
import './Query'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const backgroundImage = 'https://images.unsplash.com/photo-1529369623266-f5264b696110?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export default function Home() {
    const [hovered, setHovered] = useState(false);
    const handleImageClick = () => {
        setHovered(!hovered);
    };
    return (
        <div>
            <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
                <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center', color: 'black' , padding: '200px'}}>
                    <h1>Welcome to Get Towed – Your Reliable Towing Assistance!</h1>
                    <p>Accidents can be overwhelming, but with Get Towed, help is just a call away. We'll swiftly connect you with a trusted towing partner. Use our portal to find your vehicle, settle the fee securely, or raise any concerns. Trust Get Towed for efficient, hassle-free assistance during tough times.
                    </p>
                </Container>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Container>
        <h1>Why Choose Us</h1>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
            <Card style={{ width: '18rem', cursor: 'pointer' }}>
                <Card.Img
                    variant="top"
                    src="https://framerusercontent.com/images/MkeIzp2HekO5l3Sx7l1sNgqiPM.jpg"
                    onClick={handleImageClick}
                    className={hovered ? 'hover-effect' : ''}
                    style={{ transition: 'transform 0.3s ease' }}
                />
                <Card.Body>
                    <Card.Title>Swift Response and Trusted Partners</Card.Title>
                    <Card.Text>
                        Get Towed provides a quick response when you're in need, ensuring that help arrives promptly after an accident. We collaborate with reputable towing companies, guaranteeing professional and reliable service when you need it most.
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card style={{ width: '18rem', cursor: 'pointer' }}>
                <Card.Img
                    variant="top"
                    src="https://knowmax-ai-website.s3.amazonaws.com/wp-content/uploads/2022/01/01141445/knowledge-management-portal.png"
                    onClick={handleImageClick}
                    className={hovered ? 'hover-effect' : ''}
                    style={{ transition: 'transform 0.3s ease' }}
                />
                <Card.Body>
                    <Card.Title>Convenient Management Portal</Card.Title>
                    <Card.Text>
                        Our user-friendly portal allows you to easily locate your vehicle and handle payment securely online, streamlining the process during a stressful time.
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card style={{ width: '18rem', cursor: 'pointer' }}>
                <Card.Img
                    variant="top"
                    src="https://knowmax-ai-website.s3.amazonaws.com/wp-content/uploads/2023/10/02124718/Customer-Service-Efficiency.webp"
                    onClick={handleImageClick}
                    className={hovered ? 'hover-effect' : ''}
                    style={{ transition: 'transform 0.3s ease' }}
                />
                <Card.Body>
                    <Card.Title>Efficient Customer Support</Card.Title>
                    <Card.Text>
                        Get Towed aims to make the aftermath of an accident as hassle-free as possible, providing peace of mind during a challenging situation. Our dedicated team is ready to address any queries or concerns you may have, ensuring a smooth experience from start to finish.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    </Container>
</div>

                        
<footer className="main-footer" style={{ background: 'orange', marginTop: '40px' }}>
    <div className="footer-middle">
        <Container>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <Form>
                        <h2>Contact Us</h2>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Full Names</Form.Label>
                            <Form.Control type="text" placeholder="fullnames" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@gmail.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Button variant="primary">Submit</Button>{' '}
                    </Form>
                </div>

                <div className="col-md-4">
    <h4>About Us</h4>
    <p>
        At Get Towed, our mission is to assist individuals navigating the aftermath of car accidents. We understand the stress and inconvenience that come with not being able to locate your vehicle after a tow. That's why we've partnered with a network of reputable towing companies, ensuring that you can rely on us to recover your car swiftly and efficiently.
    </p>
    <p>
        Whether you need to pay the towing fee, retrieve your vehicle, or lodge a query about the towing process, our user-friendly platform has you covered. We're here to provide peace of mind and support during challenging times.
    </p>
</div>

                
                <div className="col-md-4">
                    <h4>Popular Links</h4>
                    <ul className="list-unstyled">
                        <li>
                            <a href="/search"> Search </a>
                        </li>
                        <li>
                            <a href="/query"> Query </a>
                        </li>
                        <li>
                            <a href="/query"> Vehicle Retrieval </a>
                        </li>
                    </ul>
                </div>
            </div>
        </Container>
    </div>
    <div className="footer-bottom">
        <p className="text-xs-center">
            &copy; 2024 Reserved
        </p>
    </div>
</footer>

            
        </div>
    );
}

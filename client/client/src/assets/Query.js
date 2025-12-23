import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function Query() {
    const [query, setQuery] = useState({
        query: '',
        comment: '',
        date: '',
        vehicle_id: '',
        email: ''
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setQuery({
            ...query,
            [name]: value
        });
    }

    function handleNewPleadQuery() {
    const item = {
        query: query.query,
        comment: query.comment,
        date: query.date,
        vehicle_id: query.vehicle_id,
        email: query.email
    };
        fetch("http://127.0.0.1:5000/pleadquery", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item),
        })
        .then((r) => r.json())
        .then((data) => handleNewPleadQuery(data))
        setQuery({
            query: '',
            comment: '',
            date: '',
            vehicle_id: '',
            email: ''
        })
        alert("Query created successfully!");
    }
return (
    <Container style={{ minHeight: '100vh', background: 'orange' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
            <div style={{ flex: 1, textAlign: 'center', paddingRight: '20px' }}>
                <h1>FILE FOR A DISPUTE</h1>
                <p>Feeling that your vehicle was towed for the wrong reason? Kindly file a query and our team will get back to you in 24 hours</p>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>Reasons of Towing:</Form.Label>
                        <Col sm={10}>
                            <Form.Group className="mb-3" controlId="formTowing">
                                <Form.Control type="text" placeholder="enter reason for towing" name="query" value={query.query} onChange={handleInput} />
                            </Form.Group>
                        </Col>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Comments:</Form.Label>
                        <Form.Control as="textarea" rows={3} name="comment" value={query.comment} onChange={handleInput} />
                    </Form.Group>
                    <Row className="mb-3">
                        <Col>
                            <Form.Control type="text" placeholder="Date" name="date" value={query.date} onChange={handleInput} />
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Vehicle ID" name="vehicle_id" value={query.vehicle_id} onChange={handleInput} />
                        </Col>
                        <Col>
                            <Form.Control type="email" placeholder="email" name="email" value={query.email} onChange={handleInput} />
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit" onClick={handleNewPleadQuery}>Submit</Button>
                </Form>
            </div>
            <div style={{ flex: 1, padding: '40px' }}>
                <h2>Reasons to Dispute a Towed Vehicle</h2>
                <ul>
                    <li>The vehicle was parked legally</li>
                    <li>There was no clear signage indicating parking restrictions</li>
                    <li>Emergency or unforeseen circumstances prevented timely removal of the vehicle</li>
                    <li>Discrepancies in towing company procedures or documentation</li>
                    <li>Inadequate communication or notification from the towing company or parking authorities regarding the towing of the vehicle, leaving the owner unaware of the situation until after the fact.</li>
                    <li>Improperly maintained or malfunctioning parking meters or payment systems, leading to the vehicle being towed despite payment for parking being made.</li>
                    <li>The towing company engaged in predatory towing practices, such as towing vehicles without valid cause or excessively high towing fees, requiring intervention and resolution.</li>
                </ul>
                <p>
                    Disputing the towing of your vehicle is a serious matter that requires careful consideration and documentation. It's essential to gather evidence, such as photographs of parking signs or receipts for paid parking, to support your case. Additionally, contacting the relevant authorities or seeking legal advice may be necessary to navigate the dispute process effectively. Remember to remain calm and courteous when communicating with towing companies or parking authorities, as maintaining a professional demeanor can help resolve the issue more efficiently.
                </p>
            </div>
        </div>
    </Container>
)
}


export default Query;
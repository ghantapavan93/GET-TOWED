import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

export default function TowingCompany() {
    const [car, setCar] = useState({
        id: '',
        plate_number: '',
        reason_towing: '',
        location: '',
        date_of_towing: '',
        fine_amount: '',
        towing_company: '',
        towing_email: '',
    });

    const [vehicles, setVehicles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 10;

    useEffect(() => {
        // Fetch vehicles from backend when component mounts
        fetchVehicles();
    }, []);

    const fetchVehicles = () => {
        fetch("http://127.0.0.1:5000/vehicles")
            .then(response => response.json())
            .then(data => {
                setVehicles(data);
            })
            .catch(error => {
                console.error('Error fetching vehicles:', error);
            });
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCar({
            ...car,
            [name]: value,
        });
    };

    function handleNewPleadQuery() {
        const newVehicle = { ...car };
        fetch("http://127.0.0.1:5000/addvehiclecompany", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newVehicle),
        })
        .then(response => response.json())
        .then(data => {
            setVehicles([...vehicles, data]); // Update frontend state with new vehicle
            setCar({
                id: '',
                plate_number: '',
                reason_towing: '',
                location: '',
                date_of_towing: '',
                fine_amount: '',
                towing_company: '',
                towing_email: '',
            });
            alert("New Vehicle successfully added!");
        })
        .catch(error => {
            console.error('Error adding new vehicle:', error);
            alert("Failed to add new vehicle!");
        });
    }

    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = vehicles.slice(indexOfFirstCar, indexOfLastCar);

    const renderCars = currentCars.map((vehicle, index) => (
        <tr key={index}>
            <td>{vehicle.id}</td>
            <td>{vehicle.plate_number}</td>
            <td>{vehicle.reason_towing}</td>
            <td>{vehicle.location}</td>
            <td>{vehicle.date_of_towing}</td>
            <td>{vehicle.fine_amount}</td>
            <td>{vehicle.towing_company}</td>
            <td>{vehicle.towing_email}</td>
        </tr>
    ));

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={{ backgroundColor: 'orange', minHeight: '100vh', padding: '20px' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>List of our Towed Vehicles</h1>
                <h2>Fill the below form to enter car details</h2>
                <Form style={{ display: 'inline-block' }}>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Vehicle ID</Form.Label>
                        <Form.Control type="text" name="id" placeholder="Vehicle ID" value={car.id} onChange={handleInput} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Vehicle Plate Number</Form.Label>
                        <Form.Control type="text" name="plate_number" placeholder="Plate Number" value={car.plate_number} onChange={handleInput} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Reason for Towing</Form.Label>
                        <Form.Control type="text" name="reason_towing" placeholder="Reason for Towing" value={car.reason_towing} onChange={handleInput} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" name="location" placeholder="Location" value={car.location} onChange={handleInput} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Date of Towing</Form.Label>
                        <Form.Control type="text" name="date_of_towing" placeholder="Date of Towing" value={car.date_of_towing} onChange={handleInput} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Fine Amount</Form.Label>
                        <Form.Control type="text" name="fine_amount" placeholder="Fine Amount" value={car.fine_amount} onChange={handleInput} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Towing Company</Form.Label>
                        <Form.Control type="text" name="towing_company" placeholder="Towing Company" value={car.towing_company} onChange={handleInput} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Towing Company Email</Form.Label>
                        <Form.Control type="email" name="towing_email" placeholder="Towing Company Email" value={car.towing_email} onChange={handleInput} />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={handleNewPleadQuery}>
                        Submit
                    </Button>
                </Form>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Vehicle ID</th>
                        <th>Vehicle Plate Number</th>
                        <th>Reason for Towing</th>
                        <th>Location</th>
                        <th>Date of Towing</th>
                        <th>Fine Amount</th>
                        <th>Towing Company</th>
                        <th>Towing Company Email</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCars}
                </tbody>
            </Table>

            <div style={{ textAlign: 'center' }}>
                <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>
                <Button onClick={() => paginate(currentPage + 1)} disabled={currentCars.length < carsPerPage}>Next</Button>
            </div>
        </div>
    );
}

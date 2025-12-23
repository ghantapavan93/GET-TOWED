import React, { useState, useEffect } from 'react';
import { Form, Container} from 'react-bootstrap';
import './search.css'
import PaymentPage from './PaymentPage'
import Button from 'react-bootstrap/Button';

function Search() {
  const [vehicles, setVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showItem, setShowItem] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/vehicles")
      .then(response => response.json())
      .then(data => setVehicles(data))
      .catch(error => console.error('Error fetching vehicles:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredVehicles = searchQuery.trim() !== '' ?
    vehicles.filter(vehicle =>
      vehicle.plate_number.toLowerCase() === searchQuery.toLowerCase()
    ) : [];

  return (
    <Container style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'orange' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Vehicle Details</h1>
        <Form>
          <Form.Group controlId="searchQuery" style={{ width: '400px', margin: '0 auto', padding: '30px 30px'}}>
            <Form.Control
              type="text"
              placeholder="Search by plate number"
              value={searchQuery}
              onChange={handleSearch}
            />
          </Form.Group>
        </Form>
        <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '80%' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #333' }}>ID</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #333' }}>Plate Number</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #333' }}>Reason for Towing</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #333' }}>Location</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #333' }}>Date of Towing</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #333' }}>Fine Amount</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #333' }}>Towing Company</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #333' }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle, index) => (
              <tr key={vehicle.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{vehicle.id}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{vehicle.plate_number}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{vehicle.reason_towing}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{vehicle.location}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{vehicle.date_of_towing}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{vehicle.fine_amount}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{vehicle.towing_company}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{vehicle.towing_email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='App'>
			  <h1>Vehicle Payment</h1>
        <p>Proceed to make payment. After payment, you will be able to retrieve your vehicle</p>
			    {showItem ? (
				<PaymentPage/>
			) : (
				<>
					<h3>Pay the fine amount</h3>
					<img src= 'https://etimg.etb2bimg.com/photo/89992099.cms' alt='Vehicle' />
					
          <Button variant="primary" onClick={() => setShowItem(true)}>Make Payment</Button>{' '}
				</>
			)}
		</div>
	
    </Container>
  );
}

export default Search;

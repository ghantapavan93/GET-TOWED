import React from 'react';
import { Button } from 'react-bootstrap';


export default function Payment(){

    return(
       <div class="row row-cols-1 row-cols-md-2 g-4">
  <div class="col">
    <div class="card">
      <img src="https://media.istockphoto.com/id/1457185009/photo/the-person-who-calculates-with-turkish-money.webp?s=1024x1024&w=is&k=20&c=NMQiK6pbn4aQY_jmaAVe4cyS-h0IGW97ImGlcex2B38=" class="card-img-top" alt="payment"/>
      <div class="card-body">
        <h5 class="card-title">Payment</h5>
        <p class="card-text">Proceed to make payment</p>
        <Button variant="primary">Primary</Button>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src="https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="card-img-top" alt="receipt"/>
      <div class="card-body">
        <h5 class="card-title">Receipt</h5>
        <p class="card-text">This is to serve an evidence that payment was received and vehicle has been set ready for retrieval</p>
        <Button variant="success">Success</Button>{' '}
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src="https://media.istockphoto.com/id/1473771646/photo/a-young-man-buys-a-new-car.jpg?s=1024x1024&w=is&k=20&c=FUEKPORq2ax_MLwAyt0JyMtzkdIGyfiKf4jCymovoG4=" class="card-img-top" alt="vehicle retrieval"/>
      <div class="card-body">
        <h5 class="card-title">Vehicle Retrieval</h5>
        <p class="card-text">Everything is set. Hope you dont get to experience the unfortunate event</p>
        <Button variant="success">Success</Button>{' '}
      </div>
    </div>
  </div>
</div>
    )
}
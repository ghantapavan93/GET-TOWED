from flask import Flask, jsonify,request, redirect
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from datetime import datetime
from auth import auth_bp
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from views import UserAdmin, VehicleAdmin, TowingCompanyAdmin, PaymentAdmin, PleadQueryAdmin, VehicleRetrievalAdmin, ReceiptAdmin
import os
import json
import stripe





from models import db, User, Vehicle, TowingCompany, Payment,PleadQuery, VehicleRetrieval,Receipt

app = Flask(__name__)

from dotenv import load_dotenv
load_dotenv()

# Initialize Stripe with your secret key
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

app.config.from_prefixed_env()

#DATABASE CONFIGURATION
app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
app.config['SQLALCHEMY_ECHO'] = True


admin = Admin(app, name='Towing Admin Panel')
migrate = Migrate(app,db)
CORS(app)

jwt = JWTManager(app)
db.init_app(app)







# Add your ModelView subclasses to the admin interface
admin.add_view(UserAdmin(User, db.session, name='user_admin_view'))
admin.add_view(VehicleAdmin(Vehicle, db.session, name='vehicle_admin_view'))
admin.add_view(TowingCompanyAdmin(TowingCompany, db.session, name='towing_company_admin_view'))
admin.add_view(PaymentAdmin(Payment, db.session, name='payment_admin_view'))
admin.add_view(PleadQueryAdmin(PleadQuery, db.session, name='plead_query_admin_view'))
admin.add_view(VehicleRetrievalAdmin(VehicleRetrieval, db.session, name='vehicle_retrieval_admin_view'))
admin.add_view(ReceiptAdmin(Receipt, db.session, name='receipt_admin_view'))



#Register Blueprints

app.register_blueprint(auth_bp, url_prefix= '/auth')



#this is for getting api started


@app.route('/')
def dashboard():
    return f'This is the dashboard'


@app.route("/payment", methods=["POST"])
def handle_payment():
    data = request.get_json()
    amount = data["amount"]
    payment_method_id = data["id"]

    try:
        # Create a payment intent using Stripe
        payment_intent = stripe.PaymentIntent.create(
            amount=amount,
            currency="usd",
            payment_method=payment_method_id,
            confirm=True,
            description="Vehicle Towing"
        )
        print("Payment", payment_intent)
        return jsonify({
            "message": "Payment successful",
            "success": True
        }), 200
    except stripe.error.CardError as e:
        # Handle card errors
        return jsonify({
            "message": "Payment failed: " + str(e),
            "success": False
        }), 400
    except Exception as e:
        # Handle other errors
        print("Error", e)
        return jsonify({
            "message": "Payment failed: " + str(e),
            "success": False
        }), 500
    
@app.route('/vehicles', methods=['GET'])

#getting all vehicles in user dashboard
def vehicles():
    vehicles = Vehicle.query.all()
    vehicles_dict = [
        {
            'id': vehicle.id,
            'plate_number': vehicle.plate_number,
            'reason_towing': vehicle.reason_towing,
            'location': vehicle.location,
            'date_of_towing': vehicle.date_of_towing,
            'fine_amount': vehicle.fine_amount,
            'towing_company': vehicle.towing_company,
            'towing_email': vehicle.towing_email,
            'towing_company_id': vehicle.towing_company_id
        }
        for vehicle in vehicles
    ]
    return jsonify(vehicles_dict), 200

@app.route ('/addvehiclecompany', methods = ['POST'])

def addVehicleCompany():
    data = request.json
    id = data.get('id')
    plate_number = data.get('plate_number')
    reason_towing = data.get('reason_towing')
    location = data.get('location')
    date_of_towing = data.get('date_of_towing')
    fine_amount= data.get('fine_amount')
    towing_company = data.get('towing_company')
    towing_email = data.get('towing_email')

    new_vehicle = Vehicle(
        id  = id,
        plate_number = plate_number,
        reason_towing = reason_towing,
        location = location,
        date_of_towing = date_of_towing,
        fine_amount = fine_amount,
        towing_company = towing_company,
        towing_email = towing_email,
    )

    db.session.add(new_vehicle)
    db.session.commit()

    return jsonify({'message': 'New vehicle created successfully'}), 201


@app.route('/pleadquery', methods=['POST'])

#user posting query
def create_plead_query():
    data = request.json  # Assuming the data is sent in JSON format in the request body
    
    query = data.get('query')
    comment = data.get('comment')
    date = data.get('date')
    vehicle_id = data.get('vehicle_id')
    email = data.get('email')
    
    new_plead_query = PleadQuery(
        query=query,
        comment=comment,
        date=datetime.now(),
        vehicle_id=vehicle_id,
        email= email
    )
    db.session.add(new_plead_query)
    db.session.commit()
    
    return jsonify({'message': 'Plead query created successfully'}), 201


#client making payment
    
@app.route('/payments', methods=['POST'])
def payments():
    data = request.json
    payment_status = data.get('payment_status')
    amount = data.get('amount')
    user_id = data.get('user_id')
    vehicle_id = data.get('vehicle_id')


    new_payment = Payment(
            payment_status=payment_status,
            payment_date=datetime.now(),
            amount=amount,
            user_id=user_id,
            vehicle_id=vehicle_id
        )
    db.session.add(new_payment)
    db.session.commit()

    return jsonify({'message':'Payment has been made succesfully!'}),201


#adding vehicle by admin
    
@app.route('/addvehicle', methods = ['POST'])
def addVehicle():
    data = request.json

    plate_number = data.get('plate_number')
    reason_towing = data.get('reason_towing')
    location = data.get('location')
    date_of_towing = data.get('date_of_towing')
    fine_amount = data.get('fine_amount')
    towing_company = data.get('towing_company')
    towing_email = data.get('towing_email')
    towing_company_id = data.get('towing_company_id')

    new_vehicle = Vehicle(
        plate_number = plate_number,
        reason_towing = reason_towing,
        location = location,
        date_of_towing = datetime.now(),
        fine_amount = fine_amount,
        towing_company = towing_company,
        towing_email = towing_email,
        towing_company_id = towing_company_id
    )

    db.session.add(new_vehicle)
    db.session.commit()

    return jsonify({"message": "New vehicle added"}),201



#Adding towing company

@app.route('/addcompany', methods=['POST'])
def addCompany():

    data = request.json
    company_name= data.get('company_name')
    email = data.get('email')
    phone_number= data.get('phone_number')

    new_company = TowingCompany(
        company_name= company_name,
        email = email,
        phone_number = phone_number
    )
    
    db.session.add(new_company)
    db.session.commit()

    return jsonify({"message": "new company successfully added!"}),201


#admin adding receipt upon payment
@app.route('/addreceipt', methods = ['POST'])
def addReceipt():
    data = request.json

    receipt_id = data.get('receipt_id')
    payment_details= data.get('payment_details')
    date = data.get('date')
    vehicle_id = data.get('vehicle_id')
    towing_company_id = data.get('towing_company_id')
    user_id = data.get('user_id')

    new_receipt = Receipt(
        receipt_id = receipt_id,
        payment_details = payment_details,
        date =datetime.now(),
        vehicle_id = vehicle_id,
        towing_company_id = towing_company_id,
        user_id = user_id
    )

    db.session.add(new_receipt)
    db.session.commit()

    return jsonify({"message": "new receipt created successfully!"})



#user retrieving receipt
@app.route('/receipt/<int:id>', methods=['GET'])
def getReceipt(id):
    receipt = Receipt.query.filter_by(receipt_id=id).first()

    if receipt:
        receipt_json = {
            "receipt_id": receipt.receipt_id,
            "payment_details": receipt.payment_details,
            "date": receipt.date,
            "vehicle_id": receipt.vehicle_id,
            "towing_company_id": receipt.towing_company_id,
            "user_id": receipt.user_id
        }
        return jsonify(receipt_json), 200
    else:
        return jsonify({"message": "Receipt not found"}), 404
    


#Post vehicles to be retrieved by ADMIN
    
@app.route('/vehicleretrieval', methods = ['POST'])
def postVehicleRetrieval():
    data = request.json

    retrieval_date = data.get('retrieval_date')
    retrieval_status = data.get('retrieval_status')
    user_id = data.get('user_id')
    vehicle_id = data.get('vehicle_id')

    new_vehicle_retrieval = VehicleRetrieval(
        retrieval_date = datetime.now(),
        retrieval_status= retrieval_status,
        user_id = user_id,
        vehicle_id =vehicle_id
    )

    db.session.add(new_vehicle_retrieval)
    db.session.commit()

    return jsonify({"message":"vehicle set for retrieval"})


#user retrieving vehicle by id
@app.route('/vehicleretrieval/<int:id>', methods = ['GET'])
def vehicleRetrievalById(id):
    vehicle = VehicleRetrieval.query.filter_by(vehicle_id = id).first()

    if vehicle:
        vehicle_dict = {
            "retrieval_date":  vehicle.retrieval_date,
            "retrieval_status": vehicle.retrieval_status,
            "user_id": vehicle.user_id,
            "vehicle_id": vehicle.vehicle_id
        }

        return jsonify({"message": "You can pick up your car"})
    else:
        return jsonify({"message": "There is no vehicle to be picked up"})


    

    





    





if __name__=='__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)




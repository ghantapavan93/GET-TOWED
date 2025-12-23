from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    username= db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)


    def create_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    @classmethod
    def get_user_by_username(cls, username):
        return cls.query.filter_by(username=username).first()


    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()

class Vehicle(db.Model):
    __tablename__ = 'vehicles'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    plate_number = db.Column(db.String, nullable=False)
    reason_towing = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    date_of_towing = db.Column(db.String, nullable=False)
    fine_amount = db.Column(db.Integer, nullable=False)
    towing_company = db.Column(db.String, nullable=False)
    towing_email = db.Column(db.String, nullable=False)

    towing_company_id = db.Column(db.Integer, db.ForeignKey('towingcompanies.id'))  # Changed to 'towingcompanies.id'

    def __repr__(self):
        return f"Vehicle(id={self.id}, plate_number='{self.plate_number}', reason_towing='{self.reason_towing}', location='{self.location}', date_of_towing='{self.date_of_towing}', fine_amount={self.fine_amount}, towing_id={self.towing_id})"

class TowingCompany(db.Model):
    __tablename__ = 'towingcompanies'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    company_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"TowingCompany(id={self.id}, company_name='{self.company_name}', email='{self.email}', phone_number={self.phone_number})"

class Payment(db.Model):
    __tablename__ = 'payments'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    payment_status = db.Column(db.String, nullable=False)
    payment_date = db.Column(db.DateTime, nullable=False, default=datetime.now)
    amount = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # Changed to 'users.id'
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicles.id'))  # Changed to 'vehicles.id'

    user = db.relationship('User', backref='payments')  # Added relationship with User model
    vehicle = db.relationship('Vehicle', backref='payments')

    def __repr__(self):
        return f"Payment(id={self.id}, payment_status='{self.payment_status}', payment_date={self.payment_date}, amount={self.amount})"

class PleadQuery(db.Model):
    __tablename__ = 'pleadqueries'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    query = db.Column(db.String, nullable=False)
    comment = db.Column(db.String, nullable=False)
    date = db.Column(db.Integer, nullable=False)
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicles.id')) 
    email = db.Column(db.String, nullable=False, default='')


    vehicle = db.relationship('Vehicle', backref='plead_queries')

    def __repr__(self):
        return f"PleadQuery(id={self.id}, query='{self.query}', comment='{self.comment}', date={self.date})"



class VehicleRetrieval(db.Model):
    __tablename__ = 'vehicleretrievals'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    retrieval_date = db.Column(db.Integer, nullable=False)
    retrieval_status = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # Changed to 'users.id'
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicles.id'))  # Changed to 'vehicles.id'

    user = db.relationship('User', backref='vehicle_retrievals')  # Added relationship with User model
    vehicle = db.relationship('Vehicle', backref='vehicle_retrievals')

    def __repr__(self):
        return f"VehicleRetrieval(id={self.id}, retrieval_date={self.retrieval_date}, retrieval_status='{self.retrieval_status}')"

class Receipt(db.Model):
    __tablename__ = 'receipts'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    receipt_id = db.Column(db.Integer, nullable=False)
    payment_details = db.Column(db.String, nullable=False)
    date = db.Column(db.Integer, nullable=False)
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicles.id'))  # Changed to 'vehicles.id'
    towing_company_id = db.Column(db.Integer, db.ForeignKey('towingcompanies.id'))  # Changed to 'towingcompanies.id'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # Changed to 'users.id'

    vehicle = db.relationship('Vehicle', backref='receipts')  # Added relationship with Vehicle model
    towing_company = db.relationship('TowingCompany', backref='receipts')  # Added relationship with TowingCompany model
    user = db.relationship('User', backref='receipts') 

    def __repr__(self):
        return f"Receipt(id={self.id}, receipt_id={self.receipt_id}, payment_details='{self.payment_details}', date={self.date})"



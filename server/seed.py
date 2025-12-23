from app import app, db, User, Vehicle, TowingCompany, Payment, PleadQuery, VehicleRetrieval, Receipt
from faker import Faker
import random
from datetime import datetime

fake = Faker()

def seed():
    with app.app_context():
        # Seed Users
        for i in range(1, 6):
            username = fake.user_name()
            email = fake.email()
            password = fake.password()
            user = User(username=username, email = email, password=password)
            db.session.add(user)

        # Seed Vehicles
        for i in range(1, 6):
            plate_number = fake.license_plate()
            reason_towing = fake.sentence()
            location = fake.address()
            date_of_towing = fake.date_time_this_decade()
            fine_amount = random.randint(50, 500)
            towing_company = random.randint(1, 5)
            towing_email = random.randint(1,5)
            towing_company_id = random.randint(1, 5)
            vehicle = Vehicle(
                plate_number=plate_number,
                reason_towing=reason_towing,
                location=location,
                date_of_towing=date_of_towing,
                fine_amount=fine_amount,
                towing_company=towing_company,
                towing_email=towing_email,
                towing_company_id=towing_company_id
            )
            db.session.add(vehicle)

        # Seed Towing Companies
        for i in range(1, 6):
            company_name = fake.company()
            email = fake.email()
            phone_number = fake.phone_number()
            company = TowingCompany(
                company_name=company_name,
                email=email,
                phone_number=phone_number
            )
            db.session.add(company)

        # Seed Payments
        for i in range(1, 6):
            payment_status = random.choice(['Paid', 'Pending', 'Failed'])
            payment_date = fake.date_time_this_month()
            amount = random.randint(10, 100)
            user_id = random.randint(1, 5)
            vehicle_id = random.randint(1, 5)
            payment = Payment(
                payment_status=payment_status,
                payment_date=payment_date,
                amount=amount,
                user_id=user_id,
                vehicle_id=vehicle_id
            )
            db.session.add(payment)

        # Seed Plead Queries
        for i in range(1, 6):
            query = fake.sentence()
            comment = fake.text()
            date = fake.date_time_this_year()
            vehicle_id = random.randint(1, 5)
            plead_query = PleadQuery(
                query=query,
                comment=comment,
                date=date,
                vehicle_id=vehicle_id
            )
            db.session.add(plead_query)

        # Seed Vehicle Retrievals
        for i in range(1, 6):
            retrieval_date = fake.date_time_this_year()
            retrieval_status = random.choice(['Success', 'Pending', 'Failed'])
            user_id = random.randint(1, 5)
            vehicle_id = random.randint(1, 5)
            vehicle_retrieval = VehicleRetrieval(
                retrieval_date=retrieval_date,
                retrieval_status=retrieval_status,
                user_id=user_id,
                vehicle_id=vehicle_id
            )
            db.session.add(vehicle_retrieval)

        # Seed Receipts
        for i in range(1, 6):
            receipt_id = random.randint(1000, 9999)
            payment_details = fake.sentence()
            date = fake.date_time_this_month()
            vehicle_id = random.randint(1, 5)
            towing_company_id = random.randint(1, 5)
            user_id = random.randint(1, 5)
            receipt = Receipt(
                receipt_id=receipt_id,
                payment_details=payment_details,
                date=date,
                vehicle_id=vehicle_id,
                towing_company_id=towing_company_id,
                user_id=user_id
            )
            db.session.add(receipt)

        # Commit the changes to the database
        db.session.commit()

if __name__ == '__main__':
    seed()

from flask_admin.contrib.sqla import ModelView
from models import db, User, Vehicle, TowingCompany, Payment, PleadQuery, VehicleRetrieval, Receipt

class UserAdmin(ModelView):
    column_list = ('username', 'email') # 'role' removed as it's not a direct attribute of User
    column_labels = {'username': 'Username', 'email': 'Email Address'}
    column_filters = ('username', 'email')

class VehicleAdmin(ModelView):
    column_list = ('plate_number', 'reason_towing', 'location', 'date_of_towing', 'fine_amount', 'towing_company', 'towing_email') # Removed 'towing_id'
    column_labels = {'plate_number': 'Plate Number', 'reason_towing': 'Reason for Towing', 'location': 'Location', 'date_of_towing': 'Date of Towing', 'fine_amount': 'Fine Amount', 'towing_company': 'Towing Company', 'towing_email': 'Towing Email'}
    column_filters = ('plate_number', 'reason_towing', 'location', 'date_of_towing', 'fine_amount', 'towing_company', 'towing_email')

class TowingCompanyAdmin(ModelView):
    column_list = ('company_name', 'email', 'phone_number')
    column_labels = {'company_name': 'Company Name', 'email': 'Email', 'phone_number': 'Phone Number'}
    column_filters = ('company_name', 'email', 'phone_number')

class PaymentAdmin(ModelView):
    column_list = ('payment_status', 'payment_date', 'amount', 'user_id', 'vehicle_id')
    column_labels = {'payment_status': 'Payment Status', 'payment_date': 'Payment Date', 'amount': 'Amount', 'user_id': 'User id', 'vehicle_id': 'Vehicle id'}
    column_filters = ('payment_status', 'payment_date', 'amount', 'user.username', 'vehicle.plate_number')

class PleadQueryAdmin(ModelView):
    column_list = ('query', 'comment', 'date', 'vehicle', 'email')
    column_labels = {'query': 'Query', 'comment': 'Comment', 'date': 'Date', 'vehicle': 'Vehicle', 'email': 'email'}
    column_filters = ('query', 'comment', 'date', 'vehicle.plate_number', 'email')

class VehicleRetrievalAdmin(ModelView):
    column_list = ('retrieval_date', 'retrieval_status', 'user', 'vehicle')
    column_labels = {'retrieval_date': 'Retrieval Date', 'retrieval_status': 'Retrieval Status', 'user': 'User', 'vehicle': 'Vehicle'}
    column_filters = ('retrieval_date', 'retrieval_status', 'user.username', 'vehicle.plate_number')

class ReceiptAdmin(ModelView):
    column_list = ('receipt_id', 'payment_details', 'date', 'vehicle', 'towing_company', 'user')
    column_labels = {'receipt_id': 'Receipt ID', 'payment_details': 'Payment Details', 'date': 'Date', 'vehicle': 'Vehicle', 'towing_company': 'Towing Company', 'user': 'User'}
    column_filters = ('receipt_id', 'payment_details', 'date', 'vehicle.plate_number', 'towing_company.company_name', 'user.username')




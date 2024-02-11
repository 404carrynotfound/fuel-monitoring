import os
from datetime import date

from flask import Blueprint, request, jsonify, send_file

from src.models.fuel_record import fuel_records, FuelRecord
from src.models.vehicle_record import vehicles
from src.utils.auth import auth_required
from src.utils.file_helper import save_to_file

fuel_blueprint = Blueprint('fuel', __name__)


@fuel_blueprint.route('/', methods=['POST'])
@auth_required
def save_fuel(user):
    fuel_type = request.form.get('fuelType')
    fuel_amount = request.form.get('fuelAmount')
    fuel_cost = request.form.get('fuelCost')
    vehicle_id = request.form.get('vehicleId')

    if not next((vehicle for vehicle in vehicles if vehicle.id == int(vehicle_id)), None):
        return jsonify({"message": "Missing vehicle"}), 400

    for file in request.files.getlist('file'):
        file_type = file.content_type

        if 'image' not in file_type:
            return jsonify({"message": "Invalid file type"}), 400

        file_path = save_to_file(user, file)
        fuel_records.append(FuelRecord(fuel_type, fuel_amount, fuel_cost, user, vehicle_id, file_path, file_type))

    return jsonify({'message': 'File uploaded successfully'})


@fuel_blueprint.route('/', methods=['GET'])
@auth_required
def get_fuel_records(user):
    return jsonify({'records': [record.to_json() for record in fuel_records]}), 200


@fuel_blueprint.route('/download/<record_id>', methods=['GET'])
@auth_required
def download_file(user, record_id):
    record = next((record for record in fuel_records if record.id == int(record_id)), None)

    if not record:
        return jsonify({"message": 'Record not found'}), 404

    return send_file(record.file_path, as_attachment=True), 200


@fuel_blueprint.route('/my-records', methods=['GET'])
@auth_required
def get_my_fuel_records(user):
    return jsonify({'records': [record.to_json() for record in fuel_records if record.username == user]}), 200


@fuel_blueprint.route('/<record_id>', methods=['GET'])
@auth_required
def get_fuel_record(user, record_id):
    return jsonify(
        {'record': next((record for record in fuel_records if record.id == int(record_id)), None).to_json()}), 200


@fuel_blueprint.route('/<record_id>', methods=['DELETE'])
@auth_required
def delete_fuel_record(username, record_id):
    to_delete = find_record(int(record_id), username)

    if to_delete is None:
        return jsonify({"message": 'Record not found'}), 404

    fuel_records.remove(to_delete)
    os.remove(to_delete.file_path)

    return '', 204


@fuel_blueprint.route('/daily', methods=['GET'])
def get_fuel_daily():
    return jsonify({"total": sum(
        fuel_record.fuel_cost for fuel_record in fuel_records if
        fuel_record.date == date.today().strftime("%d/%m/%Y"))}), 200


@fuel_blueprint.route('/monthly', methods=['GET'])
def get_fuel_monthly():
    return jsonify({"total": sum(
        fuel_record.fuel_cost for fuel_record in fuel_records if
        fuel_record.date.split('/')[1] == date.today().strftime(
            "%m"))}), 200


@fuel_blueprint.route('/yearly', methods=['GET'])
def get_fuel_yearly():
    return jsonify({"total": sum(
        fuel_record.fuel_cost for fuel_record in fuel_records if
        fuel_record.date.split('/')[2] == date.today().strftime(
            "%Y"))}), 200


def find_record(record_id, username):
    return next((record for record in fuel_records if record.username == username and record.id == record_id), None)

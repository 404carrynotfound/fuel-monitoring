from flask import Blueprint, request

from src.models.vehicle_record import vehicles, VehicleRecord
from src.utils.auth import auth_required

vehicle_blueprint = Blueprint('vehicle', __name__)


@vehicle_blueprint.route('/', methods=['POST'])
@auth_required
def save_vehicle(user):
    data = request.get_json()
    vehicle_register_number = data.get('registerNumber')
    vehicles.append(VehicleRecord(vehicle_register_number, user))
    return {'message': 'Vehicle added successfully'}, 200


@vehicle_blueprint.route('/', methods=['GET'])
@auth_required
def get_vehicles(user):
    return {'vehicles': [vehicle.to_json() for vehicle in vehicles]}, 200


@vehicle_blueprint.route('/<vehicle_id>', methods=['GET'])
@auth_required
def get_vehicle(user, vehicle_id):
    vehicle = next((vehicle for vehicle in vehicles if vehicle.id == int(vehicle_id)), None)
    if not vehicle:
        return {'message': 'Vehicle not found'}, 404
    return vehicle.to_json(), 200


@vehicle_blueprint.route('/my-vehicles', methods=['GET'])
@auth_required
def get_my_vehicles(user):
    return {'vehicles': [vehicle.to_json() for vehicle in vehicles if vehicle.username == user]}, 200


@vehicle_blueprint.route('/<vehicle_id>', methods=['DELETE'])
@auth_required
def delete_vehicle(user, vehicle_id):
    vehicle = next((vehicle for vehicle in vehicles if vehicle.id == int(vehicle_id)), None)
    if not vehicle:
        return {'message': 'Vehicle not found'}, 404
    vehicles.remove(vehicle)
    return {'message': 'Vehicle deleted successfully'}, 200

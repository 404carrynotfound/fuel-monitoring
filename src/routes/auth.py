from flask import Blueprint, request, jsonify

from src.models.user import users, User
from src.utils.auth import auth_required, generate_token

auth_blueprint = Blueprint('auth', __name__)


@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = next((user for user in users if user.username == username and user.password == password), None, )

    return (jsonify({"token": generate_token(user.username)}) if user
            else jsonify({"error": "Invalid credentials"}),
            200 if user else 401)


@auth_blueprint.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if any(user.username == username for user in users):
        return jsonify({"error": "User already exists"}), 400

    users.append(User(username, password))
    return jsonify({"token": generate_token(username)}), 201


@auth_blueprint.route('/logout', methods=['GET'])
@auth_required
def logout():
    return jsonify({"token": ""}), 200

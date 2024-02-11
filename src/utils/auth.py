from functools import wraps

import jwt
from flask import request, abort, jsonify, make_response
from jwt import DecodeError
from src.models.user import users

SECRET = 'JWT_SECRET'


def generate_token(username):
    return jwt.encode({'sub': username}, SECRET, algorithm='HS256')


def get_user():
    if not 'Authorization' in request.headers:
        abort(make_response(jsonify({'error': 'Authorization header is required'}), 401))

    data = request.headers['Authorization'].encode('ascii', 'ignore')
    token = str.replace(str(data.decode('utf-8')), 'Bearer ', '')
    try:
        username = jwt.decode(token, SECRET, algorithms=['HS256'])['sub']
        if not any(user.username == username for user in users):
            abort(make_response(jsonify({'error': 'Invalid token'}), 401))
    except DecodeError:
        abort(make_response(jsonify({'error': 'Invalid token'}), 401))

    return username


def auth_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(get_user(), *args, **kwargs)

    return wrapper

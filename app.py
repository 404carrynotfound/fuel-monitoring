from flask import Flask
from flask_cors import CORS

from src.routes.auth import auth_blueprint
from src.routes.fuel import fuel_blueprint
from src.routes.vehicle import vehicle_blueprint

app = Flask(__name__)
app.register_blueprint(fuel_blueprint, url_prefix='/fuel')
app.register_blueprint(auth_blueprint)
app.register_blueprint(vehicle_blueprint, url_prefix='/vehicle')

CORS(app)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


if __name__ == '__main__':
    app.run(port=5000, debug=True, host='0.0.0.0')

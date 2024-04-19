"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, Countries, States, Nationalities, Roles, Employees
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands



# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False
CORS(app, support_credentials=True)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


@app.route('/api/countries', methods=['GET'])
@cross_origin(supports_credentials=True)
def getCountries():
    countries = Countries.query.all()
    serialized_countries = [country.serialize() for country in countries]
    return jsonify(serialized_countries), 200


@app.route('/api/nationalities', methods=['GET'])
@cross_origin(supports_credentials=True)
def getNationalities():
    nationalities = Nationalities.query.all()
    serialized_countries = [nationality.serialize() for nationality in nationalities]
    return jsonify(serialized_countries), 200



@app.route('/api/states', methods=['GET'])
def getStates():
    country_id = request.args.get('country_id')
    if country_id is None: 
        return jsonify({'msg': 'You must specify a country id'}), 400
    states = States.query.filter_by(country_id=country_id).all()
    serialized_states = [state.serialize() for state in states]
    return jsonify(serialized_states), 200

@app.route('/api/roles', methods=['GET'])
@cross_origin(supports_credentials=True)
def getRoles():
    roles = Roles.query.all()
    serialized_roles = [role.serialize() for role in roles]
    return jsonify(serialized_roles), 200

#Endpoint for register
@app.route('/signupEmployee', methods=['POST'])
def signupUser():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': "You can not send empty info"}), 400
    if 'email' not in body: 
        return jsonify({'msg': "The email field is mandatory"}), 400
    if 'password' not in body: 
        return jsonify({'msg': "You must specify a password"}), 400
    if 'surname' not in body:
        return jsonify({'msg': "The surname field is mandatory"}), 400
    if 'name' not in body:
        return jsonify({'msg': "The name field is mandatory"}), 400
    if 'crew_id' not in body: 
        return jsonify({'msg': "The id field is mandatory"}), 400
    if 'role_id' not in body: 
        return jsonify({'msg': "The role field is mandatory"}), 400
    if 'department_id' not in body: 
        return jsonify({'msg': "The department field is mandatory"}), 400

    new_employee = Employees()
    new_employee.email = body['email']
    new_employee.password = body['password']
    new_employee.surname = body['surname']
    new_employee.name = body['name']
    new_employee.crew_id = body['crew_id']
    new_employee.gender = body['gender']
    new_employee.department_id = body['department_id']
    new_employee.role_id = body['role']
    db.session.add(new_employee)
    db.session.commit()
    return jsonify({'msg': "Employee successfully added to database"}), 200
    
    
    









# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

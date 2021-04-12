""" Specifies routing for the application"""
from flask import render_template, request, jsonify
from app import app
from app import database as db_helper

@app.route("/distributor", methods=['POST'])
def create_distributor():
    """Creates a new distributor"""
    data = request.get_json()
    try:
        if "distributor_name" in data and 'distributor_city' in data:
            db_helper.insert_distributor(data['distributor_city'], data['distributor_name'])
            result = {'success': True, 'response': 'Inserted'}
        else:
            result = {'success': True, 'response': 'Missing fields'}
    except:
        result = {'success': False, 'response': 'Something went wrong'}

    return jsonify(result)

@app.route("/distributor/<string:city>", methods=['GET'])
def get_city_distributor(city):
    """Get distributors in a city"""
    try:
        res = db_helper.get_distributor_city(city)
        result = {'success': True, 'response': res }
    except Exception as e:
        print(e)
        result = {'success': False}
    return jsonify(result)

@app.route("/distributor/<string:distributor_id>", methods=['PUT'])
def update_distributor(distributor_id):
    """Updates a distributor"""
    try:
        r = request.json
        db_helper.update_distributor(distributor_id, r["distributor_city"], r["distributor_name"])
        result = {'success': True }
    except Exception as e:
        print(e)
        result = {'success': False}
    return jsonify(result)

@app.route("/distributor/<string:distributor_id>", methods=['DELETE'])
def delete_distributor(distributor_id):
    """Deletes a distributor"""
    try:
        r = request.json
        db_helper.delete_distributor(distributor_id)
        result = {'success': True }
    except Exception as e:
        print(e)
        result = {'success': False}
    return jsonify(result)

@app.route("/countryrating", methods=['GET'])
def get_country_avg_rating():
    """Gets countries and average ratings"""
    try:
        data = db_helper.get_countries_average_rating()
        result = {'success': True,  'response': data}
    except Exception as e:
        print(e)
        result = {'success': False}
    return jsonify(result)
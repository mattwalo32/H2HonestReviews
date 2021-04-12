""" Specifies routing for the application"""
from flask import render_template, request, jsonify
from app import app
from app import database as db_helper


@app.route("/", methods=['POST'])
def get_all_mfg():
    result = db_helper.fetch_manufacturers()
    return jsonify(result)


@app.route("/<int:manufacturer_id>", methods=['DELETE'])
def delete(manufacturer_id):
    try:
        db_helper.remove_manufacturer_by_id(manufacturer_id)
        result = {'success': True, 'response': 'Removed water'}
    except:
        result = {'success': False, 'response': 'Something went wrong'}
    return jsonify(result)


@app.route("/<int:manufacturer_id>", methods=['PUT'])
def update(manufacturer_id):
    data = request.get_json()
    try:
        if "name" in data and "year" in data and "country" in data:
            db_helper.update_manufacturer_entry(manufacturer_id, data["name"], data["year"], data["country"])
            result = {'success': True, 'response': 'Status Updated'}
        else:
            result = {'success': True, 'response': 'Nothing Updated'}
    except:
        result = {'success': False, 'response': 'Something went wrong'}
    return jsonify(result)


@app.route("/create", methods=['POST'])
def create():
    data = request.get_json()
    try:
        if "name" in data and 'year' in data and 'country' in data:
            db_helper.insert_new_manufacturer(data['name'], data["year"], data['country'])
            result = {'success': True, 'response': 'Inserted'}
        else:
            result = {'success': True, 'response': 'Missing fields'}
    except:
        result = {'success': False, 'response': 'Something went wrong'}

    return jsonify(result)


@app.route("/water_by_city", methods=['POST'])
def water_by_city():
    items = db_helper.water_ratings_by_city()
    return render_template("index.html", items=items)
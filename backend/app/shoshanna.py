""" Specifies routing for the application"""
from flask import render_template, request, jsonify
from app import app
from app import database as db_helper

@app.route("/waters", methods=['GET'])
def get_waters():
    """ get all waters from table """
    try:
        waters = db_helper.fetch_waters()
        result = {'success': True, 'response': waters}
    except:
        result = {'success': False, 'response': 'Something went wrong'}
    return jsonify(result)

@app.route("/waters/name/<string:name>", methods=['GET'])
def get_waters_by_name(name):
    """ get all waters from table with name like name """
    try:
        waters = db_helper.search_waters(name)
        result = {'success': True, 'response': waters}
    except:
        result = {'success': False, 'response': 'Something went wrong'}
    return jsonify(result)

@app.route("/following/favorites/<int:user_id>", methods=['GET'])
def get_friend_favs(user_id):
    """ get favorite waters of friends (users that user with user_id follows) """
    try:
        waters = db_helper.get_favorite_waters_of_following(user_id)
        result = {'success': True, 'response': waters}
    except:
        result = {'success': False, 'response': 'Something went wrong'}
    return jsonify(result)

@app.route("/waters/delete/<int:water_id>", methods=['POST'])
def delete_water(water_id):
    """ recieved post requests for entry delete """
    try:
        db_helper.remove_water_by_id(water_id)
        result = {'success': True, 'response': 'Removed water'}
    except:
        result = {'success': False, 'response': 'Something went wrong'}
    return jsonify(result)


@app.route("/waters/edit/<int:water_id>", methods=['POST'])
def update_water(water_id):
    """ recieved post requests for entry updates """
    data = request.get_json()
    print(data)
    try:
        if "name" in data:
            db_helper.update_water_entry(water_id, data["name"])
            result = {'success': True, 'response': 'Status Updated'}
        else:
            result = {'success': True, 'response': 'Nothing Updated'}
    except:
        result = {'success': False, 'response': 'Something went wrong'}
    return jsonify(result)


@app.route("/waters/create", methods=['POST'])
def create_water():
    data = request.get_json()
    try:
        if "name" in data and 'manufacturer_id' in data:
            db_helper.insert_new_water(data['manufacturer_id'], data["name"])
            result = {'success': True, 'response': 'Inserted'}
        else:
            result = {'success': True, 'response': 'Missing fields'}
    except:
        result = {'success': False, 'response': 'Something went wrong'}

    return jsonify(result)

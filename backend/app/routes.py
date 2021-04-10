""" Specifies routing for the application"""
from flask import render_template, request, jsonify
from app import app
from app import database as db_helper

@app.route("/delete/<int:water_id>", methods=['POST'])
def delete(water_id):
    """ recieved post requests for entry delete """
    try:
        db_helper.remove_task_by_id(water_id)
        result = {'success': True, 'response': 'Removed task'}
    except:
        result = {'success': False, 'response': 'Something went wrong'}
    return jsonify(result)


@app.route("/edit/<int:water_id>", methods=['POST'])
def update(water_id):
    """ recieved post requests for entry updates """
    data = request.get_json()
    try:
        if "name" in data:
            db_helper.update_status_entry(water_id, data["name"])
            result = {'success': True, 'response': 'Status Updated'}
        else:
            result = {'success': True, 'response': 'Nothing Updated'}
    except:
        result = {'success': False, 'response': 'Something went wrong'}
    return jsonify(result)


@app.route("/create", methods=['POST'])
def create():
    try:
        if "name" in data and 'manufacturer_id' in data:
            db_helper.insert_new_water(data['manufacturer_id'], data["name"])
            result = {'success': True, 'response': 'Inserted'}
        else:
            result = {'success': True, 'response': 'Missing fields'}
    except:
        result = {'success': False, 'response': 'Something went wrong'}

    return jsonify(result)


@app.route("/")
def homepage():
    """ returns rendered homepage """
    items = db_helper.fetch_waters()
    return render_template("index.html", items=items)
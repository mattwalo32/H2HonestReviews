""" Specifies routing for the application"""
from flask import render_template, request, jsonify
from app import app
from app import database as db

@app.route("/water/<int:water_id>/reviews", methods=['GET'])
def get_water_reviews(water_id):
    """Gets all reviews for a water"""
    try:
        reviews = db.get_reviews_for_a_water(water_id)
        result = {'success': True, 'response': reviews}
    except Exception as e:
        print(e)
        result = {'success': False, 'response': 'Something went wrong'}
    return jsonify(result)

@app.route("/users/<string:username>", methods=['GET'])
def get_user(username):
    """Get users where username LIKE username"""
    # TODO

@app.route("/reviews", methods=['POST'])
def create_review():
    """Creates a new review"""
    # TODO

@app.route("/reviews", methods=['PUT'])
def create_review():
    """Creates a new review"""
    # TODO

@app.route("/reviews", methods=['DELETE'])
def delete_review():
    """Deletes a new review"""
    # TODO

@app.route("/users/<string:username>", methods=['GET'])
def get_user(username):
    """Get users where username LIKE username"""
    # TODO

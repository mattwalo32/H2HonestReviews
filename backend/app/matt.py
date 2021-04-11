""" Specifies routing for the application"""
from flask import render_template, request, jsonify
from app import app
from app import database as db

# @app.route("/reviews", methods=['POST'])
# def delete(water_id):
#     """ Submits a review """
#     try:
#         db_helper.execute_query("")
#         result = {'success': True, 'response': 'Removed water'}
#     except:
#         result = {'success': False, 'response': 'Something went wrong'}
#     return jsonify(result)

@app.route("/<int:water_id>/reviews", methods=['GET'])
def get_water(water_id):
    """Gets all reviews for a water"""
    try:
        reviews = db.get_reviews_for_a_water(water_id)
        result = {'success': True, 'response': reviews}
    except Exception as e:
        print(e)
        result = {'success': False, 'response': 'Something went wrong'}
    return jsonify(result)
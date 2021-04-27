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
    try:
        res = db.get_users_like(username)
        result = {'success': True, 'response': res }
    except Exception as e:
        print(e)
        result = {'success': False}
    return jsonify(result)

@app.route("/reviews/<int:water_id>", methods=['POST'])
def create_review(water_id):
    """Creates a new review"""
    try:
        r = request.json
        res = db.create_review(r["Rating"], water_id, r["Taste"], r["Price"], r["Mouth Feel"], r["Portability"], r["Packaging Quality"], r["user_id"])
        result = {'success': True, 'user': r["user_id"], 'review_id': res}
    except Exception as e:
        print(e)
        result = {'success': False}
    return jsonify(result)

@app.route("/reviews/<string:review_id>", methods=['PUT'])
def update_review(review_id):
    """Updates a review"""
    try:
        r = request.json
        db.update_review(r["Rating"], r["water_id"], r["Taste"], r["Price"], r["Mouth Feel"], r["Portability"], r["Packaging Quality"], r["user_id"], review_id)
        result = {'success': True }
    except Exception as e:
        print(e)
        result = {'success': False}
    return jsonify(result)



@app.route("/reviews/<string:review_id>", methods=['DELETE'])
def delete_review(review_id):
    """Deletes a new review"""
    try:
        db.delete_review(review_id)
        result = {'success': True }
    except Exception as e:
        print(e)
        result = {'success': False}
    return jsonify(result)


@app.route("/water/byminrating/<string:rating>", methods=['GET'])
def get_waters_by_min_rating(rating):
    """Gets all waters with a min rating"""
    try:
        data = db.get_waters_by_min_rating(rating)
        result = {'success': True,  'response': data}
    except Exception as e:
        print(e)
        result = {'success': False}
    return jsonify(result)

@app.route("/water/<string:waterId>", methods=['GET'])
def get_water_details(waterId):
    """Gets all waters with a min rating"""
    try:
        data = db.fetch_water_details_by_id(waterId)
        result = {'success': True,  'response': data}
    except Exception as e:
        print(e)
        result = {'success': False}
    return jsonify(result)

@app.route("/users", methods=['POST'])
def create_user():
    """Creates a new user"""
    try:
        r = request.json
        if (db.create_user(r["username"], r["password"]) == -1):
            result = {'success': False, 'message': 'Account is taken'}
        else:
            result = {'success': True }
    except Exception as e:
        print(e)
        result = {'success': False, 'message': str(e)}
    return jsonify(result)

@app.route("/users", methods=['GET'])
def login_user():
    """Gets a users id"""
    try:
        id = db.get_user_id(request.args.get("username"), request.args.get("password"))
        if (id is None):
            result = {'success': False, 'message': 'Incorrect username or password'}
        else:
            result = {'success': True, 'data': id }
    except Exception as e:
        print(e)
        result = {'success': False, 'message': str(e)}
    return jsonify(result)


@app.route("/waters/<string:waterId>/similar", methods=['GET'])
def get_similar_water(waterId):
    """Gets a users id"""
    try:
        waters = db.get_similar_waters(waterId)
        result = {'success': True, 'data': waters }
    except Exception as e:
        print(e)
        result = {'success': False, 'message': str(e)}
    return jsonify(result)
"""Defines all the functions related to the database"""
from app import db

def fetch_waters() -> dict:
    conn = db.connect()
    query_results = conn.execute("Select * from Water;").fetchall()
    conn.close()
    water_list = []
    for result in query_results:
        item = {
            "manufacturer_id": result[0],
            "water_id": result[1],
            "name": result[2]
        }
        water_list.append(item)
    print(water_list[0])
    return water_list

def search_waters(water_name: str):
    conn = db.connect()
    query = "SELECT * FROM Water W WHERE W.name = {} ORDER ASC;".format(water_name)
    query_results = conn.execute(query).fetchall()
    conn.close()
    water_list = []
    for result in query_results:
        item = {
            "manufacturer_id": result[0],
            "water_id": result[1],
            "name": result[2]
        }
        water_list.append(item)
    return water_list

def update_water_entry(water_id: int, name: str) -> None:
    conn = db.connect()
    query = 'Update Water set name = "{}" where id = {};'.format(name, water_id)
    conn.execute(query)
    conn.close()


def insert_new_water(manufacturer_id: int, name: str) ->  int:
    """
    Insert new water into water table. water_id is auto-generated
    """

    conn = db.connect()
    query = 'Insert Into Water(water_id, manufacturer_id, name) VALUES ("{}", "{}");'.format(
        "NULL", manufacturer_id, name)
    conn.execute(query)
    query_results = conn.execute("Select LAST_INSERT_ID();")
    query_results = [x for x in query_results]
    water_id = query_results[0][0]
    conn.close()
    return water_id


def remove_water_by_id(water_id: int) -> None:
    """ remove entries based on water ID """
    conn = db.connect()
    query = 'Delete From Water where water_id={};'.format(water_id)
    conn.execute(query)
    conn.close()

def get_reviews_for_a_water(water_id: int) -> dict:
    conn = db.connect()
    query = 'SELECT * FROM Reviews R WHERE R.water_id = {}'.format(water_id)
    query_results = conn.execute(query).fetchall()
    conn.close()
    review_list = []
    for result in query_results:
        item = {
            "review_id" : result[0],
            "rating": result[1] ,   
            "water_id": result[2],
            "taste": result[3],
            "price": result[4],
            "mouth_feel": result[5],
            "portability": result[6],
            "packaging_quality": result[7],
            "user_id": result[8]
        }
        review_list.append(item)

    return review_list

def update_review(rating, water_id, taste, price, mouth_feel, portability, packaging_quality, user_id, review_id):
    conn = db.connect()
    query = 'UPDATE Reviews SET rating={}, water_id={}, taste={}, price={}, mouth_feel={}, portability={}, packaging_quality={}, user_id={} WHERE review_id={};'.format(
        rating, water_id, taste, price, mouth_feel, portability, packaging_quality, user_id, review_id)
    conn.execute(query)
    conn.close()

def create_review(rating, water_id, taste, price, mouth_feel, portability, packaging_quality, user_id):
    conn = db.connect()
    query = 'Insert Into Reviews(rating, water_id, taste, price, mouth_feel, portability, packaging_quality, user_id) VALUES ("{}", "{}", "{}", "{}", "{}", "{}", "{}", "{}");'.format(
        rating, water_id, taste, price, mouth_feel, portability, packaging_quality, user_id)
    conn.execute(query)
    conn.close()

def delete_review(review_id):
    conn = db.connect()
    query = 'DELETE FROM Reviews WHERE review_id={}'.format(review_id)
    conn.execute(query)
    conn.close()

def get_users_like(username):
    conn = db.connect()
    query = 'SELECT * FROM User WHERE username LIKE \'{}%%\''.format(username)
    query_results = conn.execute(query).fetchall()
    conn.close()
    review_list = []
    for result in query_results:
        item = {
            "username" : result[1],
        }
        review_list.append(item)

    return review_list

def get_waters_by_min_rating(min_rating):
    conn = db.connect()
    query = """SELECT Water.water_id, manufacturer_id, Water.name AS water_name, Manufacturer.name AS manufacturer_name, rating.avg_rating
FROM Water JOIN Manufacturer USING(manufacturer_id),
    (
        SELECT water_id, AVG(rating) AS avg_rating
        FROM Reviews JOIN Water USING(water_id)
        GROUP BY water_id
    ) AS rating
WHERE rating.avg_rating > {} AND Water.water_id = rating.water_id""".format(min_rating)
    query_results = conn.execute(query).fetchall()
    conn.close()
    water_list = []
    for result in query_results:
        item = {
            "manufacturer_id": result[1],
            "water_id": result[0],
            "name": result[2],
            "manufacturer": result[3],
            "avg_rating": str(result[4]),
        }
        water_list.append(item)
    return water_list
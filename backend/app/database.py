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
            "water_name": result[2]
        }
        water_list.append(item)
    return water_list

def search_waters(water_name: str):
    print('here')
    conn = db.connect()
    query = 'SELECT * FROM Water W WHERE W.name LIKE "%%{}%%" ORDER BY W.name;'.format(water_name)
    print(query)
    query_results = conn.execute(query).fetchall()
    print(query_results)
    conn.close()
    water_list = []
    for result in query_results:
        item = {
            "manufacturer_id": result[0],
            "water_id": result[1],
            "water_name": result[2]
        }
        water_list.append(item)
    return water_list

def update_water_entry(water_id: int, name: str) -> None:
    conn = db.connect()
    query = 'Update Water set name = "{}" where water_id = {};'.format(name, water_id)
    conn.execute(query)
    conn.close()


def insert_new_water(manufacturer_id: int, name: str) ->  int:
    """
    Insert new water into water table. water_id is auto-generated
    """
    conn = db.connect()
    query = 'Insert Into Water(manufacturer_id, name) VALUES ({}, "{}");'.format(
        manufacturer_id, name)
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

def fetch_manufacturers() -> dict:
    conn = db.connect()
    query_results = conn.execute("Select * from Manufacturer;").fetchall()
    conn.close()
    mfg_list = []
    for result in query_results:
        item = {
            "name": result[0],
            "manufacturer_id": result[1],
            "year_founded": result[2],
            "country": result[3]
        }
        mfg_list.append(item)
    return mfg_list

def remove_manufacturer_by_id(manufacturer_id: int) -> None:
    """ remove entries based on manufacturer_id """
    conn = db.connect()
    query = 'Delete From Manufacturer where manufacturer_id={};'.format(manufacturer_id)
    conn.execute(query)
    conn.close()

def update_manufacturer_entry(manufacturer_id: int, name: str, year_founded: int, country: str) -> None:
    conn = db.connect()
    query = 'Update Manufacturer Set name = "{}", year_founded="{}", country="{}" where id = {};'.format(name, manufacturer_id, year_founded, country)
    conn.execute(query)
    conn.close()

def insert_new_manufacturer(name: str, year_founded: int, country: str) ->  dict:
    """
    Insert new manufacturer into Manufacturer table. manufacturer is auto-generated
    """
    conn = db.connect()
    query = 'Insert Into Manufacturer(name, manufacturer_id, year_founded, country) VALUES ("{}", "{}");'.format(
        name, "NULL", year_founded, country)
    conn.execute(query)
    query_results = conn.execute("Select LAST_INSERT_ID();")
    query_results = [x for x in query_results]
    manufacturer_entry = query_results[0]
    conn.close()
    return manufacturer_entry

def water_ratings_by_city() -> dict:
    conn = db.connect()
    query = "SELECT D.distributor_city, AVG(R.rating) as avgRating FROM Distributor D NATURAL JOIN Sells S NATURAL JOIN Water W NATURAL JOIN Reviews R GROUP BY D.distributor_city ORDER BY D.distributor_city;"
    query_results = conn.execute(query)
    ratings_list = []
    for result in query_results:
        item = {
            "city": result[0],
            "avg_rating": result[1]
        }
        ratings_list.append(item)
    return ratings_list

def get_favorite_waters_of_following(user_id: int) -> dict:
    conn = db.connect()
    query = """SELECT f.follower_id AS user_id, a.user_id AS friend_id, a.water_id AS fav_water_id, u1.name as user_name, u2.name as friend_name, w.name as name
                FROM Water w, User u1, User u2, Follows f JOIN
                    (
                    SELECT r1.user_id AS user_id, r1.water_id AS water_id
                    FROM Reviews r1
                    WHERE r1.rating = 
                        (
                        SELECT MAX(r2.rating)
                        FROM Reviews r2
                        WHERE r2.user_id = r1.user_id
                        GROUP BY r2.user_id
                        )
                    ) a ON f.followee_id = a.user_id
                WHERE w.water_id = a.water_id AND u1.user_id = f.follower_id AND u2.user_id = f.followee_id AND f.follower_id = {};
            """.format(user_id)
    query_results = conn.execute(query).fetchall()
    conn.close()
    following_favs_list = []
    for result in query_results:
        item = {
            "user_id" : result[0],
            "friend_id": result[1] ,   
            "fav_water_id": result[2],
            "user_name": result[3],
            "friend_name": result[4],
            "water_name": result[5]
        }
        following_favs_list.append(item)
    
    return following_favs_list

def create_review(rating, water_id, taste, price, mouth_feel, portability, packaging_quality, user_id):
    conn = db.connect()
    query = 'Insert Into Reviews(rating, water_id, taste, price, mouth_feel, portability, packaging_quality, user_id) VALUES ("{}", "{}", "{}", "{}", "{}", "{}", "{}", "{}");'.format(
        rating, water_id, taste, price, mouth_feel, portability, packaging_quality, user_id)
    conn.execute(query)
    conn.close()

def update_review(rating, water_id, taste, price, mouth_feel, portability, packaging_quality, user_id, review_id):
    conn = db.connect()
    query = 'UPDATE Reviews SET rating={}, water_id={}, taste={}, price={}, mouth_feel={}, portability={}, packaging_quality={}, user_id={} WHERE review_id={};'.format(
        rating, water_id, taste, price, mouth_feel, portability, packaging_quality, user_id, review_id)
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
            "water_name": result[2],
            "manufacturer": result[3],
            "avg_rating": str(result[4]),
        }
        water_list.append(item)
    return water_list

def insert_distributor(distributor_city, distributor_name):
    """
    Insert new distributor into distributor table. distributor_id is auto-generated
    """
    conn = db.connect()
    query = 'Insert Into Distributor(distributor_name, distributor_city) VALUES ("{}", "{}");'.format(
        distributor_name, distributor_city)
    conn.execute(query)
    conn.close()

def get_distributor_city(city: str):
    conn = db.connect()
    query = 'SELECT * FROM Distributor WHERE distributor_city="{}"'.format(city)
    query_results = conn.execute(query).fetchall()
    conn.close()
    distributor_list = []
    for result in query_results:
        item = {
            "distributor_id": result[0],
            "distributor_city": result[1],
            "distributor_name": result[2]
        }
        distributor_list.append(item)
    return distributor_list     

def update_distributor(distributor_id, distributor_city, distributor_name):
    conn = db.connect()
    query = 'UPDATE Distributor SET distributor_city="{}", distributor_name="{}" WHERE distributor_id={}'.format(
        distributor_city, distributor_name, distributor_id)
    conn.execute(query)
    conn.close() 

def delete_distributor(distributor_id):
    conn = db.connect()
    query = 'DELETE FROM Distributor WHERE distributor_id={}'.format(distributor_id)
    conn.execute(query)
    conn.close()

def get_countries_average_rating():
    conn = db.connect()
    query = """SELECT m.country, AVG(temp.avg_rating) as country_average_rating
FROM MASS.Manufacturer m JOIN MASS.Water w USING (manufacturer_id),(
        SELECT water_id, AVG(rating) AS avg_rating
        FROM MASS.Reviews
        GROUP BY water_id
    ) AS temp
WHERE w.water_id = temp.water_id
GROUP BY m.country;"""
    query_results = conn.execute(query).fetchall()
    conn.close()
    rating_list = []
    for result in query_results:
        item = {
            "country": result[0],
            "avg_rating": float(result[1]),
        }
        rating_list.append(item)
    return rating_list

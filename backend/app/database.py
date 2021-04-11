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

<<<<<<< HEAD
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
=======

def execute_query(query) ->  int:
    conn.execute(query)
    query_results = conn.execute("Select LAST_INSERT_ID();")
    query_results = [x for x in query_results]
    conn.close()
    return query_results
>>>>>>> edc51002913969e69db74b2c3e631f7d897f7d19

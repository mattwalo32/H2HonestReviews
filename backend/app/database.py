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


def execute_query(query) ->  int:
    conn.execute(query)
    query_results = conn.execute("Select LAST_INSERT_ID();")
    query_results = [x for x in query_results]
    conn.close()
    return query_results
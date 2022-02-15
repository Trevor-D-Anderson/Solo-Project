from flask_app.config.mysqlconnection import connectToMySQL
from flask_app.models.user import User
from flask import flash

my_db = "freight_calculator_schema"

class Profile:
    def __init__(self, data):
        self.id = data["id"]
        self.profileName = data["profileName"]
        self.length = data["length"]
        self.width = data["width"]
        self.height = data["height"]
        self.weight = data["weight"]
        self.numberOfPcs = data["numberOfPcs"]
        self.dimensionType = data["dimensionType"]
        self.weightType = data["weightType"]
        self.created_at = data["created_at"]
        self.updated_at = data["updated_at"]

    @classmethod
    def create_profile(cls, data):
        query = "insert into freightProfiles (profileName, length, width, height, numberOfPcs, dimensionType, weightType, user_id) values(%(profileName)s, %(length)s, %(width)s, %(height)s, %(numberOfPcs)s, %(dimensionType)s, %(weightType)s, %(user_id)s)"
        return connectToMySQL(my_db).query_db(query, data)

    @classmethod
    def get_profiles(cls, data):
        query = "select * from freightprofiles where users_id = %(id)s"
        results = connectToMySQL(my_db).query_db(query,data)
        profiles = []
        for profile in results:
            profiles.append(Profile(profile))
        return profiles
from peewee import *
import datetime

db = SqliteDatabase("meditation.db")

# Defaults the Meta to the db database specified
class BaseModel(Model):
    class Meta:
        database = db

# Users table
class Users(BaseModel):
    username = CharField(unique = True, null = False)
    email = CharField(unique = True, null = False)
    password = CharField(null = False)
    date_created = DateTimeField(default = datetime.datetime.now)

# User stats table
class Stats(BaseModel):
    user_id = IntegerField(null = False)
    seconds_elapsed = IntegerField(null = False)
    date_submitted = DateTimeField(default = datetime.datetime.now)

def initialize_db():
    db.connect()
    db.create_tables([Users, Stats], safe = true)

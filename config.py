import os
from dotenv import load_dotenv
load_dotenv()
class ApplicationConfig:
    SECRET_KEY = os.environ['SECRET_KEY']
    SQLAlCHEMY_TRACK_MODIFICATIONs=False
    SQLALCHEMY_ECHO=True
    SQLALCHEMY_DATABASE_URI=r"sqlite:///./db.sqlite"
    SECRET_KEY = os.environ["SECRET_KEY"]
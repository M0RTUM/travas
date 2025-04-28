from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker

engine = create_engine('sqlite:///password_db.db')
Base = declarative_base()
Session = sessionmaker(bind=engine)

class User(Base):
    __tablename__ = 'users'
    key = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    uid = Column(String, unique=True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    spent_money = Column(Integer, nullable=False, default=0)
    countries_visited = Column(String, nullable=False, default="0")

class Flight(Base):
    __tablename__ = 'flights'
    key = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    uid = Column(Integer, nullable=False)
    id = Column(String, nullable=False)
    dr_time = Column(String, nullable=False)
    arr_time = Column(String, nullable=False)
    dr_date = Column(String, nullable=False)
    arr_date = Column(String, nullable=False)
    dep_city = Column(String, nullable=False)
    arr_city = Column(String, nullable=False)
    arr_country = Column(String, nullable=False)
    transf = Column(Integer, default=0, nullable=False)

class Hotel(Base):
    __tablename__ = 'hotels'
    key = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    uid = Column(Integer, nullable=False)
    check_in_date = Column(String, nullable=False)
    check_in_time = Column(String, nullable=False)
    dep_date = Column(String, nullable=False)
    dep_time = Column(String, nullable=False)
    address = Column(String, nullable=False)

class Train(Base):
    __tablename__ = 'trains'
    key = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    uid = Column(Integer, nullable=False)
    id = Column(String, nullable=False)
    dr_time = Column(String, nullable=False)
    arr_time = Column(String, nullable=False)
    dr_date = Column(String, nullable=False)
    arr_date = Column(String, nullable=False)
    dep_city = Column(String, nullable=False)
    arr_city = Column(String, nullable=False)
    arr_country = Column(String, nullable=False)
    transf = Column(Integer, default=0)

class Excursion(Base):
    __tablename__ = 'excursions'
    key = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    uid = Column(Integer, nullable=False)
    start_time = Column(String, nullable=False)
    start_date = Column(String, nullable=False)
    end_time = Column(String, nullable=False)  
    end_date = Column(String, nullable=False)  
    address = Column(String, nullable=False)
    price = Column(Integer, default=0, nullable=False)  


Base.metadata.create_all(engine)
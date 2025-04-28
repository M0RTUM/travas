from sqlalchemy import create_engine, Column, Integer, String # type: ignore
from sqlalchemy.ext.declarative import declarative_base # type: ignore
from sqlalchemy.orm import sessionmaker # type: ignore
from models import User

engine = create_engine('sqlite:///password_db.db')
Base = declarative_base()

Base.metadata.create_all(engine)

def update_password(username, new_password):
    Session = sessionmaker(bind=engine)
    session = Session()
    
    user = session.query(User).filter_by(username=username).first()
        
    if user and " " not in new_password and new_password != "":
        user.password = hash(new_password)
        session.commit()
    
    session.close()

from sqlalchemy.orm import sessionmaker # type: ignore
from models import User, engine
from sqlalchemy.orm import sessionmaker # type: ignore
from models import User, engine 
import string
import random
from hashlib import sha256

def id_generator(size=12, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

def register_user(username, password, email):
    Session = sessionmaker(bind=engine)
    session = Session()

    try:
        existing_user = session.query(User).filter_by(username=username).first()
        existing_email = session.query(User).filter_by(email=email).first()

        if existing_user or existing_email:
            print("User or email already exists")
            return {"status": "error", "message": "Пользователь с таким именем или почтой уже существует"}

        uid = id_generator()

        while True:
            existing_uid = session.query(User).filter_by(uid=uid).first()
            if not existing_uid:
                break
            uid = id_generator()


        if username and password and email:
            new_user = User(
                uid=uid,
                username=username,
                password=sha256(password.encode('utf-8')).hexdigest(),
                email=email  
            )
            session.add(new_user)
            session.commit()
            return {"status": "success", "message": "Пользователь успешно зарегистрирован"}
        else:
            print("Invalid input data")
            return {"status": "error", "message": "Неверный ввод данных"}
    except Exception as e:
        session.rollback()
        print(f"Exception occurred: {e}")
        return {"status": "error", "message": str(e)}
    finally:
        session.close()
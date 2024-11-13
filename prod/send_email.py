import time
from datetime import datetime
from sqlalchemy import create_engine # type: ignore
from sqlalchemy.orm import sessionmaker # type: ignore
from sqlalchemy.ext.declarative import declarative_base # type: ignore
import schedule # type: ignore
from visited_countries import get_flights_from_api, get_traims_from_api
from models import Flight, Hotel, Train, Excursion, User
from emailsend import send_email

engine = create_engine('sqlite:////Users/timbudygin/travas/prod/password_db.db')
Base = declarative_base()

Base.metadata.create_all(engine)


def checker():
    sent_notifications = {
        'train': True,
        'flight': True,
        'hotel': True,
        'excursion': True
        }
    while True:
        Session = sessionmaker(bind=engine)
        with Session() as session:
            users = session.query(User).all()
            for user in users:
                print(user)
                try:
                    trains = session.query(Train).filter_by(uid=user.id).all()
                    flights = session.query(Flight).filter_by(uid=user.id).all()
                    hotels = session.query(Hotel).filter_by(uid=user.id).all()
                    excursions = session.query(Excursion).filter_by(uid=user.id).all()
                    now = datetime.now()
                    current_time = now.strftime("%H:%M")
                    time_threshold = 3 * 3600

                    def is_within_time_threshold(start_time):
                        time_str1 = start_time
                        time_str2 = current_time
                        time_format = "%H:%M"
                        time1 = datetime.strptime(time_str1, time_format)
                        time2 = datetime.strptime(time_str2, time_format)
                        time_difference = (time2 - time1).total_seconds()
                        return abs(time_difference) < time_threshold
                    
                    for train in trains:
                        if train.dr_time and is_within_time_threshold(train.dr_time):
                            if sent_notifications['train']:
                                time_str1_2 = train.dr_time
                                time_str2_2 = current_time
                                time_format = "%H:%M"
                                time1 = datetime.strptime(time_str1_2, time_format)
                                time2 = datetime.strptime(time_str2_2, time_format)
                                time_difference = time1 - time2
                                hours, minutes = divmod(time_difference.seconds, 3600)
                                minutes = (time_difference.seconds % 3600) // 60
                                send_email(user.email, "Скоро поезд", f"До вашего поезда осталось {hours}:{minutes}, поезд уезжает в {time_str1_2}")
                                sent_notifications['train'] = False

                    for flight in flights:
                        if flight.dr_time and is_within_time_threshold(flight.dr_time):
                            if sent_notifications['flight']:
                                time_str1_2 = flight.dr_time
                                time_str2_2 = current_time
                                time_format = "%H:%M"
                                time1 = datetime.strptime(time_str1_2, time_format)
                                time2 = datetime.strptime(time_str2_2, time_format)
                                time_difference = time1 - time2
                                hours, minutes = divmod(time_difference.seconds, 3600)
                                minutes = (time_difference.seconds % 3600) // 60
                                send_email(user.email, "Скоро самолет", f"До вашего самолета осталось {hours}:{minutes}, самолет улетает в {time_str1_2}")
                                sent_notifications['flight'] = False

                    for hotel in hotels:
                        if hotel.check_in_date and is_within_time_threshold(hotel.check_in_date):
                            if sent_notifications['hotel']:
                                time_str1_2 = hotel.check_in_date
                                time_str2_2 = current_time
                                time_format = "%H:%M"
                                time1 = datetime.strptime(time_str1_2, time_format)
                                time2 = datetime.strptime(time_str2_2, time_format)
                                time_difference = time1 - time2
                                hours, minutes = divmod(time_difference.seconds, 3600)
                                minutes = (time_difference.seconds % 3600) // 60
                                send_email(user.email, "Скоро заселение в отель", f"До вашего заселения в отель осталось {hours}:{minutes}, заселение в {time_str1_2}")
                                sent_notifications['hotel'] = False

                    for excursion in excursions:
                        if excursion.start_time and is_within_time_threshold(excursion.start_time):
                            if sent_notifications['excursion']:
                                time_str1_2 = excursion.start_time
                                time_str2_2 = current_time
                                time_format = "%H:%M"
                                time1 = datetime.strptime(time_str1_2, time_format)
                                time2 = datetime.strptime(time_str2_2, time_format)
                                time_difference = time1 - time2
                                hours, minutes = divmod(time_difference.seconds, 3600)
                                minutes = (time_difference.seconds % 3600) // 60
                                send_email(user.email, "Скоро экскурсия", f"До вашей экскурсии осталось {hours}:{minutes}, экскурсия начинается в {time_str1_2}")
                                sent_notifications['excursion'] = False

                    def is_within_time_threshold_2(start_time):
                        time_str1 = start_time
                        current_time1 = datetime.now().time()
                        time_format1 = "%H:%M"
                        input_time12 = datetime.strptime(time_str1, time_format1).time()
                        time1 = datetime.strptime(time_str1, time_format).time()
                        return current_time1 > input_time12
                    if train and train.dr_time and is_within_time_threshold_2(train.dr_time):
                        rows_deleted = session.query(Train).filter_by(uid=user.id).delete()

                    if flight and flight.dr_time and is_within_time_threshold_2(flight.dr_time):
                        rows_deleted = session.query(Flight).filter_by(uid=user.id).delete()

                    if hotel and hotel.check_in_date and is_within_time_threshold_2(hotel.check_in_date):
                        rows_deleted = session.query(Hotel).filter_by(uid=user.id).delete()

                    if excursion and excursion.start_time and is_within_time_threshold_2(excursion.start_time):
                        rows_deleted = session.query(Excursion).filter_by(uid=user.id).delete()


                except Exception as e:
                    print(f'Ошибка для пользователя {user.id}: {e}')
                finally:
                    session.close()

checker()

# import time
# from datetime import datetime
# from sqlalchemy import create_engine # type: ignore
# from sqlalchemy.orm import sessionmaker # type: ignore
# from sqlalchemy.ext.declarative import declarative_base # type: ignore
# import schedule # type: ignore
# from visited_countries import get_flights_from_api, get_traims_from_api
# from models import Flight, Hotel, Train, Excursion, User
# from emailsend import send_email

# engine = create_engine('sqlite:////Users/timbudygin/travas/prod/password_db.db')
# Base = declarative_base()

# Base.metadata.create_all(engine)


# def checker():
#     sent_notifications = {
#         'train': True,
#         'flight': True,
#         'hotel': True,
#         'excursion': True
#         }
#     while True:
#         Session = sessionmaker(bind=engine)
#         with Session() as session:
#             users = session.query(User).all()
#             for user in users:
#                 print(user)
#                 try:
#                     trains = session.query(Train).filter_by(uid=user.id).all()
#                     flights = session.query(Flight).filter_by(uid=user.id).all()
#                     hotels = session.query(Hotel).filter_by(uid=user.id).all()
#                     excursions = session.query(Excursion).filter_by(uid=user.id).all()
#                     now = datetime.now()
#                     current_time = now.strftime("%H:%M")
#                     time_threshold = 3 * 3600

#                     def is_within_time_threshold(start_time):
#                         time_str1 = start_time
#                         time_str2 = current_time
#                         time_format = "%H:%M"
#                         time1 = datetime.strptime(time_str1, time_format)
#                         time2 = datetime.strptime(time_str2, time_format)
#                         time_difference = (time2 - time1).total_seconds()
#                         return abs(time_difference) < time_threshold
                    
#                     for train in trains:
#                         if train.dr_time and is_within_time_threshold(train.dr_time):
#                             if sent_notifications['train']:
#                                 time_str1_2 = train.dr_time
#                                 time_str2_2 = current_time
#                                 time_format = "%H:%M"
#                                 time1 = datetime.strptime(time_str1_2, time_format)
#                                 time2 = datetime.strptime(time_str2_2, time_format)
#                                 time_difference = time1 - time2
#                                 hours, minutes = divmod(time_difference.seconds, 3600)
#                                 minutes = (time_difference.seconds % 3600) // 60
#                                 send_email(user.email, "Скоро поезд", f"До вашего поезда осталось {hours}:{minutes}, поезд уезжает в {time_str1_2}")
#                                 sent_notifications['train'] = False

#                     for flight in flights:
#                         if flight.dr_time and is_within_time_threshold(flight.dr_time):
#                             if sent_notifications['flight']:
#                                 time_str1_2 = flight.dr_time
#                                 time_str2_2 = current_time
#                                 time_format = "%H:%M"
#                                 time1 = datetime.strptime(time_str1_2, time_format)
#                                 time2 = datetime.strptime(time_str2_2, time_format)
#                                 time_difference = time1 - time2
#                                 hours, minutes = divmod(time_difference.seconds, 3600)
#                                 minutes = (time_difference.seconds % 3600) // 60
#                                 send_email(user.email, "Скоро самолет", f"До вашего самолета осталось {hours}:{minutes}, самолет улетает в {time_str1_2}")
#                                 sent_notifications['flight'] = False

#                     for hotel in hotels:
#                         if hotel.check_in_date and is_within_time_threshold(hotel.check_in_date):
#                             if sent_notifications['hotel']:
#                                 time_str1_2 = hotel.check_in_date
#                                 time_str2_2 = current_time
#                                 time_format = "%H:%M"
#                                 time1 = datetime.strptime(time_str1_2, time_format)
#                                 time2 = datetime.strptime(time_str2_2, time_format)
#                                 time_difference = time1 - time2
#                                 hours, minutes = divmod(time_difference.seconds, 3600)
#                                 minutes = (time_difference.seconds % 3600) // 60
#                                 send_email(user.email, "Скоро заселение в отель", f"До вашего заселения в отель осталось {hours}:{minutes}, заселение в {time_str1_2}")
#                                 sent_notifications['hotel'] = False

#                     for excursion in excursions:
#                         if excursion.start_time and is_within_time_threshold(excursion.start_time):
#                             if sent_notifications['excursion']:
#                                 time_str1_2 = excursion.start_time
#                                 time_str2_2 = current_time
#                                 time_format = "%H:%M"
#                                 time1 = datetime.strptime(time_str1_2, time_format)
#                                 time2 = datetime.strptime(time_str2_2, time_format)
#                                 time_difference = time1 - time2
#                                 hours, minutes = divmod(time_difference.seconds, 3600)
#                                 minutes = (time_difference.seconds % 3600) // 60
#                                 send_email(user.email, "Скоро экскурсия", f"До вашей экскурсии осталось {hours}:{minutes}, экскурсия начинается в {time_str1_2}")
#                                 sent_notifications['excursion'] = False

#                 except Exception as e:
#                     print(f'Ошибка для пользователя {user.id}: {e}')
#                 finally:
#                     session.close()

# checker()
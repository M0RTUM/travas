import requests

def get_flights_from_api(uid):
    try:
        response = requests.get(f"localhost:port/api/flights/$raceId/flights/{uid}")
        response.raise_for_status()
        data = response.json()

        Type = data.get('Type')
        Id = data.get('Id')
        DepartureCountry = data.get('DepartureCountry')
        ArrivalCountry = data.get('ArrivalCountry')
        DepartureCity = data.get('DepartureCity')
        ArrivalCity = data.get('ArrivalCity')
        DepartureTime = data.get('DepartureTime')
        ArrivalTime = data.get('ArrivalTime')
        DepartureDate = data.get('DepartureDate')
        ArrivalDate = data.get('ArrivalDate')
        IsDelayed = data.get('IsDelayed')
        OldDate = data.get('OldDate')
        OldTime = data.get('OldTime')

        return None
    except requests.exceptions.RequestException as e:
        print(f"Ошибка при обращении к API: {e}")
        return None
    
def get_traims_from_api(uid):
    try:
        response = requests.get(f"localhost:port/api/flights/$raceId/trains/{uid}")
        response.raise_for_status()
        data = response.json()

        Type = data.get('Type')
        Id = data.get('Id')
        DepartureCountry = data.get('DepartureCountry')
        ArrivalCountry = data.get('ArrivalCountry')
        DepartureCity = data.get('DepartureCity')
        ArrivalCity = data.get('ArrivalCity')
        DepartureTime = data.get('DepartureTime')
        ArrivalTime = data.get('ArrivalTime')
        DepartureDate = data.get('DepartureDate')
        ArrivalDate = data.get('ArrivalDate')
        IsDelayed = data.get('IsDelayed')
        OldDate = data.get('OldDate')
        OldTime = data.get('OldTime')

        return Type, Id, DepartureCountry, ArrivalCountry, DepartureCity, ArrivalCity, DepartureTime, ArrivalTime, DepartureDate, ArrivalDate, IsDelayed, OldDate, OldTime
    except requests.exceptions.RequestException as e:
        print(f"Ошибка при обращении к API: {e}")
        return None

def visited_countries(depp_countr, arr_countr):
    kol_vo = 0
    if depp_countr != arr_countr:
        if kol_vo == 0:
            kol_vo += 2
        else:
            kol_vo += 1
            
def visited_city(depp_city, arr_city):
    kol_vo = 0
    if depp_city != arr_city:
        if kol_vo == 0:
            kol_vo += 2
        else:
            kol_vo += 1
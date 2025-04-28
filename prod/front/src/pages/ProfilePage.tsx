import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Train, Hotel, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

interface UserData {
  flights: any[];
  trains: any[];
  hotels: any[];
  excursions: any[];
  countries_visited: string;
}

export default function ProfilePage() {
  const [activeType, setActiveType] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<any>({
    id: '',
    price: '',
    check_in_date: '',
    check_in_time: '',
    dep_date: '',
    dep_time: '',
    address: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    dr_date: '',
    dr_time: '',
    arr_date: '',
    arr_time: '',
    dep_city: '',
    arr_city: '',
    arr_country: '',
    user_id: ''
  });
  const [attractions, setAttractions] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getUserIdFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('uid') || '';
  };

  useEffect(() => {
    const uid = getUserIdFromURL();
    setFormData((prev) => ({
      ...prev,
      user_id: uid,
    }));
    fetchData(uid);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchAttractionshandler = async (city: string, type: string) => {
    setAttractions([]);
    fetchAttractions(city);
    setActiveType(type);
  };

  const fetchAttractions = async (city: string) => {
    setErrorMessage(null);
    try {
      const response = await fetch(`http://localhost:5000/get-attractions?city=${city}`);

      if (!response.ok) {
        if (response.status === 400) {
          setErrorMessage("Вы не указали город прибытия");
          throw new Error('City parameter is required');
        }
        if (response.status === 429) {
          setErrorMessage("Превышен лимит запросов. Повторите попытку позже");
          throw new Error('You have exceeded the number of allowed requests. Please try again later.');
        }
        throw new Error('Failed to fetch attractions');
      }

      const data = await response.json();
      setAttractions(data.attractions);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching attractions:', error.message);

      } else {
        console.error('Unknown error occurred:', error);
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent, type: string) => {
    e.preventDefault();

    let dataToSend;
    if (type === 'flights' || type === 'trains') {
      dataToSend = {
        id: formData.id,
        dr_date: formData.dr_date,
        dr_time: formData.dr_time,
        arr_date: formData.arr_date,
        arr_time: formData.arr_time,
        dep_city: formData.dep_city,
        arr_city: formData.arr_city,
        arr_country: formData.arr_country,
        price: formData.price,
        transf: 0,
        uid: formData.user_id
      };
    } else if (type === 'hotels') {
      dataToSend = {
        check_in_date: formData.check_in_date,
        check_in_time: formData.check_in_time,
        dep_date: formData.dep_date,
        dep_time: formData.dep_time,
        address: formData.address,
        uid: formData.user_id
      };
    } else if (type === 'excursions') {
      dataToSend = {
        start_date: formData.start_date,
        start_time: formData.start_time,
        end_date: formData.end_date,
        end_time: formData.end_time,
        address: formData.address,
        price: formData.price,
        uid: formData.user_id
      };
    }

    try {
      const response = await axios.post(`http://localhost:5000/add_${type}?uid=${formData.user_id}`, dataToSend);
      console.log(`Загрузка данных для ${type}:`, response.data);
      fetchData(formData.user_id);
    } catch (error) {
      console.error(`Ошибка загрузки данных для ${type}:`, error);
    }
  };

  const fetchData = async (uid: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/user-data?uid=${uid}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Ошибка получения данных пользователя:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-green-600 shadow-lg">
        <div className="flex justify-between items-center px-6 py-4">
          <Link to="/" className="text-3xl font-bold text-white">Travas</Link>
          <Link to="/" className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors">
            На главную
          </Link>
        </div>
      </header>

      <section className="py-16 bg-gradient-to-r from-green-50 to-white">
        <div className="container mx-auto px-4">
          <motion.h3
            className="text-4xl font-bold text-gray-800 mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Ваши данные о путешествиях
          </motion.h3>

          <motion.div
            className="mb-12 text-xl text-gray-700 flex justify-center gap-8 flex-wrap bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-semibold">Авиабилеты: <span className="text-green-600">{userData?.flights.length || 0}</span></p>
            <p className="font-semibold">ЖД билеты: <span className="text-green-600">{userData?.trains.length || 0}</span></p>
            <p className="font-semibold">Отели: <span className="text-green-600">{userData?.hotels.length || 0}</span></p>
            <p className="font-semibold">Экскурсии: <span className="text-green-600">{userData?.excursions.length || 0}</span></p>
            <p className="font-semibold">Посещенные страны: <span className="text-green-600">{userData?.countries_visited || '0'}</span></p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3">
              <motion.h3
                className="text-2xl font-semibold text-gray-800 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Ваши данные
              </motion.h3>

              <div className="space-y-4">
                {['flights', 'trains', 'hotels', 'excursions'].map((type) =>
                  userData?.[type]?.map((item: any) => (
                    <motion.div
                      key={item.uid}
                      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start">
                        {type === 'flights' && <Plane className="w-6 h-6 mr-3 text-green-600 flex-shrink-0" />}
                        {type === 'trains' && <Train className="w-6 h-6 mr-3 text-green-600 flex-shrink-0" />}
                        {type === 'hotels' && <Hotel className="w-6 h-6 mr-3 text-green-600 flex-shrink-0" />}
                        {type === 'excursions' && <MapPin className="w-6 h-6 mr-3 text-green-600 flex-shrink-0" />}
                        <div>
                          <p className="text-sm text-gray-600">
                            {type === 'flights' && (
                              <>
                                <h4 className="text-lg font-semibold mb-1">Полет в город {item.arr_city}</h4>
                                Номер рейса: {item.id} <br />
                                Дата отправления: {item.dr_date} <br />
                                Время отправления: {item.dr_time} <br />
                                Дата прибытия: {item.arr_date} <br />
                                Время прибытия: {item.arr_time} <br />
                                Отправление из: {item.dep_city} <br />
                                Прибытие в: {item.arr_city} <br />
                                Страна прибытия: {item.arr_country}

                              </>
                            )}
                            {type === 'trains' && (
                              <>
                                <h4 className="text-lg font-semibold mb-1">Поезд в город {item.arr_city}</h4>
                                Номер поезда: {item.id} <br />
                                Дата отправления: {item.dr_date} <br />
                                Время отправления: {item.dr_time} <br />
                                Дата прибытия: {item.arr_date} <br />
                                Время прибытия: {item.arr_time} <br />
                                Отправление из: {item.dep_city} <br />
                                Прибытие в: {item.arr_city} <br />
                                Страна прибытия: {item.arr_country}
                              </>
                            )}
                            {type === 'hotels' && (
                              <>
                                <h4 className="text-lg font-semibold mb-1">Отель по адресу: {item.address}</h4>
                                Дата заселения: {item.check_in_date} <br />
                                Время заселения: {item.check_in_time} <br />
                                Дата выезда: {item.dep_date} <br />
                                Время выезда: {item.dep_time} <br />
                                Адрес: {item.address}
                              </>
                            )}
                            {type === 'excursions' && (
                              <>
                                <h4 className="text-lg font-semibold mb-1">Экскурсия по адресу: {item.address}</h4>
                                Дата начала: {item.start_date} <br />
                                Время начала: {item.start_time} <br />
                                Дата конца: {item.end_date} <br />
                                Время конца: {item.end_time} <br />
                                Адрес: {item.address}
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            <div className="w-full md:w-1/3">
              <motion.h3
                className="text-2xl font-semibold text-gray-800 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Загрузка данных
              </motion.h3>
              <div className="space-y-4">
                {['flights', 'trains', 'hotels', 'excursions'].map((type, index) => (
                  <motion.div
                    key={type}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-center mb-2">
                      {type === 'flights' && <Plane className="w-5 h-5 mr-2 text-green-600" />}
                      {type === 'trains' && <Train className="w-5 h-5 mr-2 text-green-600" />}
                      {type === 'hotels' && <Hotel className="w-5 h-5 mr-2 text-green-600" />}
                      {type === 'excursions' && <MapPin className="w-5 h-5 mr-2 text-green-600" />}
                      <h4 className="text-lg font-semibold">{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
                    </div>
                    <form onSubmit={(e) => handleFormSubmit(e, type)}>
                      {type === 'flights' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Номер рейса</label>
                          <input
                            type="text"
                            name="id"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.id}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Дата отправления</label>
                          <input
                            type="date"
                            name="dr_date"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.dr_date}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Время отправления</label>
                          <input
                            type="time"
                            name="dr_time"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.dr_time}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Дата прибытия</label>
                          <input
                            type="date"
                            name="arr_date"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.arr_date}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Время прибытия</label>
                          <input
                            type="time"
                            name="arr_time"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.arr_time}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Город отправления</label>
                          <input
                            type="text"
                            name="dep_city"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.dep_city}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Город прибытия</label>
                          <input
                            type="text"
                            name="arr_city"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.arr_city}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Страна прибытия</label>
                          <input
                            type="text"
                            name="arr_country"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.arr_country}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Цена (рубли)</label>
                          <input
                            type="number"
                            name="price"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.price}
                            onChange={handleInputChange}
                          />
                          <button
                            type="button"
                            onClick={() => fetchAttractionshandler(formData.arr_city, type)}
                            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                          >
                            Показать достопримечательности
                          </button>
                          {errorMessage && (
                            <div className="mt-4 text-red-500 text-sm text-center">
                              {errorMessage}
                            </div>
                          )}
                          {attractions.length > 0 && activeType === type && (
                            <div className="mt-4 p-4 bg-white rounded shadow-md">
                              <h4 className="text-lg font-semibold">Достопримечательности в {formData.arr_city}:</h4>
                              <ul className="list-disc list-inside">
                                {attractions.map((attraction, index) => (
                                  <li key={index}>{attraction}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                      {type === 'trains' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Номер поезда</label>
                          <input
                            type="text"
                            name="id"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.id}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Дата отправления</label>
                          <input
                            type="date"
                            name="dr_date"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.dr_date}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Время отправления</label>
                          <input
                            type="time"
                            name="dr_time"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.dr_time}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Дата прибытия</label>
                          <input
                            type="date"
                            name="arr_date"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.arr_date}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Время прибытия</label>
                          <input
                            type="time"
                            name="arr_time"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.arr_time}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Город отправления</label>
                          <input
                            type="text"
                            name="dep_city"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.dep_city}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Город прибытия</label>
                          <input
                            type="text"
                            name="arr_city"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.arr_city}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Страна прибытия</label>
                          <input
                            type="text"
                            name="arr_country"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.arr_country}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Цена (рубли)</label>
                          <input
                            type="number"
                            name="price"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.price}
                            onChange={handleInputChange}
                          />
                          <button
                            type="button"
                            onClick={() => fetchAttractionshandler(formData.arr_city, type)}
                            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                          >
                            Показать достопримечательности
                          </button>
                          {errorMessage && (
                            <div className="mt-4 text-red-500 text-sm text-center">
                              {errorMessage}
                            </div>
                          )}
                          {attractions.length > 0 && activeType === type && (
                            <div className="mt-4 p-4 bg-white rounded shadow-md">
                              <h4 className="text-lg font-semibold">Достопримечательности в {formData.arr_city}:</h4>
                              <ul className="list-disc list-inside">
                                {attractions.map((attraction, index) => (
                                  <li key={index}>{attraction}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                      {type === 'hotels' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Дата заселения</label>
                          <input
                            type="date"
                            name="check_in_date"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.check_in_date}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Время заселения</label>
                          <input
                            type="time"
                            name="check_in_time"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.check_in_time}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Дата выезда</label>
                          <input
                            type="date"
                            name="dep_date"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.dep_date}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Время выезда</label>
                          <input
                            type="time"
                            name="dep_time"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.dep_time}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Адрес</label>
                          <input
                            type="text"
                            name="address"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Цена (рубли)</label>
                          <input
                            type="number"
                            name="price"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.price}
                            onChange={handleInputChange}
                          />
                        </div>
                      )}
                      {type === 'excursions' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Дата начала</label>
                          <input
                            type="date"
                            name="start_date"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.start_date}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Время начала</label>
                          <input
                            type="time"
                            name="start_time"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.start_time}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Дата окончания</label>
                          <input
                            type="date"
                            name="end_date"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.end_date}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Время окончания</label>
                          <input
                            type="time"
                            name="end_time"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.end_time}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Адрес</label>
                          <input
                            type="text"
                            name="address"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="block text-sm font-medium text-gray-700">Цена (рубли)</label>
                          <input
                            type="number"
                            name="price"
                            className="mt-1 block w-full p-2 border rounded-md text-sm"
                            value={formData.price}
                            onChange={handleInputChange}
                          />
                        </div>
                      )}
                      <button
                        type="submit"
                        className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors text-sm"
                      >
                        Загрузить
                      </button>
                    </form>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

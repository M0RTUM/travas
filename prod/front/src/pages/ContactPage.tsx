import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import {teamContacts} from '../private.js'; // путь к файлу с данными


export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="bg-white shadow-sm">
       <div className="flex justify-between items-center px-6 py-4">
          <Link to="/" className="text-3xl font-bold text-green-600">Travas</Link>
          <Link to="/" className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors">
            На главную
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <motion.h1 
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Контакты
        </motion.h1>

        <motion.p 
          className="text-xl text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Свяжитесь с нами через Telegram для быстрого ответа на ваши вопросы.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamContacts.map((contact, index) => (
            <motion.div 
              key={contact.name}
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h2 className="text-xl font-semibold mb-2">{contact.name}</h2>
              <a 
                href={`https://t.me/${contact.telegram.substring(1)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-green-600 hover:text-green-700 transition-colors"
              >
                <MessageCircle className="mr-2" />
                {contact.telegram}
              </a>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
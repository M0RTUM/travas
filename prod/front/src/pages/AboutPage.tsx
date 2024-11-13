import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {teamMembers} from '../private.js'; 

// export const teamMembers = [
//   {
//     name: 'NAME',
//     description: 'DESCRIPTION',
//     image: '../PATH',
//   }
//   ...
// ];

export default function AboutPage() {

  const firstRowMembers = teamMembers.slice(0, 3); 
  const secondRowMembers = teamMembers.slice(3, 5); 

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
          О нас
        </motion.h1>

        <motion.p 
          className="text-xl text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Мы - команда энтузиастов. У нас маленький опыт в реальной разработке, но есть огромная мотивация работать и учиться чему-то новому
        </motion.p>

        {/* Первый ряд (3 карточки) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {firstRowMembers.map((member, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-48 h-48 rounded-full mb-4 object-cover" 
              />
              <h2 className="text-xl font-semibold">{member.name}</h2>
              <p className="text-gray-600">{member.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Второй ряд (2 карточки) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {secondRowMembers.map((member, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-48 h-48 rounded-full mb-4 object-cover" 
              />
              <h2 className="text-xl font-semibold">{member.name}</h2>
              <p className="text-gray-600">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

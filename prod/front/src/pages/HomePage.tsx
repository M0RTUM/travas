import React from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Plane, Hotel, FileText, ChevronRight } from 'lucide-react'

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-green-600">Travas</span>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/about_us" className="hover:text-green-600">О нас</Link></li>
              <li><Link to="/contact" className="hover:text-green-600">Контакты</Link></li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
              <Link to="/login" className="text-green-600 hover:text-green-700">Войти</Link>
              <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                Регистрация
              </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ opacity, scale }}
          >
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
              alt="Travel background"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <div className="relative z-20 text-center text-white px-4">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Путешествия с Travas
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              Храните все ваши путешествия в одном месте. Билеты, отели, документы — всё под рукой.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <Link to="/register" className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors">
                Создать аккаунт
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-b from-green-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Ваши путешествия — под контролем</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <FeatureCard
                icon={<Plane className="w-12 h-12 text-green-600" />}
                title="Авиабилеты"
                description="Храните все ваши авиабилеты в одном месте. Быстрый доступ и уведомления о рейсах."
              />
              <FeatureCard
                icon={<Hotel className="w-12 h-12 text-green-600" />}
                title="Брони в отелях"
                description="Управляйте бронированиями отелей. Никогда не теряйте информацию о своем проживании."
              />
              <FeatureCard
                icon={<FileText className="w-12 h-12 text-green-600" />}
                title="Документы"
                description="Безопасно храните все необходимые для путешествий документы. Доступ в любое время, где бы вы ни находились."
              />
            </div>
          </div>
        </section>

        <section className="py-24 bg-green-600 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-12 md:mb-0">
                <h2 className="text-4xl font-bold mb-6">Путешествуйте умнее с Travas</h2>
                <p className="text-xl mb-8">Наше приложение поможет вам организовать все аспекты вашего путешествия, от планирования до возвращения домой.</p>
                <Link to="/info" className="bg-white text-green-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
                  Узнать больше <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              <div>
                <h3 className="text-lg font-semibold mb-4">О нас</h3>
                <ul className="space-y-2">
                  <li><Link to="/about_us" className="hover:text-green-400">Наша комманда</Link></li>
                  <li><Link to="/info" className="hover:text-green-400">Больше о проекте</Link></li>

                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Поддержка</h3>
                <ul className="space-y-2">
                  <li><Link to="/contact" className="hover:text-green-400">Связаться с нами</Link></li>
                  <li><Link to="/faq" className="hover:text-green-400">Часто задаваемые вопросы</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; 2024 Travas. Все щиткоды защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

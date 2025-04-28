import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function InfoPage() {
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
          className="text-4xl font-bold text-center mb-12 text-green-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Больше о проекте
        </motion.h1>

        <motion.div
          className="prose lg:prose-xl mx-auto space-y-6 text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <section>
            <p>
              Travas — это ваш надежный помощник для организации путешествий. Мы стремимся сделать ваш опыт
              путешествий максимально комфортным и удобным. С помощью Travas вы можете хранить
              все ваши документы и билеты в одном, безопасном месте.
              Забудьте о десятке разных приложений - Travas универсальное решение
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-600">Почему мы?</h2>
            <p>
              Мы предоставляем единую, надежную систему хранения с простым и понятным интерфейсом.
              С Travas вся нужная информация о ваших путешествиях находится под рукой в удобном формате.
              Что есть в Travas:
            </p>
            <ul className="list-disc pl-5">
              <li>Возможность сохранить любой важный документ в пару кликов.</li>
              <li>Уведомления при любых измненениях: отмена/перенос рейса и т.д.</li>
              <li>Система сбора статистики по вашим путешествиям.</li>
              <li>И много чего другого, создайте аккаунт и попробуйте всё сами!</li>

            </ul>
          </section>

        
          <section>
            <h2 className="text-2xl font-semibold text-green-600">Связаться с нами</h2>
            <p>
              Если у вас возникли вопросы, не стесняйтесь обращаться в нашу службу поддержки. Мы всегда готовы помочь вам!
            </p>
            <Link
              to="/contact"
              className="inline-block mt-4 text-green-600 border border-green-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 hover:text-white transition-colors"
            >
              Связаться с нами
            </Link>
          </section>
        </motion.div>
      </main>
    </div>
  );
}

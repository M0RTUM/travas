import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import PeterGriffin from './pages/PeterGriffin.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import InfoPage from './pages/InfoPage.tsx';
import FAQPage from './pages/FAQPage.tsx';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/peter" element={<PeterGriffin />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about_us" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/info" element={<InfoPage />} />
            <Route path="/faq" element={<FAQPage />} />

          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

import { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/1-Header/Header';
import Footer from './components/6-Footer/Footer';


// Lazy-loaded pages
const Events = lazy(() => import('./components/3-Courses/Events'));
const Login = lazy(() => import('./components/auth/Login/Login'));
const Register = lazy(() => import('./components/auth/Register/Register'));
const Booking = lazy(() => import( './components/3-Courses/Booking'));
const AdminDashboard = lazy(() => import( './components/Admin/AdminDashboard'));
const CreateEvent = lazy(() => import( './components/Admin/CreateEvent'));
const EditEvent = lazy(() => import( './components/Admin/EditEvent'));
// import Courses from './components/3-Courses/Courses';

function App() {
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBtn(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

const noHeaderPaths = ['/login', '/register', '/admin', '/admin/create'];

// دالة لفحص إذا الـ path الحالي يبدأ بأحد المسارات الغير محتاجة Header
const shouldHideHeader = noHeaderPaths.some((path) => location.pathname === path || location.pathname.startsWith(path + '/'));

  return (
    <div className='app-container'>
     {!shouldHideHeader && <Header />}
<div className="container">
      <Suspense fallback={<div className="loader">Loading...</div>}>
      <div className="main-container">
       <Routes>
          {/* <Route path="/" element={<Home />} /> */}
    <Route path="/" element={<Events />} />
    {/* <Route path="/:id" element={<EventDetails />} /> */}
    <Route path="/my-bookings" element={<Booking />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create" element={<CreateEvent />} />
        <Route path="/admin/edit/:id" element={<EditEvent />} />
        </Routes>
        </div>
      </Suspense>
</div>
      <Footer />

      {showScrollBtn && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            padding: '10px',
            cursor: 'pointer',
            zIndex: 999
          }}
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default App;

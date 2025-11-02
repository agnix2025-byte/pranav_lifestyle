// src/App.tsx
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Import Public Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Client Portal Components
import DashboardNav from './components/DashboardNav';

// Import Admin Portal Components
import AdminNav from './components/AdminNav';

// Import Pages
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboard from './pages/AdminDashboard';
import AddClientPage from './pages/AddClientPage';

// --- IMPORT THE NEW EDIT CLIENT PAGE ---
import EditClientPage from './pages/EditClientPage';


// --- Animation Definitions ---
const pageAnimation = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
  transition: { duration: 0.25, ease: 'easeInOut' }
};

const AnimatedPage = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={pageAnimation}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={pageAnimation.transition}
  >
    {children}
  </motion.div>
);

// --- Layouts ---
const PublicLayout = () => {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <div key={location.pathname}>
            <AnimatedPage>
              <Outlet />
            </AnimatedPage>
          </div>
        </AnimatePresence>
      </main>
      <section id="contact"><Footer /></section>
    </>
  );
}

const ClientLayout = () => {
  const location = useLocation();
  return (
    <>
      <DashboardNav />
      <main>
        <AnimatePresence mode="wait">
          <div key={location.pathname}>
            <AnimatedPage>
              <Outlet />
            </AnimatedPage>
          </div>
        </AnimatePresence>
      </main>
    </>
  );
}

const AdminLayout = () => {
  const location = useLocation();
  return (
    <>
      <AdminNav />
      <main>
        <AnimatePresence mode="wait">
          <div key={location.pathname}>
            <AnimatedPage>
              <Outlet />
            </AnimatedPage>
          </div>
        </AnimatePresence>
      </main>
    </>
  );
}

// --- Define all app routes ---
function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- Public Website Routes --- */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>

        {/* --- Client Portal Routes (Protected) --- */}
        <Route path="/dashboard" element={<ClientLayout />}>
          <Route index element={<DashboardPage />} />
        </Route>

        {/* --- Admin Portal Routes (Protected) --- */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="add-client" element={<AddClientPage />} />
          
          {/* --- THIS IS THE NEW DYNAMIC ROUTE --- */}
          {/* :clientId is a URL parameter that EditClientPage will read */}
          <Route path="edit-client/:clientId" element={<EditClientPage />} />
          
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;


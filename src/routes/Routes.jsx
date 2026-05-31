import { createBrowserRouter } from 'react-router';

// Layouts
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Public Pages
import Home from '../pages/Home/Home';
import Services from '../pages/Services/Services';
import ServiceDetails from '../pages/Services/ServiceDetails';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import CoverageMap from '../pages/CoverageMap/CoverageMap';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

// Protected Pages
import Booking from '../pages/Booking/Booking';

// User Dashboard
import UserProfile from '../pages/Dashboard/UserProfile';
import MyBookings from '../pages/Dashboard/MyBookings';
import PaymentHistory from '../pages/Dashboard/PaymentHistory';

// Admin Dashboard
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import ManageServices from '../pages/Dashboard/ManageServices';
import ManageBookings from '../pages/Dashboard/ManageBookings';
import ManageDecorators from '../pages/Dashboard/ManageDecorators';
import Analytics from '../pages/Dashboard/Analytics';

// Decorator Dashboard
import DecoratorDashboard from '../pages/Dashboard/DecoratorDashboard';
import AssignedProjects from '../pages/Dashboard/AssignedProjects';
import TodaysSchedule from '../pages/Dashboard/TodaysSchedule';
import Earnings from '../pages/Dashboard/Earnings';

// Route Guards
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import DecoratorRoute from './DecoratorRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'services/:id', element: <ServiceDetails /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'coverage-map', element: <CoverageMap /> },
      {
        path: 'booking/:serviceId',
        element: (
          <PrivateRoute>
            <Booking />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      // User routes
      { path: 'profile', element: <UserProfile /> },
      { path: 'my-bookings', element: <MyBookings /> },
      { path: 'payment-history', element: <PaymentHistory /> },

      // Admin routes
      {
        path: 'admin',
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: 'manage-services',
        element: (
          <AdminRoute>
            <ManageServices />
          </AdminRoute>
        ),
      },
      {
        path: 'manage-bookings',
        element: (
          <AdminRoute>
            <ManageBookings />
          </AdminRoute>
        ),
      },
      {
        path: 'manage-decorators',
        element: (
          <AdminRoute>
            <ManageDecorators />
          </AdminRoute>
        ),
      },
      {
        path: 'analytics',
        element: (
          <AdminRoute>
            <Analytics />
          </AdminRoute>
        ),
      },

      // Decorator routes
      {
        path: 'decorator',
        element: (
          <DecoratorRoute>
            <DecoratorDashboard />
          </DecoratorRoute>
        ),
      },
      {
        path: 'assigned-projects',
        element: (
          <DecoratorRoute>
            <AssignedProjects />
          </DecoratorRoute>
        ),
      },
      {
        path: 'todays-schedule',
        element: (
          <DecoratorRoute>
            <TodaysSchedule />
          </DecoratorRoute>
        ),
      },
      {
        path: 'earnings',
        element: (
          <DecoratorRoute>
            <Earnings />
          </DecoratorRoute>
        ),
      },
    ],
  },
]);

export default router;

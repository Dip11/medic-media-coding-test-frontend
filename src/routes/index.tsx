import { Navigate, createBrowserRouter } from 'react-router-dom';
import DefaultLayout from 'layouts/default';
import { Login } from 'pages/login';
import ErrorPage from 'pages/error-page';
import { Dashboard } from 'pages/dashboard';
import { WebRoutes } from './WebRoutes';
import AuthGuard from './guards/authGuard';
import { Register } from 'pages/register';

const routes = [
  {
    path: WebRoutes.home.path,
    element: <Navigate to={WebRoutes.dashboard.path} replace />,
  },
  {
    path: WebRoutes.admin.path,
    element: <AuthGuard component={<DefaultLayout />} />,
    children: [
      {
        index: true,
        element: <Navigate to={WebRoutes.dashboard.path} replace />,
      },
      {
        path: WebRoutes.dashboard.path,
        element: <Dashboard />,
      },     
    ],
  },
  {
    path: WebRoutes.login.path,
    element: <Login />,
  },
  {
    path: WebRoutes.register.path,
    element: <Register />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;

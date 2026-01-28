import {createBrowserRouter} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import Users from './views/Users.jsx';
import SignIn from './views/SignIn.jsx';
import LogIn from './views/LogIn.jsx';
import NotFound from './views/NotFound.jsx';
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import Dashboard from './views/Dashboard.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
        {
          path: "/",
          element: <Navigate to="/users" />,
        },
        {
            path: "/dashboard",
            element: <Dashboard />,
        },
        {
            path: "/users",
            element: <Users />,
        },
    ]
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
        {
            path: "/signin",
            element: <SignIn />,
        },
        {
            path: "/login",
            element: <LogIn />,
        },
    ]
  },
  {
    path: "*",
    element: <NotFound />,
  },
])

export default router;
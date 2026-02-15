import {createBrowserRouter} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import Users from './views/Users.jsx';
import SignUp from './views/SignUp.jsx';
import LogIn from './views/LogIn.jsx';
import NotFound from './views/NotFound.jsx';
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import ProgramDashboard from './views/ProgramDashboard.jsx';
import ProjectDashboard from './views/ProjectDashboard.jsx';
import UserForm from './views/UserForm.jsx';
import StudiesDashboard from './views/StudiesDashboard.jsx';
import PublicationDashboard from './views/PublicationDashboard.jsx';
import PresentationDashboard from './views/PresentationDashboard.jsx';
import IPRightDashboard from './views/IPRightsDashboard.jsx';
import AwardDashboard from './views/AwardDashboard.jsx';
import LinkageDashboard from './views/LinkageDashboard.jsx';

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
          path: "/rdsprogram",
          element: <ProgramDashboard />,
        },
        {
          path: "/rdsproject",
          element: <ProjectDashboard />,
        },
        {
          path: "/rdsstudies",
          element: <StudiesDashboard />,
        },
        {
          path: "/rdspublication",
          element: <PublicationDashboard />,
        },
        {
          path: "/rdspresentation",
          element: <PresentationDashboard />,
        },
        {
          path: "/rdsiprights",
          element: <IPRightDashboard />,
        },
        {
          path: "/rdsaward",
          element: <AwardDashboard />,
        },
        {
          path: "/rdslinkage",
          element: <LinkageDashboard />,
        },
        {
            path: "/users",
            element: <Users />,
        },
        {
            path: "/users/new",
            element: <UserForm key="userCreate"/>,
        },
        {
            path: "/users/:id",
            element: <UserForm key="userUpdate"/>,
        },
    ]
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
        {
            path: "/signup",
            element: <SignUp />,
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
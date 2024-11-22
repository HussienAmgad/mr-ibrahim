import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Assistant from './Components/Assistant/Assistant';
import Addstudent from './Components/Assistant/Addstudent';
import Day from './Components/Assistant/Day';
import Prep from './Components/Assistant/Prep';
import Oneday from './Components/Assistant/Oneday';
import Edit from './Components/Assistant/Edit';
import ProdectRout from './Components/Context/ProdectRout';
import ProdectRout2 from './Components/Context/ProdectRout2';
import Choose from './Components/Student/Choose';
import LoginStudent from './Components/Student/LoginStudent';
import Student from './Components/Student/Student';
import LoginAssistant from './Components/Assistant/LoginAssistant';
import LoginMr from './Components/Admin/LoginMr';

function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element:
        <ProdectRout2>
          <Choose />
        </ProdectRout2>
    },
    {
      path: "/Loginstudent",
      element:
        <ProdectRout2>
          <LoginStudent />
        </ProdectRout2>
    },
    {
      path: "/Loginassistant",
      element:
        <ProdectRout2>
          <LoginAssistant />
        </ProdectRout2>
    },
    {
      path: "/LoginMr",
      element:
        <ProdectRout2>
          <LoginMr />
        </ProdectRout2>
    },
    {
      path: "/assistant",
      element: (
        <ProdectRout>
          <Assistant />
        </ProdectRout>
      ),
    },
    {
      path: "/addstudent",
      element: (
        <ProdectRout>
          <Addstudent />
        </ProdectRout>
      ),
    },
    {
      path: "/student",
      element: (
        <ProdectRout>
          <Student />
        </ProdectRout>
      ),
    },
    {
      path: "/day",
      element: (
        <ProdectRout>
          <Day />
        </ProdectRout>
      ),
    },
    {
      path: "/edit",
      element: (
        <ProdectRout>
          <Edit />
        </ProdectRout>
      ),
    },
    {
      path: "/oneday",
      element: (
        <ProdectRout>
          <Oneday />
        </ProdectRout>
      ),
    },
    {
      path: "/prep",
      element: (
        <ProdectRout>
          <Prep />
        </ProdectRout>
      ),
    },
  ]);

  return <RouterProvider router={routers} />;
}

export default App;

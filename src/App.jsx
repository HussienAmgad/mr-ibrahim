import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Assistant from './Components/Assistant/Assistant'
import Addstudent from './Components/Assistant/Addstudent';
import Day from './Components/Assistant/Day';
import Prep from './Components/Assistant/Prep';
import Oneday from './Components/Assistant/Oneday';

function App() {
  const routers = createBrowserRouter([
    {
      path: "", 
      element: <Assistant />,
    },
    {
      path: "addstudent", 
      element: <Addstudent />,
    },
    {
      path: "day", 
      element: <Day />,
    },
    {
      path: "oneday", 
      element: <Oneday />,
    },
    {
      path: "prep", 
      element: <Prep />,
    }
  ]);
  return (
    <RouterProvider router={routers} />
  );
}

export default App;

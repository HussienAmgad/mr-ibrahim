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
import Cert from './Components/Admin/Cert';
import { Helmet } from 'react-helmet';

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
      path: "/editstudent",
      element: (
        <ProdectRout>
          <Edit />
        </ProdectRout>
      ),
    },
    {
      path: "/cert",
      element: (
        <Cert />
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

  return (
    <>
      <div>
        <Helmet>
          <title>موقع مستر إبراهيم زيدان</title> {/* العنوان الذي يظهر في التبويب */}
          <meta name="description" content="موقع مستر إبراهيم زيدان يقدم محتوى مميز في مختلف المجالات." /> {/* الوصف الذي يظهر في محركات البحث */}
          <meta name="keywords" content="Mr ibrahem, Mr ibrahim, مستر ابراهيم, مستر ابراهيم زيدان, ابراهيم زيدان, موقع مستر ابراهيم زيدان, موقع ابراهيم زيدان" /> {/* الكلمات المفتاحية */}
          <meta name="author" content="مستر إبراهيم زيدان" /> {/* اسم الكاتب أو صاحب الموقع */}
          <meta property="og:title" content="موقع مستر إبراهيم زيدان" /> {/* عنوان الموقع عند المشاركة على وسائل التواصل الاجتماعي */}
          <meta property="og:description" content="موقع مستر إبراهيم زيدان يقدم محتوى مميز في مختلف المجالات." /> {/* وصف الموقع عند المشاركة على وسائل التواصل الاجتماعي */}
          <meta property="og:image" content="https://mr-ibrahim.vercel.app/icon512_maskable.png" /> {/* صورة مميزة للموقع عند المشاركة */}
        </Helmet>
        <h1>مرحبًا بك في موقع مستر إبراهيم زيدان!</h1>
      </div>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;

import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'; 
import axios from 'axios'; 

export default function LoginStudent() {
  const navigate = useNavigate(); // تعريف useNavigate

  async function Login(information) {
    try {
      const { data } = await axios.post('https://mr-ibrahim-server.vercel.app/loginstudent', information);
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('Data', JSON.stringify(data));
      setTimeout(() => {
        navigate("/student"); // الانتقال إلى الصفحة الرئيسية بعد تسجيل الدخول بنجاح
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed!";
      console.error("Error registering:", error.response ? error.response.data : error.message);
    }
  }

  let myForm = useFormik({
    initialValues: {
        phoneparent: "",
        phonestudent: "",
    },
    onSubmit: Login,
  });

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                الطالب
              </h1>
              <form onSubmit={myForm.handleSubmit} className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="phoneparent" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">رقم هاتف ولي الأمر</label>
                  <input type="tel" name="phoneparent" id="phoneparent" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="01234567890" required onChange={myForm.handleChange} value={myForm.values.phoneparent} />
                </div>
                <div>
                  <label htmlFor="phonestudent" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-right">رقم هاتف الطالب</label>
                  <input type="tel" name="phonestudent" id="phonestudent" placeholder="01234567890" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={myForm.handleChange} value={myForm.values.phonestudent} />
                </div>
                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-12">
                  تسجيل دخول
                </button>
              </form>
              <button 
                onClick={() => navigate(-1)} // العودة إلى الصفحة السابقة
                className="mt-4 w-full text-gray-800 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 h-12"
              >
                الرجوع الي الخلف
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

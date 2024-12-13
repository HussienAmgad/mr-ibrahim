import {  useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'; // Add this line
import axios from 'axios'; // If axios is not already imported

export default function LoginAssistant() {
  const navigate = useNavigate(); // تعريف useNavigate

  async function Login(information) {
    try {
      const { data } = await axios.post('https://mr-ibrahim-server.vercel.app/Loginassistant', information);
      localStorage.setItem('userToken', data.token);
      setTimeout(() => {
        window.location.reload(); // يقوم بتحديث الصفحة عند الضغط على الزر
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed!";
      console.error("Error registering:", error.response ? error.response.data : error.message);
    }
  }

  let myForm = useFormik({
    initialValues: {
        username: "",
        password: "",
    },
    onSubmit: Login,
  });

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                تسجيل الدخول الي الحساب
              </h1>
              <form onSubmit={myForm.handleSubmit} className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                  <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Moahamed" required onChange={myForm.handleChange} value={myForm.values.username} />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="text" name="password" id="password" placeholder="01234567890" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={myForm.handleChange} value={myForm.values.password} />
                </div>
                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-12">
                  دخول
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

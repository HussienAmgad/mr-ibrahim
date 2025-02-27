import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'; // Add this line
import axios from 'axios'; // If axios is not already imported
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginMr() {
  const navigate = useNavigate(); // تعريف useNavigate
  const [loading, setLoading] = useState(false);

  async function Login(information) {
    setLoading(true);
    try {
      const { data } = await axios.post('https://mr-ibrahim-server.vercel.app/loginmr', information);
      localStorage.setItem('userToken', data.token);
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        window.location.reload(); // يقوم بتحديث الصفحة عند الضغط على الزر
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed!";
      toast.error(errorMessage);
      console.error("Error registering:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
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
      <ToastContainer />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form onSubmit={myForm.handleSubmit} className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                  <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Moahamed" required onChange={myForm.handleChange} value={myForm.values.username} />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="text" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={myForm.handleChange} value={myForm.values.password} />
                </div>
                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-12" disabled={loading}>
                  {loading ? "Loading..." : "Login"}
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
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import check from '../../assets/check.png'
import fail from '../../assets/failed.png'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Oneday() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const data = location.state?.data; // Receiving data from the previous component

  useEffect(() => {
    if (data) {
      setStudents(data.students);
    }
  }, [data]);

  return (
    <>
      <ToastContainer />

      <div className="relative overflow-x-auto shadow-md">
        {error && <div className="text-red-500 p-4">{error}</div>}
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-gray-900 bg-white dark:text-white dark:bg-gray-800 border-b">
            <div className="flex justify-between items-center">
              <NavLink to="/addstudent" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                إضافة طالب
              </NavLink>
              <NavLink
                to="/day"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                بداية يوم
              </NavLink>
              <NavLink
                to="/prep"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                جميع السنوات
              </NavLink>
              <span>قائمة الطلاب</span>
            </div>
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">id</th>
              <th scope="col" className="px-6 py-3">الإسم</th>
              <th scope="col" className="px-6 py-3">الصف</th>
              <th scope="col" className="px-6 py-3">السنتر</th>
              <th scope="col" className="px-6 py-3">الحضور</th>
              <th scope="col" className="px-6 py-3">الواجب</th>
              <th scope="col" className="px-6 py-3">الإمتحان</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200">
                  <td className="px-6 py-4">{student.id}</td>
                  <td className="px-6 py-4">{student.name}</td>
                  <td className="px-6 py-4">{student.grade}</td>
                  <td className="px-6 py-4">{student.center}</td>
                  <td className="px-6 py-4 ">
                    <div className='flex'>
                      <img src={student.Attendance === true ? check : fail} className='w-5' alt="" />
                      {student.Attendance === null ? 'false' : student.Attendance === true ? 'true' : 'false'}
                    </div>
                  </td>
                  <td className="px-6 py-4 flex">
                    <img src={student.Homework === true ? check : fail} className='w-5' alt="" />
                    {student.Homework === null ? 'false' : student.Homework === true ? 'true' : 'false'}
                  </td>
                  <td className="px-6 py-4">{student.Exam == null ? 'false' : student.Exam}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">لا يوجد طلاب</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

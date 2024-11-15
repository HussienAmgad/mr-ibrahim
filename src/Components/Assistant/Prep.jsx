import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Prep() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [isGradeOpen, setIsGradeOpen] = useState(false);
  const [isCenterOpen, setIsCenterOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [Inf, setInf] = useState(null);
  const navigate = useNavigate();


  const fetchData = async () => {
    try {
      const response1 = await fetch('https://mr-ibrahim-server.vercel.app/showprep1');
      const data1 = await response1.json();
      const response2 = await fetch('https://mr-ibrahim-server.vercel.app/showprep2');
      const data2 = await response2.json();
      const response3 = await fetch('https://mr-ibrahim-server.vercel.app/showprep3');
      const data3 = await response3.json();
      setStudents([...data1, ...data2, ...data3]);
      console.log([...data1, ...data2, ...data3]);
      console.log(students);
      
    } catch (error) {
      setError("هناك خطأ في جلب البيانات");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function open(id, grade, navigate) {
    let data; // تعريف متغير لتخزين البيانات
  
    try {
      // جلب البيانات بناءً على الصف
      if (grade === "الصف الأول الثانوي") {
        const response1 = await fetch(`https://mr-ibrahim-server.vercel.app/showprep1/${id}`);
        data = await response1.json();
      } else if (grade === "الصف الثاني الثانوي") {
        const response2 = await fetch(`https://mr-ibrahim-server.vercel.app/showprep2/${id}`);
        data = await response2.json();
      } else if (grade === "الصف الثالث الثانوي") {
        const response3 = await fetch(`https://mr-ibrahim-server.vercel.app/showprep3/${id}`);
        data = await response3.json();
      }
  
      // الانتقال إلى صفحة oneday وتمرير البيانات
      if (data) {
        navigate("/oneday", { state: { data } }); // الانتقال مع تمرير البيانات باستخدام state
      }
    } catch (error) {
      console.error("Error:", error); // عرض الخطأ في حال حدوث مشكلة
    }
  }
  

  const filterByGradeAndCenter = () => {
    return students.filter(student => {
      const gradeMatch = selectedGrade ?
        (student.grade === "الصف الأول الثانوي" && selectedGrade === "الصف الأول الثانوي") ||
        (student.grade === "الصف الثاني الثانوي" && selectedGrade === "الصف الثاني الثانوي") ||
        (student.grade === "الصف الثالث الثانوي" && selectedGrade === "الصف الثالث الثانوي") : true;

      const centerMatch = selectedCenter ?
        (student.center === "العين" && selectedCenter === "العين") ||
        (student.center === "الطيران" && selectedCenter === "الطيران") : true;

      return gradeMatch && centerMatch;
    });
  };

  const handleSelectGrade = (grade) => {
    setSelectedGrade(grade);
    setIsGradeOpen(false);
  };

  const handleSelectCenter = (center) => {
    setSelectedCenter(center);
    setIsCenterOpen(false);
  };

  const toggleGradeDropdown = () => setIsGradeOpen(!isGradeOpen);
  const toggleCenterDropdown = () => setIsCenterOpen(!isCenterOpen);

  return (
    <div className="relative overflow-x-auto shadow-md">
      {error && <div className="text-red-500 p-4">{error}</div>}
      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-gray-900 bg-white dark:text-white dark:bg-gray-800 border-b">
          <div className='flex justify-between items-center'>
            <NavLink to="addstudent" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">إضافة طالب</NavLink>
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

            <div className="relative inline-block text-left w-64">
              <button
                onClick={toggleGradeDropdown}
                className="inline-flex justify-between w-full px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                {selectedGrade || "اختيار الصف"}
                <svg
                  className={`w-5 h-5 ml-2 transition-transform ${isGradeOpen ? 'transform rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isGradeOpen && (
                <div className="absolute mt-2 w-full rounded-md bg-white shadow-lg z-10">
                  <ul className="py-1">
                    <li onClick={() => handleSelectGrade("الصف الأول الثانوي")} className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700">الصف الأول الثانوي</li>
                    <li onClick={() => handleSelectGrade("الصف الثاني الثانوي")} className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700">الصف الثاني الثانوي</li>
                    <li onClick={() => handleSelectGrade("الصف الثالث الثانوي")} className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700">الصف الثالث الثانوي</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="relative inline-block text-left w-64 ml-4">
              <button
                onClick={toggleCenterDropdown}
                className="inline-flex justify-between w-full px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                {selectedCenter || "اختيار السنتر"}
                <svg
                  className={`w-5 h-5 ml-2 transition-transform ${isCenterOpen ? 'transform rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isCenterOpen && (
                <div className="absolute mt-2 w-full rounded-md bg-white shadow-lg z-10">
                  <ul className="py-1">
                    <li onClick={() => handleSelectCenter("العين")} className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700">السنتر العين</li>
                    <li onClick={() => handleSelectCenter("الطيران")} className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700">السنتر الطيران</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">الوقت</th>
            <th scope="col" className="px-6 py-3">الصف</th>
            <th scope="col" className="px-6 py-3">السنتر</th>
            <th scope="col" className="px-6 py-3">قتح</th>
          </tr>
        </thead>
        <tbody>
          {filterByGradeAndCenter().length > 0 ? (
            filterByGradeAndCenter().map((student) => (
              <tr key={student.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200">
                <td className="px-6 py-4">{student.date}</td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {student.grade}
                </th>
                <td className="px-6 py-4">
                  <span className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{student.center}</span>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => open(student._id,student.grade,navigate)} className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">فتح</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">لا يوجد طلاب</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
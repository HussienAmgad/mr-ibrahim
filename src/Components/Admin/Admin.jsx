import React, { useEffect, useState } from 'react';

export default function Admin() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const currentDate = new Date().toISOString().split('T')[0];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // دالة لجلب بيانات الطلاب من السيرفر
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      setError("هناك خطأ في جلب البيانات");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // دالة الفلترة بناءً على الصف
  const filterByGrade = () => {
    if (selectedGrade) {
      return students.filter(student => student.grade === selectedGrade);
    }
    return students;
  };

  const handleSelect = (grade) => {
    // تحويل اسم الصف إلى رقم
    const gradeNumber = grade === "الصف الأول الثانوي" ? "1" : grade === "الصف الثاني الثانوي" ? "2" : "3";
    setSelectedGrade(gradeNumber);
    setIsOpen(false); // إغلاق القائمة
  };

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg">
      {error && <div className="text-red-500 p-4">{error}</div>}
      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-gray-900 bg-white dark:text-white dark:bg-gray-800 border-b">
          <div className='flex justify-between items-center'>
            <span>قائمة الطلاب</span>
            {/* قائمة الصف */}
            <div className="relative inline-block text-left w-64">
              <button
                onClick={toggleDropdown}
                className="inline-flex justify-between w-full px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                {selectedGrade ? `الصف ${selectedGrade}` : "إختيار الصف"}
                <svg
                  className={`w-5 h-5 ml-2 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute mt-2 w-full rounded-md bg-white shadow-lg z-10">
                  <ul className="py-1">
                    <li onClick={() => handleSelect("الصف الأول الثانوي")} className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700">الصف الأول الثانوي</li>
                    <li onClick={() => handleSelect("الصف الثاني الثانوي")} className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700">الصف الثاني الثانوي</li>
                    <li onClick={() => handleSelect("الصف الثالث الثانوي")} className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700">الصف الثالث الثانوي</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Code</th>
            <th scope="col" className="px-6 py-3">Student Name</th>
            <th scope="col" className="px-6 py-3">Attendance</th>
            <th scope="col" className="px-6 py-3">Homework</th>
            <th scope="col" className="px-6 py-3">Exam</th>
          </tr>
        </thead>
        <tbody>
          {filterByGrade().length > 0 ? (
            filterByGrade().map((student) => (
              <tr key={student.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200">
                <td className="px-6 py-4">{student.id}</td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {student.name}
                </th>
                <td className="px-6 py-4">
                  {/* حضور */}
                  <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">Present</span>
                </td>
                <td className="px-6 py-4">
                  {/* واجب */}
                  <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">Completed</span>
                </td>
                <td className="px-6 py-4">
                  {/* امتحان */}
                  <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">Passed</span>
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

import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Prep() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [isGradeOpen, setIsGradeOpen] = useState(false);
  const [isCenterOpen, setIsCenterOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response1 = await fetch('https://mr-ibrahim-server.vercel.app/showprep1');
      const data1 = await response1.json();
      const response2 = await fetch('https://mr-ibrahim-server.vercel.app/showprep2');
      const data2 = await response2.json();
      const response3 = await fetch('https://mr-ibrahim-server.vercel.app/showprep3');
      const data3 = await response3.json();

      // دمج البيانات وترتيبها من الأحدث إلى الأقدم بناءً على التاريخ
      const combinedData = [...data1, ...data2, ...data3].sort((a, b) => new Date(b.date) - new Date(a.date));

      setStudents(combinedData);
    } catch (error) {
      setError("هناك خطأ في جلب البيانات");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function open(id, grade, navigate) {
    let data;
    try {
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

      if (data) {
        navigate("/oneday", { state: { data } });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function Edit(id, grade, navigate) {
    try {
      let data;
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
  
      if (data) {
        // قم بتوجيه المستخدم إلى صفحة التعديل مع تمرير البيانات المطلوبة
        navigate("/editstudent", { state: { data } });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  

  const filterByGradeAndCenter = () => {
    return students.filter(student => {
      const gradeMatch = selectedGrade ? student.grade === selectedGrade : true;
      const centerMatch = selectedCenter ? student.center === selectedCenter : true;
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

  // const toggleGradeDropdown = () => setIsGradeOpen(!isGradeOpen);
  // const toggleCenterDropdown = () => setIsCenterOpen(!isCenterOpen);

  return (
    <div className="relative overflow-x-auto shadow-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
      {error && <div className="text-red-500 p-4 text-center">{error}</div>}
      <table className="min-w-full text-sm text-left text-gray-200 dark:text-gray-400 rounded-lg overflow-hidden shadow-lg">
        <caption className="p-5 text-2xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md mb-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <NavLink to="/addstudent" className="text-white bg-blue-800 hover:bg-blue-900 px-5 py-2 rounded-lg transition-all">إضافة طالب</NavLink>
              <NavLink to="/day" className="text-white bg-blue-800 hover:bg-blue-900 px-5 py-2 rounded-lg transition-all">بداية يوم</NavLink>
            </div>
            <button onClick={() => navigate(-1)} className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-all">رجوع</button>
          </div>
        </caption>
        <thead className="text-xs text-gray-300 uppercase bg-gradient-to-r from-blue-700 to-indigo-700">
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
              <tr key={student.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all">
                <td className="px-6 py-4 text-black dark:text-white">
                  {new Date(student.date).toLocaleString("ar-EG", {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {student.grade}
                </th>
                <td className="px-6 py-4">
                  <span className="font-medium text-gray-900 dark:text-white">{student.center}</span>
                </td>
                <td className="px-6 py-4 flex space-x-2">
                  <button onClick={() => open(student._id, student.grade, navigate)} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded-full transition-all">فتح</button>
                  <button onClick={() => Edit(student._id, student.grade, navigate)} className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded-full transition-all">تعديل</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-400">لا توجد بيانات لعرضها</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

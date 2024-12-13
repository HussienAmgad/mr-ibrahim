import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // تأكد من أن المكتبة تستخدم export named

export default function Student() {
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // جلب التوكن من localStorage
      const token = localStorage.getItem("userToken");
      if (token) {
        try {
          // فك التوكن
          const decodedToken = jwtDecode(token);
          setUserData(decodedToken);
          console.log(decodedToken);
          

          // تحديد الـ endpoint بناءً على grade
          let endpoint = "";
          if (decodedToken.grade === "الصف الأول الثانوي") {
            endpoint = "https://mr-ibrahim-server.vercel.app/showprep1";
          } else if (decodedToken.grade === "الصف الثاني الثانوي") {
            endpoint = "https://mr-ibrahim-server.vercel.app/showprep2";
          } else if (decodedToken.grade === "الصف الثالث الثانوي") {
            endpoint = "https://mr-ibrahim-server.vercel.app/showprep3";
          }

          if (endpoint) {
            try {
              const response = await axios.get(endpoint);
              setUser(response.data);
              console.log(response.data);
            } catch (error) {
              console.error("Error fetching user data:", error.response || error.message);
            }
          }
        } catch (error) {
          console.error("Error decoding token:", error.message);
        }
      }
    };

    fetchData();
  }, []);

  const handleClearStorage = () => {
    localStorage.clear();
    window.location.reload(); // يقوم بتحديث الصفحة عند الضغط على الزر
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-8">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-xl p-6 mx-auto">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">بيانات الطالب</h1>

        {userData ? (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 text-center">
            <p className="text-lg font-medium text-gray-700">
              Name: <span className="text-blue-500">{userData.name || "Name not available"}</span>
            </p>
            <p className="text-lg font-medium text-gray-700">
              Grade: <span className="text-blue-500">{userData.grade || "Grade not available"}</span>
            </p>
            <p className="text-lg font-medium text-gray-700">
              Center: <span className="text-blue-500">{userData.center || "Grade not available"}</span>
            </p>
            <p className="text-lg font-medium text-gray-700">
              Phone Parent: <span className="text-blue-500">{userData.phoneparent || "Grade not available"}</span>
            </p>
            <p className="text-lg font-medium text-gray-700">
              Phone Student: <span className="text-blue-500">{userData.phonestudent || "Grade not available"}</span>
            </p>
          </div>
        ) : (
          <p className="text-center text-xl text-gray-600">No user data found</p>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={handleClearStorage}
            className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
      <div className="mt-10 mb-5">
        <h2 className="text-3xl font-bold text-white text-center mb-6">تفاصيل الطالب</h2>
        {user && (
          <div className="mt-4 flex flex-wrap gap-4 justify-start">
            {user.map((day) => (
              <div
                key={day._id}
                className="bg-gray-200 p-4 rounded-lg shadow-md w-full sm:w-[calc(100%-16px)] md:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)]"
              >
                <h2 className="text-2xl font-semibold mb-2">اليوم: {new Date(day.date).toLocaleDateString()}</h2>
                {day.students.map((student) => {
                  if (student._id === userData.id) {
                    return (
                      <div key={student._id} className="bg-white p-4 rounded-lg shadow-md mb-2">
                        <h3 className="text-xl font-medium mb-2">الاسم: {student.name}</h3>
                        <p className="mb-2">الحضور: {student.Attendance ? "حاضر" : "غائب"}</p>
                        <p className="mb-2">الواجب: {student.Homework ? "مكتمل" : "غير مكتمل"}</p>
                        <p>الامتحان: {student.Exam ? student.Exam : "لم يمتحن"}</p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

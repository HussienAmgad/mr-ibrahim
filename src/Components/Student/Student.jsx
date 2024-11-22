import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // استيراد useNavigate من React Router

export default function Student() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();  // تعريف useNavigate

  useEffect(() => {
    const data = localStorage.getItem('Data');
    if (data) {
      try {
        setUserData(JSON.parse(data));  // محاولة تحليل البيانات كـ JSON
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleClearStorage = () => {
    localStorage.clear();  // مسح كل البيانات من localStorage
    navigate('/');  // توجيه المستخدم إلى الصفحة الرئيسية باستخدام useNavigate
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-8 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Student Information</h1>
        
        {userData ? (
          <div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
              <p className="text-lg font-medium text-gray-700">User ID: <span className="text-blue-500">{userData.student.id}</span></p>
              <p className="text-lg font-medium text-gray-700">Name: <span className="text-blue-500">{userData.student.name || "Name not available"}</span></p>
              <p className="text-lg font-medium text-gray-700">Phone Student: <span className="text-blue-500">{userData.student.phonestudent || "Phone not available"}</span></p>
              <p className="text-lg font-medium text-gray-700">Phone Parent: <span className="text-blue-500">{userData.student.phoneparent || "Phone not available"}</span></p>
            </div>
          </div>
        ) : (
          <p className="text-center text-xl text-gray-600">No user data found</p>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={handleClearStorage}
            className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

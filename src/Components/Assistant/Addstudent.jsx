import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // استيراد useNavigate
import { toast } from 'react-toastify';  // استيراد مكتبة Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStudent = () => {
  const [name, setName] = useState('');
  const [phoneParent, setPhoneParent] = useState('');
  const [phoneStudent, setPhoneStudent] = useState('');
  const [grade, setGrade] = useState('');
  const [center, setCenter] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // حالة التحميل

  const navigate = useNavigate();  // تهيئة navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);  // تفعيل التحميل

    const newStudent = {
      name,
      phoneparent: phoneParent,
      phonestudent: phoneStudent,
      grade,
      center,
    };

    try {
      const response = await axios.post('https://mr-ibrahim-server.vercel.app/addstudent', newStudent);
      setIsLoading(false);  // إيقاف التحميل
      toast.success(`تم إضافة الطالب بنجاح: ${response.data.student.name}`);  // رسالة نجاح
      // إعادة تعيين الحقول بعد الإضافة
      setName('');
      setPhoneParent('');
      setPhoneStudent('');
      setGrade('');
      setCenter('');
    } catch (error) {
      setIsLoading(false);  // إيقاف التحميل
      toast.error('حدث خطأ أثناء إضافة الطالب');  // رسالة خطأ
      console.error('Error adding student:', error);
    }
  };

  // دالة الرجوع للصفحة السابقة
  const handleGoBack = () => {
    navigate(-1);  // العودة للصفحة السابقة
  };

  return (
    <>
      <ToastContainer />

      <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-gradient-to-r from-blue-100 to-green-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">إضافة طالب جديد</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col mb-4">
            <label className="text-lg mb-2 text-blue-700">اسم الطالب:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-lg mb-2 text-blue-700">رقم هاتف ولي الأمر:</label>
            <input
              type="text"
              value={phoneParent}
              onChange={(e) => setPhoneParent(e.target.value)}
              required
              className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-lg mb-2 text-blue-700">رقم هاتف الطالب:</label>
            <input
              type="text"
              value={phoneStudent}
              onChange={(e) => setPhoneStudent(e.target.value)}
              required
              className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-lg mb-2 text-blue-700">اختر الصف:</label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
              className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">اختر صفًا</option>
              <option value="الصف الأول الثانوي">الصف الأول الثانوي</option>
              <option value="الصف الثاني الثانوي">الصف الثاني الثانوي</option>
              <option value="الصف الثالث الثانوي">الصف الثالث الثانوي</option>
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-lg mb-2 text-blue-700">اختر المركز:</label>
            <select
              value={center}
              onChange={(e) => setCenter(e.target.value)}
              required
              className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">اختر مركزًا</option>
              <option value="العين">العين</option>
              <option value="الطيران">الطيران</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
            disabled={isLoading}  // تعطيل الزر أثناء التحميل
          >
            {isLoading ? 'جاري الإضافة...' : 'إضافة الطالب'}
          </button>
        </form>
        {/* زر الرجوع */}
        <button
          onClick={handleGoBack}
          className="mt-4 bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-all"
        >
          رجوع
        </button>
      </div>
    </>
  );
};

export default AddStudent;

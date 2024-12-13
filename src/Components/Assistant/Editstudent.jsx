import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Editstudent() {
  const location = useLocation();
  const navigate = useNavigate();

  // استخراج البيانات المرسلة من الصفحة السابقة
  const data = location.state?.student;
  const [formData, setFormData] = useState({
    name: '',
    phoneparent: '',
    phonestudent: '',
    grade: '',
    center: ''
  });

  useEffect(() => {
    // إذا كانت هناك بيانات موجودة، قم بتحديث النموذج
    if (data) {
      setFormData({
        name: data.name || '',
        phoneparent: data.phoneparent || '',
        phonestudent: data.phonestudent || '',
        grade: data.grade || '',
        center: data.center || ''
      });
    }
  }, [data]);

  // التحقق من البيانات المرسلة
  if (!data) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-gradient-to-r from-blue-100 to-green-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-800">لا توجد بيانات طالب لتعديلها</h2>
        <button
          onClick={() => navigate(-1)} // Navigate back if no data is found
          className="mt-4 bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-all"
        >
          رجوع
        </button>
      </div>
    );
  }

  // التعامل مع التغيير في الحقول
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // التعامل مع إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedStudent = {
      name: formData.name,
      phoneparent: formData.phoneparent,
      phonestudent: formData.phonestudent,
      grade: formData.grade,
      center: formData.center
    };

    try {
      const response = await fetch(`http://localhost:8080/updatestudent/${data._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStudent)
      });

      const result = await response.json();

      if (response.ok) {
        // إظهار رسالة نجاح أو التوجيه إلى صفحة أخرى
        navigate('/'); // إعادة التوجيه إلى قائمة الطلاب بعد التحديث
      } else {
        console.log('حدث خطأ:', result.error);
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-gradient-to-r from-blue-100 to-green-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">تعديل طالب جديد</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col mb-4">
          <label className="text-lg mb-2 text-blue-700">اسم الطالب:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-lg mb-2 text-blue-700">رقم هاتف ولي الأمر:</label>
          <input
            type="text"
            name="phoneparent"
            value={formData.phoneparent}
            onChange={handleChange}
            required
            className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-lg mb-2 text-blue-700">رقم هاتف الطالب:</label>
          <input
            type="text"
            name="phonestudent"
            value={formData.phonestudent}
            onChange={handleChange}
            required
            className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-lg mb-2 text-blue-700">اختر الصف:</label>
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
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
            name="center"
            value={formData.center}
            onChange={handleChange}
            required
            className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">اختر مركزًا</option>
            <option value="العين">العين</option>
            <option value="الطيران">الطيران</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all">
          تعديل الطالب
        </button>
      </form>
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="mt-4 bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-all"
      >
        رجوع
      </button>
    </div>
  );
}

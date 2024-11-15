import React, { useState } from 'react';
import axios from 'axios';

const AddStudent = () => {
  const [name, setName] = useState('');
  const [phoneParent, setPhoneParent] = useState('');
  const [phoneStudent, setPhoneStudent] = useState('');
  const [grade, setGrade] = useState('');
  const [center, setCenter] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newStudent = {
      name,
      phoneparent: phoneParent,
      phonestudent: phoneStudent,
      grade,
      center,
    };

    try {
      const response = await axios.post('http://localhost:8080/addstudent', newStudent);
      setMessage(`تم إضافة الطالب بنجاح: ${response.data.student.name}`);
      // إعادة تعيين الحقول بعد الإضافة
      setName('');
      setPhoneParent('');
      setPhoneStudent('');
      setGrade('');
      setCenter('');
    } catch (error) {
      setMessage('حدث خطأ أثناء إضافة الطالب');
      console.error('Error adding student:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-5">إضافة طالب جديد</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">اسم الطالب:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">رقم هاتف ولي الأمر:</label>
          <input
            type="text"
            value={phoneParent}
            onChange={(e) => setPhoneParent(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">رقم هاتف الطالب:</label>
          <input
            type="text"
            value={phoneStudent}
            onChange={(e) => setPhoneStudent(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">اختر الصف:</label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
            className="border rounded w-full p-2"
          >
            <option value="">اختر صفًا</option>
            <option value="الصف الأول الثانوي">الصف الأول الثانوي</option>
            <option value="الصف الثاني الثانوي">الصف الثاني الثانوي</option>
            <option value="الصف الثالث الثانوي">الصف الثالث الثانوي</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">اختر المركز:</label>
          <select
            value={center}
            onChange={(e) => setCenter(e.target.value)}
            required
            className="border rounded w-full p-2"
          >
            <option value="">اختر مركزًا</option>
            <option value="العين">العين</option>
            <option value="الطيران">الطيران</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">إضافة الطالب</button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default AddStudent;

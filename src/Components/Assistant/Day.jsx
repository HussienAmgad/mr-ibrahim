import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form } from 'formik';

export default function Day() {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);
    const [attendance, setAttendance] = useState(0);
    const [isGradeOpen, setIsGradeOpen] = useState(false);
    const [isCenterOpen, setIsCenterOpen] = useState(false);
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [selectedCenter, setSelectedCenter] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://mr-ibrahim-server.vercel.app/');
            setStudents(response.data);
        } catch (error) {
            setError("هناك خطأ في جلب البيانات");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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

    const updateStudentData = (id, field, value) => {
        setStudents((prev) =>
            prev.map((student) =>
                student.id === id ? { ...student, [field]: value } : student
            )
        );
    };
    const handleEndOfDay = async () => {
        let url;
        switch (selectedGrade) {
            case "الصف الأول الثانوي":
                url = "https://mr-ibrahim-server.vercel.app/prep1";
                break;
            case "الصف الثاني الثانوي":
                url = "https://mr-ibrahim-server.vercel.app/prep2";
                break;
            case "الصف الثالث الثانوي":
                url = "https://mr-ibrahim-server.vercel.app/prep3";
                break;
            default:
                alert("يرجى اختيار الصف لتقفيل اليوم.");
                return;
        }

        const filteredStudents = filterByGradeAndCenter().map((student) => ({
            ...student,
            Exam: student.Exam || "", // تأكد من أن الامتحان لا يكون null
            Attendance: student.Attendance === true ? true : false, // تأكد من أن الحضور يكون Boolean
            Homework: student.Homework === true ? true : false, // تأكد من أن الواجب يكون Boolean
        }));

        const data = {
            date: new Date().toISOString(),
            grade: selectedGrade,
            center: selectedCenter,
            attendance: attendance,
            students: filteredStudents,
        };

        try {
            await axios.post(url, data);
            alert("تم تقفيل اليوم بنجاح.");
        } catch (error) {
            setError("حدث خطأ أثناء تقفيل اليوم.");
        }
    };

    function totalattendance() {
        let total = 0;

        const filteredStudents = filterByGradeAndCenter();

        // حساب عدد الحاضرين
        for (let student of filteredStudents) {
            if (student.Attendance) {
                total += 1;
            }
        }
        setAttendance(total);
    }




    const toggleGradeDropdown = () => setIsGradeOpen(!isGradeOpen);
    const toggleCenterDropdown = () => setIsCenterOpen(!isCenterOpen);

    return (
        <div className="relative overflow-x-auto shadow-md">
            {error && <div className="text-red-500 p-4">{error}</div>}
            <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-lg font-semibold text-gray-900 bg-white dark:text-white dark:bg-gray-800 border-b">
                    <div className='flex justify-between items-center'>
                        <NavLink to="/addstudent" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">إضافة طالب</NavLink>

                        <Formik
                            initialValues={{ students: filterByGradeAndCenter() }}
                            onSubmit={handleEndOfDay}
                        >
                            {({ values }) => (
                                <Form>
                                    <button
                                        onClick={totalattendance}
                                        type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    >
                                        تقفيل اليوم
                                    </button>
                                </Form>
                            )}
                        </Formik>
                        <NavLink
                            to="/"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            الرجوع الي الطلاب
                        </NavLink>

                        <span>قائمة الطلاب</span>

                        <div className="relative inline-block text-left w-64">
                            <button onClick={toggleGradeDropdown} className="inline-flex justify-between w-full px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
                                {selectedGrade || "اختيار الصف"}
                                <svg className={`w-5 h-5 ml-2 transition-transform ${isGradeOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                            <button onClick={toggleCenterDropdown} className="inline-flex justify-between w-full px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
                                {selectedCenter || "اختيار السنتر"}
                                <svg className={`w-5 h-5 ml-2 transition-transform ${isCenterOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isCenterOpen && (
                                <div className="absolute mt-2 w-full rounded-md bg-white shadow-lg z-10">
                                    <ul className="py-1">
                                        <li onClick={() => handleSelectCenter("العين")} className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700">السنتر العين</li>
                                        <li onClick={() => handleSelectCenter("الطيران")} className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700">الطيران</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </caption>
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3">الرقم</th>
                        <th className="px-6 py-3">الاسم</th>
                        <th className="px-6 py-3">الحضور</th>
                        <th className="px-6 py-3">الواجب</th>
                        <th className="px-6 py-3">درجة الإمتحان</th>
                    </tr>
                </thead>
                <tbody>
                    {filterByGradeAndCenter().map((student) => (
                        <tr key={student.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200">
                            <td className="px-6 py-4">{student.id}</td>
                            <td className="px-6 py-4">{student.name}</td>

                            <td className="px-6 py-4">
                                <input
                                    type="checkbox"
                                    checked={student.Attendance || false}
                                    onChange={(e) => updateStudentData(student.id, "Attendance", e.target.checked)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                />
                            </td>
                            <td className="px-6 py-4">
                                <input
                                    type="checkbox"
                                    checked={student.Homework || false}
                                    onChange={(e) => updateStudentData(student.id, "Homework", e.target.checked)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                />
                            </td>
                            <td className="px-6 py-4">
                                <input
                                    type="text"
                                    value={student.Exam || ""}
                                    onChange={(e) => updateStudentData(student.id, "Exam", e.target.value)}
                                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

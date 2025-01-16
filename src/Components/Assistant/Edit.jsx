import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Edit() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);
    const [grade, setGrade] = useState(null);
    const [center, setCenter] = useState(null);
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [attendance, setAttendance] = useState(0);
    const [selectedCenter, setSelectedCenter] = useState(null);
    const location = useLocation();
    const data = location.state?.data; // Receiving data from the previous component
    const [Name, setName] = useState(null);


    useEffect(() => {
        setCenter(data.center)
        if (data) {
            if (data.grade === "الصف الثالث الثانوي") {
                setGrade("prep3");
            } else if (data.grade === "الصف الثاني الثانوي") {
                setGrade("prep2");
            } else if (data.grade === "الصف الأول الثانوي") {
                setGrade("prep1");
            }

            if (Array.isArray(data.students)) {
                setStudents(data.students);
            }
        }
    }, [data]);

    const updateStudentData = (id, field, value) => {
        setStudents((prev) =>
            prev.map((student) =>
                student.id === id ? { ...student, [field]: value } : student
            )
        );
    };

    const filterByGradeAndCenter = () => {
        return students.filter(student => {
            const gradeMatch = selectedGrade ? student.grade === selectedGrade : true;
            const centerMatch = selectedCenter ? student.center === selectedCenter : true;
            return gradeMatch && centerMatch;
        });
    };
    const handleEndOfDay = async () => {
        if (!grade) {
            setError("الصف غير مُعرف");
            return; // Exit the function early if grade is not available
        }

        const collection = grade; // Ensure grade is available and used here
        const id = data._id; // Ensure data is valid before using its properties
        const url = `https://mr-ibrahim-server.vercel.app/update/${collection}/${id}`; // Correct the URL formation

        const filteredStudents = filterByGradeAndCenter().map((student) => ({
            ...student,
            Exam: student.Exam || "",
            Attendance: !!student.Attendance,
            Homework: !!student.Homework,
        }));

        const requestData = {
            date: data.date,
            grade: data.grade,
            center: data.center,
            modified: Name,
            students: filteredStudents,
        };

        try {
            // Use await here to wait for the axios post request to complete
            await axios.put(url, requestData);
            toast.success("تم تقفيل اليوم بنجاح");
            setTimeout(() => {
                navigate("/prep")
            }, 2000);
        } catch (error) {
            toast.error("تعذر تقفيل اليوم");
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
        const token = localStorage.getItem("userToken");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setName(decodedToken.name);
            } catch (error) {
                console.error("Error decoding token:", error.message);
            }
        } else {
            null
        }
        setAttendance(total);
    }


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
                            <Formik
                                initialValues={{ students: filterByGradeAndCenter() }}
                                onSubmit={handleEndOfDay}
                            >
                                {() => (
                                    <Form>
                                        <button
                                            onClick={totalattendance}
                                            type="submit"
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                        >
                                            تعديل اليوم
                                        </button>
                                    </Form>
                                )}
                            </Formik>
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
                                    <td className="px-6 py-4">
                                        <div className="flex">
                                            <input
                                                type="checkbox"
                                                checked={!!student.Attendance}
                                                onChange={(e) => updateStudentData(student.id, "Attendance", e.target.checked)}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 flex">
                                        <input
                                            type="checkbox"
                                            checked={!!student.Homework}
                                            onChange={(e) => updateStudentData(student.id, "Homework", e.target.checked)}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <input
                                            type="text"
                                            value={student.Exam || ''}
                                            placeholder="لم يمتحن"
                                            onChange={(e) => updateStudentData(student.id, "Exam", e.target.value)}
                                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
                                        />
                                    </td>
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

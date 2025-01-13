import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Admin() {
  let [assist, setAssist] = useState(null);
  let [error, setError] = useState(null);
  let [editIndex, setEditIndex] = useState(null);  // لتتبع العنصر الذي يتم تعديله
  let [editedData, setEditedData] = useState({});    // لتخزين البيانات المعدلة
  let [newAssistData, setNewAssistData] = useState({ name: '', password: '', statues: '', username: '' }); // لتخزين البيانات الجديدة

  useEffect(() => {
    // إرسال طلب GET للحصول على البيانات
    axios.post('https://mr-ibrahim-server.vercel.app/detailsassist')
      .then(response => {
        setAssist(response.data);
        console.log(response.data);  // يمكنك هنا طباعة البيانات لتتأكد أنها صحيحة
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  // التحقق مما إذا كانت البيانات قد وصلت بنجاح
  if (error) {
    return <div className="text-red-500 text-center">Error: {error.message}</div>;
  }

  // دالة لحفظ التعديلات
  const handleSave = (index) => {
    const updatedAssist = [...assist];
    updatedAssist[index] = { ...updatedAssist[index], ...editedData };  // تحديث البيانات
    setAssist(updatedAssist);
    setEditIndex(null);  // إيقاف وضع التعديل
    setEditedData({});   // إعادة تعيين البيانات المعدلة

    // إرسال التعديلات إلى الخادم
    const updatedItem = updatedAssist[index];
    axios.put(`https://mr-ibrahim-server.vercel.app/updateassist/${updatedItem.name}`, updatedItem)
      .then(response => {
        console.log("Item updated successfully:", response.data);
      })
      .catch(error => {
        console.log("Error updating item:", error);
      });
  };

  // دالة لإضافة عنصر مساعد جديد
  const handleAddAssist = () => {
    // إرسال البيانات الجديدة إلى الخادم باستخدام axios
    axios.post('https://mr-ibrahim-server.vercel.app/addassist', newAssistData)
      .then(response => {
        // بعد إضافة العنصر الجديد، تحديث القائمة
        setAssist([...assist, response.data]);  // إضافة العنصر الجديد إلى المصفوفة
        setNewAssistData({ name: '', password: '', statues: 'assist', username: '' }); // إعادة تعيين البيانات الجديدة
      })
      .catch(error => {
        console.log('Error adding new assist:', error);
      });
  };

  // دالة لحذف المساعد
  const handleDelete = (name) => {
    axios.delete(`https://mr-ibrahim-server.vercel.app/deleteassist/${name}`)
      .then(response => {
        // تحديث القائمة بعد الحذف
        setAssist(assist.filter(item => item.name !== name));
        console.log("Item deleted successfully:", response.data);
      })
      .catch(error => {
        console.log("Error deleting item:", error);
      });
  };

  const handleInputChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  const handleNewInputChange = (e, field) => {
    setNewAssistData({ ...newAssistData, [field]: e.target.value });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {assist && assist.map((item, index) => (
        <div key={index} className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transform transition-all hover:scale-105 hover:shadow-xl p-6">
          <div className="px-6 py-4">
            <h2 className="font-bold text-xl mb-3 text-gray-800">
              {editIndex === index ? (
                <input
                  type="text"
                  value={editedData.name || item.name}
                  onChange={(e) => handleInputChange(e, 'name')}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              ) : (
                item.name
              )}
            </h2>
            <p className="text-gray-600 text-base mb-2">
              Password :
              {editIndex === index ? (
                <input
                  type="text"
                  value={editedData.password || item.password}
                  onChange={(e) => handleInputChange(e, 'password')}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              ) : (
                item.password
              )}
            </p>
            <p className="text-gray-600 text-base mb-2">
              Statues :
              {editIndex === index ? (
                <input
                  type="text"
                  value={editedData.statues || item.statues}
                  onChange={(e) => handleInputChange(e, 'statues')}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              ) : (
                item.statues
              )}
            </p>
            <p className="text-gray-600 text-base">
              Username :
              {editIndex === index ? (
                <input
                  type="text"
                  value={editedData.username || item.username}
                  onChange={(e) => handleInputChange(e, 'username')}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              ) : (
                item.username
              )}
            </p>
          </div>
          <div className="px-6 py-4 text-center">
            {editIndex === index ? (
              <button
                onClick={() => handleSave(index)}
                className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-green-600 transition-all"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setEditIndex(index)}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-all"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => handleDelete(item.name)} // حذف المساعد بناءً على الاسم
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-red-600 transition-all ml-2"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-4">Add New Assist</h2>
          <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transform transition-all hover:scale-105 hover:shadow-xl p-6">
            <input
              type="text"
              value={newAssistData.name}
              onChange={(e) => handleNewInputChange(e, 'name')}
              placeholder="Name"
              className="border border-gray-300 rounded p-2 mb-2 w-full"
            />
            <input
              type="text"
              value={newAssistData.password}
              onChange={(e) => handleNewInputChange(e, 'password')}
              placeholder="Password"
              className="border border-gray-300 rounded p-2 mb-2 w-full"
            />
            <input
              type="text"
              value={newAssistData.username}
              onChange={(e) => handleNewInputChange(e, 'username')}
              placeholder="Username"
              className="border border-gray-300 rounded p-2 mb-2 w-full"
            />
            <button
              onClick={handleAddAssist}
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-green-600 transition-all w-full"
            >
              Add Assist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

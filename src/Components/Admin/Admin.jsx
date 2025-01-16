import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Admin() {
  let [assist, setAssist] = useState(null);
  let [admin, setAdmin] = useState(null);
  let [error, setError] = useState(null);
  let [editIndex, setEditIndex] = useState(null);
  let [editIndexadmin, setEditIndexadmin] = useState(null);
  let [editedData, setEditedData] = useState({});
  let [editedDataadmin, setEditedDataadmin] = useState({});
  let [newAssistData, setNewAssistData] = useState({ name: '', password: '', statues: '', username: '' });

  useEffect(() => {
    axios.post('https://mr-ibrahim-server.vercel.app/detailsassist')
      .then(response => {
        setAssist(response.data);
        console.log(response.data);
      })
      .catch(error => {
        setError(error);
      });
    axios.post('https://mr-ibrahim-server.vercel.app/detailsadmin')
      .then(response => {
        setAdmin(response.data);
        console.log(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  if (error) {
    return <div className="text-red-500 text-center">Error: {error.message}</div>;
  }

  const handleSave = (index) => {
    const updatedAssist = [...assist];
    updatedAssist[index] = { ...updatedAssist[index], ...editedData };
    setAssist(updatedAssist);
    setEditIndex(null);
    setEditedData({});
    const updatedItem = updatedAssist[index];
    axios.put(`https://mr-ibrahim-server.vercel.app/updateassist/${updatedItem.name}`, updatedItem)
      .then(response => {
        console.log("Item updated successfully:", response.data);
      })
      .catch(error => {
        console.log("Error updating item:", error);
      });
  };

  const handleSaveadmin = (index) => {
    const updatedadmin = [...admin];
    updatedadmin[index] = { ...updatedadmin[index], ...editedDataadmin };
    setAdmin(updatedadmin);
    setEditIndexadmin(null);
    setEditedDataadmin({});
    const updatedItem = updatedadmin[index];
    axios.put(`https://mr-ibrahim-server.vercel.app/updateadmin/${updatedItem.name}`, updatedItem)
      .then(response => {
        console.log("Item updated successfully:", response.data);
      })
      .catch(error => {
        console.log("Error updating item:", error);
      });
  };

  const handleAddAssist = () => {
    axios.post('https://mr-ibrahim-server.vercel.app/addassist', newAssistData)
      .then(response => {
        setAssist([...assist, response.data]);
        setNewAssistData({ name: '', password: '', statues: 'assist', username: '' });
      })
      .catch(error => {
        console.log('Error adding new assist:', error);
      });
  };

  const handleDelete = (name) => {
    axios.delete(`https://mr-ibrahim-server.vercel.app/deleteassist/${name}`)
      .then(response => {
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

  const handleInputChangeadmin = (e, field) => {
    setEditedDataadmin({ ...editedDataadmin, [field]: e.target.value });
  };
  
  const handleNewInputChange = (e, field) => {
    setNewAssistData({ ...newAssistData, [field]: e.target.value });
  };

  return (
    <>
      <h1 className='text-center text-3xl font-bold mb-6 text-gray-800'>Account Assist</h1>
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
                onClick={() => handleDelete(item.name)}
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

      <h1 className='text-center text-3xl font-bold mb-6 text-gray-800'>Account Admin</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {admin && admin.map((item, index) => (
          <div key={index} className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transform transition-all hover:scale-105 hover:shadow-xl p-6">
            <div className="px-6 py-4">
              <h2 className="font-bold text-xl mb-3 text-gray-800">
                {editIndexadmin === index ? (
                  <input
                    type="text"
                    value={editedDataadmin.name || item.name}
                    onChange={(e) => handleInputChangeadmin(e, 'name')}
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                ) : (
                  item.name
                )}
              </h2>
              <p className="text-gray-600 text-base mb-2">
                Password :
                {editIndexadmin === index ? (
                  <input
                    type="text"
                    value={editedDataadmin.password || item.password}
                    onChange={(e) => handleInputChangeadmin(e, 'password')}
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                ) : (
                  item.password
                )}
              </p>
              <p className="text-gray-600 text-base">
                Statues :
                {editIndexadmin === index ? (
                  <input
                    type="text"
                    value={editedDataadmin.statues || item.statues}
                    onChange={(e) => handleInputChangeadmin(e, 'statues')}
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                ) : (
                  item.statues
                )}
              </p>
            </div>
            <div className="px-6 py-4 text-center">
              {editIndexadmin === index ? (
                <button
                  onClick={() => handleSaveadmin(index)}
                  className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-green-600 transition-all"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setEditIndexadmin(index)}
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-all"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

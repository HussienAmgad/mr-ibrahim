import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSpinner } from 'react-icons/fa';

export default function Admin() {
  const [assist, setAssist] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [editIndexadmin, setEditIndexadmin] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [editedDataadmin, setEditedDataadmin] = useState({});
  const [newAssistData, setNewAssistData] = useState({ name: '', password: '', statues: '', username: '' });

  useEffect(() => {
    setLoading(true);

    axios.post('https://mr-ibrahim-server.vercel.app/detailsassist')
      .then(response => {
        setAssist(response.data);
        setLoading(false);  // Stop loading
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        toast.error('Error fetching assist data');
      });

    axios.post('https://mr-ibrahim-server.vercel.app/detailsadmin')
      .then(response => {
        setAdmin(response.data);
      })
      .catch(error => {
        setError(error);
        toast.error('Error fetching admin data');
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <FaSpinner className="animate-spin text-3xl text-blue-500" />
        <p>Loading...</p>
      </div>
    );
  }

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
        toast.success('Item updated successfully');
      })
      .catch(error => {
        toast.error('Error updating item');
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
        toast.success('Admin updated successfully');
      })
      .catch(error => {
        toast.error('Error updating admin');
      });
  };

  const handleAddAssist = () => {
    axios.post('https://mr-ibrahim-server.vercel.app/addassist', newAssistData)
      .then(response => {
        setAssist([...assist, response.data]);
        setNewAssistData({ name: '', password: '', statues: 'assist', username: '' });
        toast.success('New assist added successfully');
      })
      .catch(error => {
        toast.error('Error adding new assist');
      });
  };

  const handleAddAdmin = () => {
    axios.post('https://mr-ibrahim-server.vercel.app/addadmin', newAssistData)
      .then(response => {
        setAdmin([...admin, response.data]);
        setNewAssistData({ name: '', password: '', statues: 'admin', username: '' });
        toast.success('New admin added successfully');
      })
      .catch(error => {
        toast.error('Error adding new admin');
      });
  };

  const handleDelete = (name) => {
    axios.delete(`https://mr-ibrahim-server.vercel.app/deleteassist/${name}`)
      .then(response => {
        setAssist(assist.filter(item => item.name !== name));
        toast.success('Item deleted successfully');
      })
      .catch(error => {
        toast.error('Error deleting item');
      });
  };

  const handleDeleteAdmin = (name) => {
    axios.delete(`https://mr-ibrahim-server.vercel.app/deleteadmin/${name}`)
      .then(response => {
        setAdmin(admin.filter(item => item.name !== name));
        toast.success('Admin deleted successfully');
      })
      .catch(error => {
        toast.error('Error deleting admin');
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
      <ToastContainer />
      <h1 className="text-center text-2xl font-bold mb-6">Account Assist</h1>
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
                Password:
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
                Statues:
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
                Username:
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
                className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-green-600 transition-all"
              >
                Add Assist
              </button>
            </div>
          </div>
        </div>
      </div>


      <h1 className="text-center text-2xl font-bold mb-6 mt-10">Account Admin</h1>
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
              <p className="text-gray-600 text-base mb-2">
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
              <p className="text-gray-600 text-base">
                Username :
                {editIndexadmin === index ? (
                  <input
                    type="text"
                    value={editedDataadmin.username || item.username}
                    onChange={(e) => handleInputChangeadmin(e, 'username')}
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                ) : (
                  item.username
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
              <button
                onClick={() => handleDeleteAdmin(item.name)}
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-red-600 transition-all ml-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </>
  );
}

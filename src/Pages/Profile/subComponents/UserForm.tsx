import React, { useState } from 'react';
import { Skeleton } from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';

const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { darkMode } = useSelector((state: RootState) => state.theme);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    dob : user?.dob || '',
    bio: user?.bio || '',
    phone: user?.phone || '',
    location: user?.location || '',
    linkedIn: user?.linkedIn || '',
    portfolio: user?.portfolio || '',
    github: user?.github || '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 
  const handleEdit = () => {
    setEditMode(!editMode);
  };

  
  const handleSave = () => {
    console.log('Saved Data:', formData);
    setEditMode(false);
  };

  return (
    <div className={`flex items-center justify-center ${darkMode ? 'bg-gray-800' :'bg-white' } `}>
      <div className={`p-10 rounded-xl shadow-md w-full max-w-md ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'}`}>
        <h2 className="text-3xl font-bold text-blue-600 mb-8">@{formData.username || <Skeleton className="h-8 w-1/2 bg-gray-300" />}</h2>
        <form className="space-y-4">
            <section>
            <h3 className="text-lg font-semibold mb-4">Basic Details</h3>
            <div className="space-y-3">
            <label className="block text-sm font-medium">Name</label>
            {editMode ? (
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`mt-1 block w-full p-2 border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
            ) : (
              <p className={`mt-1 p-2 border ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-300 bg-gray-100'} rounded-md`}>{formData.username}</p>
            )}
          </div>

          <div className= 'space-y-3'>
            <label className="block text-sm font-medium ">Email</label>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full p-2 border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
            ) : (
              <p className={`mt-1 p-2 border ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-300 bg-gray-100'} rounded-md`}>{formData.email}</p>
            )}
          </div>
          <div className= 'space-y-3'>
            <label className="block text-sm font-medium ">Phone</label>
            {editMode ? (
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`mt-1 block w-full p-2 border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
            ) : (
              <p className={`mt-1 p-2 border ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-300 bg-gray-100'} rounded-md`}>{formData.phone}</p>
            )}
          </div>


          <div className= 'space-y-3'>
          <label className="block text-sm font-medium">Date Of Birth</label>
          {editMode ? (
          <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className={`w-full p-2 border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  />
                ) : (
                    <p className={`mt-1 p-2 border ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-300 bg-gray-100'} rounded-md`}>{formData.dob}</p>
                  )}
          </div>
            </section>

            <section>
             <h3 className="text-lg font-semibold mb-4">Portfolio Links</h3>
 
             <div className= 'space-y-4'>
                <label className="block text-sm font-medium">portfolio</label>
                {editMode ? (
                   <input
                    type="text"
                    name="portfolio"
                    value={formData.portfolio || ''}
                    onChange={handleChange}
                    className={`w-full p-2 border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  />
                ) : (
                    <p className={`mt-1 p-2 border ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-300 bg-gray-100'} rounded-md`}>{formData.portfolio}</p>
                  )}
            </div>
            <div className= 'space-y-4'>
                <label className="block text-sm font-medium">linkedIn</label>
                {editMode ? (
                   <input
                    type="string"
                    name="linkedIn"
                    value={formData.linkedIn || ''}
                    onChange={handleChange}
                    className={`w-full p-2 border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  />
                ) : (
                    <p className={`mt-1 p-2 border ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-300 bg-gray-100'} rounded-md`}>{formData.linkedIn}</p>
                  )}
            </div>
            <div className= 'space-y-4'>
                <label className="block text-sm font-medium">GitHub</label>
                {editMode ? (
                   <input
                    type="string"
                    name="github"
                    value={formData.github || ''}
                    onChange={handleChange}
                    className={`w-full p-2 border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  />
                ) : (
                    <p className={`mt-1 p-2 border ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-300 bg-gray-100'} rounded-md`}>{formData.github}</p>
                  )}
            </div>


            </section>
          
        <section>

        <h3 className="text-lg font-semibold mb-4">Aditional Information</h3>
        <div className= 'space-y-4'>
            <label className="block text-sm font-medium">Bio</label>
            {editMode ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className={`mt-1 block w-full p-2 border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              ></textarea>
            ) : (
              <p className={`mt-1 p-2 border ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-300 bg-gray-100'} rounded-md`}>{formData.bio}</p>
            )}
            <div className="text-right text-xs text-gray-500 mt-1">{formData.bio.length}/200</div>
          </div>
        <div className= 'space-y-4'>
            <label className="block text-sm font-medium">Location</label>
            {editMode ? (
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`mt-1 block w-full p-2 border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
            ) : (
              <p className={`mt-1 p-2 border ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-300 bg-gray-100'} rounded-md`}>{formData.location}</p>
            )}
          </div>

        </section>

         
         
        
        
          <button
            type="button"
            onClick={handleEdit}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition ${darkMode ? 'hover:bg-blue-600' : ''}`}
          >
            {editMode ? 'Cancel' : 'Edit'}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={handleSave}
              className={`w-full bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 transition ${darkMode ? 'hover:bg-blue-600' : ''}`}
            >
              Save
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;

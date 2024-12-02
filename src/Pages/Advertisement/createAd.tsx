import  { useState } from 'react';

const CreateAd = () => {
  const [adDetails, setAdDetails] = useState({
    title: '',
    description: '',
    targetAudience: '',
    format: 'Video Ad',
  });

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  setAdDetails({ ...adDetails, [e.target.name]: e.target.value });
};


  const handleSubmit = () => {
    console.log('Ad Details:', adDetails);
    alert('Ad Created Successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Your Advertisement</h1>
        <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2">Ad Title</label>
            <input
              type="text"
              name="title"
              value={adDetails.title}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg"
              placeholder="Enter your ad title"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={adDetails.description}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg"
            
              placeholder="Write a brief description of your ad"
            ></textarea>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Target Audience</label>
            <input
              type="text"
              name="targetAudience"
              value={adDetails.targetAudience}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg"
              placeholder="Define your target audience"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Ad Format</label>
            <select
              name="format"
              value={adDetails.format}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg"
            >
              <option>Video Ad</option>
              <option>Banner Ad</option>
              <option>Text Ad</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Create Ad
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAd;

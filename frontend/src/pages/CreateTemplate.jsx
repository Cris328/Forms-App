import { useEffect, useState } from 'react';
import { fetchTopics } from '../services/topicService.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateTemplate = () => {
  const [topics, setTopics] = useState([]);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    topic: '',
    image: '',
    questions: ['', '', '', ''],
  });

  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    setUploading(true);
    const formDataImage = new FormData();
    formDataImage.append('image', file);

    try {
      const response = await axios.post('http://localhost:5500/api/v1/upload', formDataImage, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      setFormData((prev) => ({ ...prev, image: response.data.imageUrl }));
      setImagePreview(response.data.imageUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found!');
      return;
    }

    const templateData = {
      title: formData.title,
      description: formData.description,
      topic: formData.topic,
      image: formData.image,
      questions: formData.questions.map((question) => ({
        content: question,
        type: 'text',
      })),
    };

    try {
      const response = await axios.post('http://localhost:5500/api/v1/templates', templateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Template created successfully:', response.data);
    } catch (error) {
      console.error('Error creating template:', error.response?.data || error);
    }
  };

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const { data } = await axios.get('http://localhost:5500/api/v1/topics');
        if (Array.isArray(data)) {
          setTopics(data);
        } else {
          console.error('Expected an array of topics.');
        }
      } catch (err) {
        console.error('Failed to fetch topics:', err);
        alert('Failed to fetch topics');
      } finally {
        setLoadingTopics(false);
      }
    };
    loadTopics();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-black text-white py-4 px-6 shadow-md flex justify-between items-center">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-black text-lg font-semibold"
        >
          Dashboard
        </button>
        <h1 className="text-2xl font-bold text-center">Create a New Template</h1>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-10 mt-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border border-gray-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-gray-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Select a Topic</label>
            {loadingTopics ? (
              <p className="text-gray-600">Loading topics...</p>
            ) : topics.length === 0 ? (
              <p className="text-gray-600">No topics found.</p>
            ) : (
              <div className="flex flex-wrap gap-4">
                {topics.map((topic) => (
                  <button
                    key={topic._id}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, topic: topic._id });
                    }}
                    className={`px-5 py-2 rounded-full text-sm font-medium border transition duration-150 ease-in-out shadow-sm ${
                      formData.topic === topic._id
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {topic.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Questions</label>
            <div className="grid grid-cols-1 gap-4">
              {formData.questions.map((q, index) => (
                <input
                  key={index}
                  type="text"
                  value={q}
                  onChange={(e) => handleChange(index, e.target.value)}
                  placeholder={`Question ${index + 1}`}
                  className="w-full border border-gray-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Upload Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
            {uploading && <p className="text-gray-500 mt-2">Uploading image...</p>}
            {imagePreview && (
              <div className="mt-4">
                <img src={imagePreview} alt="Preview" className="w-full rounded-2xl max-h-60 object-cover" />
              </div>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={uploading}
              className={`${
                uploading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              } text-white py-3 px-6 rounded-2xl text-base font-semibold shadow-md transition`}
            >
              {uploading ? 'Uploading...' : 'Create Template'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTemplate;

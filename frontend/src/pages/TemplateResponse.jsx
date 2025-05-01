import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTemplateById, submitTemplateResponse } from '../services/templateResponseService.js';

const TemplateResponsePage = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        const data = await fetchTemplateById(id);
        setTemplate(data);
        setAnswers(Array(data.questions.length).fill(''));
      } catch (err) {
        console.error('Error loading template:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTemplate();
  }, [id]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitTemplateResponse(id, answers);
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting response:', err);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  if (submitted)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
          <h2 className="text-2xl font-semibold text-green-600">Response submitted successfully! ✅</h2>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-black text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold text-center">Answer Template: {template.title}</h1>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-10 mt-10">
        <p className="mb-6 text-gray-700 text-lg">{template.description}</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {template.questions.map((question, index) => (
            <div key={index}>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                {`Q${index + 1}: ${question}`}
              </label>
              <input
                type="text"
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="w-full border border-gray-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          ))}

          <div className="text-center">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-2xl text-base font-semibold shadow-md transition"
            >
              Submit Response
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TemplateResponsePage;

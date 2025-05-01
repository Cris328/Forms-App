import axios from 'axios';

export const fetchTemplateById = async (id) => {
  const response = await axios.get(`/api/v1/templates/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const submitTemplateResponse = async (templateId, answers) => {
  const response = await axios.post(
    '/api/v1/template-responses',
    { templateId, answers },
    { withCredentials: true }
  );
  return response.data;
};

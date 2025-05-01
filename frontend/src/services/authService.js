import axios from "axios";

const API_URL = "http://localhost:5500/api/v1/auth";

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/sign-up`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/sign-in`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};
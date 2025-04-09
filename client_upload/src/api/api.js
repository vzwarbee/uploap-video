import axios from "axios";

const API_BASE_URL = "https://server.moitruongdaihoc.com/api";

export const fetchVideos = async () => {
  const response = await axios.get(`${API_BASE_URL}/videos`);
  return response.data.result;
};

export const uploadVideo = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

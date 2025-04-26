import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; //"https://server.moitruongdaihoc.com/api";

export const fetchVideos = async ({ page = 1, perPage = 10 }) => {
  const response = await axios.get(`${API_BASE_URL}/videos`, {
    params: { page, perPage },
  });
  return response.data;
};

export const uploadVideo = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteVideo = async (videoUID) => {
  const res = await axios.delete(`${API_BASE_URL}/delete-video`, {
    idVideo: videoUID,
  });

  return res.data;
};

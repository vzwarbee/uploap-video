import axiosInstance from '../utils/axiosInstance';

export const authSignUp = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post('auth/signup', {
      email,
      password,
    });

    return response?.data;
  } catch (error) {
    throw error.response || { error: 'Đăng ký thất bại' };
  }
};

export const authSignIn = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post('auth/login', {
      email,
      password,
    });

    const { idToken } = response.data;
    localStorage.setItem('token', idToken);

    return response?.data;
  } catch (error) {
    throw error.response || { error: 'Đăng nhập thất bại' };
  }
};
export const getUser = async () => {
  try {
    const response = await axiosInstance.get('auth/get-user');

    return response?.data;
  } catch (error) {
    throw error.response || { error: 'Gọi user thất bại' };
  }
};

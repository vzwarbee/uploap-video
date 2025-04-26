import { ToastContainer } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';

const ToastTifyContainer = () => {
  const { theme } = useTheme();
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme}
    />
  );
};

export default ToastTifyContainer;

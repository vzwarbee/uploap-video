import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadVideo } from '../../api/api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function UploadVideo({ openModal, setOpenModal }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: uploadVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });

  const handleSubmit = async (file) => {
    const formData = new FormData();
    if (file) formData.append('video', file);
    mutation.mutate(formData);
  };

  React.useEffect(() => {}, [mutation.isPending]);

  return (
    <div>
      <Modal
        open={openModal}
        onClose={setOpenModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }} className="bg-white dark:!bg-white/[0.8]">
          <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
            <div className="md:flex">
              <div className="w-full p-3">
                <div
                  className={`relative ${
                    mutation.isPending ? 'flex justify-center items-center' : ''
                  } dflex h-48 rounded-lg border-2 border-blue-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out`}
                >
                  <div className="absolute flex flex-col items-center">
                    <img
                      alt="File Icon"
                      className="mb-3"
                      src="https://img.icons8.com/dusk/64/000000/file.png"
                    />
                    <span className="block text-gray-500 font-semibold">
                      Drag &amp; drop your files here
                    </span>
                    <span className="block text-gray-400 font-normal mt-1">or click to upload</span>
                  </div>
                  <input
                    name=""
                    accept="video/mp4, video/mov, video/webm"
                    className={`h-full w-full opacity-0 cursor-pointer ${
                      mutation.isPending ? 'hidden' : ''
                    }`}
                    type="file"
                    onChange={(e) => handleSubmit(e.target.files[0])}
                  />
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { uploadVideo } from '../../../api/api';
import UploadVideoUI from '../../common/UploadVideoUI';
import { Button, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: '2px solid rgb(0,0,0, 0.3)',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: 5,
};

export default function ModalUploadVideo({ openModal, setOpenModal }) {
  // const queryClient = useQueryClient();

  // const mutation = useMutation({
  //   mutationFn: uploadVideo,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['videos'] });
  //   },
  // });

  // const handleSubmit = async (file) => {
  //   const formData = new FormData();
  //   if (file) formData.append('video', file);
  //   mutation.mutate(formData);
  // };

  // React.useEffect(() => {}, [mutation.isPending]);
  return (
    <div>
      <Modal
        open={openModal}
        onClose={setOpenModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }} className="bg-white dark:bg-gray-dark md:w-[600px] w-[400px]">
          <Typography variant="h5" className="mb-2 text-brand-500 dark:text-gray-200">
            Tải video mới
          </Typography>
          <div className="my-4">
            <Divider className=" dark:bg-gray-200 bg-gray-700" />
          </div>
          <UploadVideoUI />
          <Box className="flex gap-5 justify-end">
            <Button color="primary" size="medium" onClick={setOpenModal} variant="outlined">
              Huỷ
            </Button>
            <Button color="primary" size="medium" variant="contained">
              Tải
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useDeleteVideo } from '../../../hooks/useListVideo';
// import { toast } from 'react-toastify';

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

export default function ModalDeleted({ openModal, setOpenModal, video, children }) {
  const deleteVideoMutation = useDeleteVideo();
  const handleDeleted = () => {
    if (video?.uid) {
      deleteVideoMutation.mutate(video?.uid, {
        onSuccess: () => {
          setOpenModal(!openModal);
        },
      });
    }
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={setOpenModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }} className="bg-white dark:bg-gray-dark md:w-[600px] w-[400px]">
          <Typography variant="h6" className="mb-2 text-brand-500 dark:text-gray-200">
            Bạn muốn xoá <span className="text-red-500">{`[${video?.meta?.name}]`}</span>?
          </Typography>
          <div className="my-4">
            <Divider className=" dark:bg-gray-200 bg-gray-700" />
          </div>
          <div className="p-4 max-w-md mx-auto">{children}</div>
          <Box className="flex gap-5 justify-end">
            <Button
              disabled={deleteVideoMutation.isPending}
              loading={deleteVideoMutation.isPending}
              onClick={handleDeleted}
              color="error"
              size="medium"
              variant="contained"
            >
              Xoá
            </Button>
            <Button color="primary" size="medium" onClick={setOpenModal} variant="outlined">
              Huỷ
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

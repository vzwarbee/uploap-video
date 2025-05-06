// hooks/useDeleteVideo.js

import { useMutation } from '@tanstack/react-query';
import { deleteVideo } from '../api/api';
import { queryClient } from '../main';
import { toast } from 'react-toastify';

export function useDeleteVideo() {
  return useMutation({
    mutationFn: deleteVideo,
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: ['allVideos'] });
      const previousVideos = queryClient.getQueryData(['allVideos']);
      queryClient.setQueriesData(['allVideos'], (old) => {
        old.data.filter((video) => video.uid !== deletedId);
      });
      return { previousVideos };
    },
    onError: (err, id, context) => {
      toast.error('❌ Delete video lỗi:', err);
      queryClient.setQueriesData(['allVideos'], context.previousVideos);
    },
    onSuccess: () => {
      toast.success('✅ Xoá video thành công!');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['allVideos'] });
    },
  });
}

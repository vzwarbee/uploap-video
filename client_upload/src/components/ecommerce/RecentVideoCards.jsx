import { useState } from 'react';
import { Dropdown } from '../ui/dropdown/Dropdown';
import { DropdownItem } from '../ui/dropdown/DropdownItem';
import { MoreDotIcon } from '../../icons';
import VideoCard from '../common/VideoCard';
import { ButtonGroup, Skeleton } from '@mui/material';
import { randomKeyProp } from '../../helper/helper-convert-size';
import { useQuery } from '@tanstack/react-query';
import { fetchVideos } from '../../api/api';

export default function RecentVideoCards() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const page = 1;
  const perPage = 4;

  const { data: videos, isLoading } = useQuery({
    queryKey: ['videos', { page, perPage }],
    queryFn: () => fetchVideos({ page: page, perPage: perPage }),
  });

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Video mới tải
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">Kiếm bội thu thôi</p>
          </div>
          <div className="relative inline-block">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
            </button>
            <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                View More
              </DropdownItem>
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                Delete
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
        <div className="relative ">
          <div className="grid grid-cols-12 gap-4 md:gap-6 p-6" id="chartDarkStyle">
            {isLoading &&
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="col-span-12 xl:col-span-3 md:col-span-4 border rounded-lg shadow-md overflow-hidden"
                >
                  <Skeleton
                    variant="rectangular"
                    sx={{ bgcolor: 'grey.800' }}
                    className="w-full"
                    height={192}
                  />
                  <div className="p-4">
                    <Skeleton
                      variant="text"
                      className="w-full h-10"
                      sx={{ bgcolor: 'grey.800' }}
                      height={42}
                    />
                  </div>
                </div>
              ))}
            {!isLoading && videos?.length === 0 ? (
              <p className="text-center text-red-500">Không có video nào để hiển thị {'>w<'}</p>
            ) : (
              videos?.data?.map((video) => (
                <div
                  key={randomKeyProp(video.uid)}
                  className="relative col-span-12 xl:col-span-3 md:col-span-4 border border-gray-200 bg-gray-100 dark:border-gray-800 rounded-lg shadow-md overflow-hidden"
                >
                  <VideoCard video={video} type="hls" />
                  <div className="p-4">
                    <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                      {video?.meta?.name || 'Untitled Video'}
                    </h2>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';
import Badge from '../ui/badge/Badge';
import {
  convertDuration,
  formatDate,
  formatSize,
  randomKeyProp,
} from '../../helper/helper-convert-size';
import { useQuery } from '@tanstack/react-query';
import { fetchVideos } from '../../api/api';
import { useState } from 'react';
import VideoPagination from '../common/VideoPagination';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import UploadVideo from '../ui/modal/ModalUploadVideo';
import { Dropdown } from '../ui/dropdown/Dropdown';
import { DropdownItem } from '../ui/dropdown/DropdownItem';
import { MoreDotIcon } from '../../icons';

// Define the table data using the interface

export default function ListVideos() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isOpen, setIsOpen] = useState(false);

  function closeDropdown(index) {
    setIsOpen(isOpen === index ? null : index);
  }

  const { data: videos, isLoading } = useQuery({
    queryKey: ['videos', { page, perPage }],
    queryFn: () => fetchVideos({ page: page, perPage: perPage }),
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Danh sách nhạc</h3>
        </div>
        <div className="flex items-center gap-3">
          <UploadVideo className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <FileUploadIcon />
            Upload
          </UploadVideo>
          <div className="flex items-center">
            <VideoPagination
              totalItems={videos?.pagination?.total}
              onPageChange={(page, perPage) => {
                setPage(page);
                setPerPage(perPage);
              }}
            />
          </div>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Thumbnail
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Độ dài
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Ngày tạo
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Trạng thái
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {isLoading}
            {videos?.data?.map((video, index) => (
              <TableRow key={randomKeyProp(video?.uid)} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <img
                        src={video?.thumbnail}
                        className="h-[50px] w-[50px] object-cover"
                        alt={video?.meta?.name}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {video?.meta?.name}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {convertDuration(video?.duration)}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {formatSize(video?.size)}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {formatDate(video?.created)}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      {
                        queued: 'warning',
                        encoding: 'warning',
                        ready: 'success',
                        errored: 'error',
                      }[video?.status?.state] || 'secondary'
                    }
                  >
                    {video?.status?.state}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="relative inline-block">
                    <button className="dropdown-toggle" onClick={() => closeDropdown(index)}>
                      <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                    </button>
                    <Dropdown
                      isOpen={isOpen === index}
                      onClose={() => closeDropdown(index)}
                      className="w-40 p-2"
                    >
                      <DropdownItem
                        onItemClick={() => closeDropdown(index)}
                        className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                      >
                        View More
                      </DropdownItem>
                      <DropdownItem
                        onItemClick={() => closeDropdown(index)}
                        className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                      >
                        Delete
                      </DropdownItem>
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

import EcommerceMetrics from '../../components/ecommerce/EcommerceMetrics';
import MonthlySalesChart from '../../components/ecommerce/MonthlySalesChart';
import MonthlyTarget from '../../components/ecommerce/MonthlyTarget';
import ListVideos from '../../components/ecommerce/ListVideos';
import PageMeta from '../../components/common/PageMeta';
import RecentVideoCards from '../../components/ecommerce/RecentVideoCards';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UploadVideo from '../../components/common/UploadVideo';
import React from 'react';

export default function Home() {
  const [modalUpload, setModalUpload] = React.useState(false);
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12 xl:col-span-12">
          <RecentVideoCards />
        </div>

        <div className="col-span-12 xl:col-span-12">
          <ListVideos />
        </div>
        <div className="fixed z-[99999] bottom-2 right-2 md:bottom-6 md:right-6">
          <Fab
            size="medium"
            color="primary"
            aria-label="add"
            onClick={() => setModalUpload(!modalUpload)}
          >
            <AddIcon />
          </Fab>
        </div>
      </div>
      <UploadVideo openModal={modalUpload} setOpenModal={() => setModalUpload(!modalUpload)} />
    </>
  );
}

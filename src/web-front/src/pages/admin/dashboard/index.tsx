import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import AdminLayout from '../../../layouts/AdminLayout';
import CardItem from './CardItem';
import { path } from '../../../routes/Path';
import { FaBookReader } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import UserChart from '../../../components/UserChart';
import { SlBookOpen } from 'react-icons/sl';
// import { Helmet } from 'react-helmet-async';
const dailyUserData = [
   { date: '2023-11-01', totalUsers: 150, paidUsers: 50 },
   { date: '2023-11-02', totalUsers: 175, paidUsers: 60 },
   { date: '2023-11-03', totalUsers: 200, paidUsers: 70 },
   { date: '2023-11-04', totalUsers: 190, paidUsers: 65 },
   { date: '2023-11-05', totalUsers: 220, paidUsers: 80 },
   { date: '2023-11-06', totalUsers: 240, paidUsers: 90 },
   { date: '2023-11-07', totalUsers: 230, paidUsers: 85 },
 ];
function Dashboard() {
   return (
      <AdminLayout>
         <div className="w-full  p-4">
            <Breadcrumbs>
               <BreadcrumbItem>Quản trị</BreadcrumbItem>
               <BreadcrumbItem>Quản lý</BreadcrumbItem>
            </Breadcrumbs>
            <div className="mt-10 h-2/3 w-10/12">
               <UserChart data={dailyUserData} />
            </div>
            <div className="mt-5 ml-32 flex justify-start items-center gap-10">
               <CardItem
                  title="Khóa học"
                  icon={<FaBookReader className="text-3xl" />}
                  number={200}
                  path={path.ADMIN.COURSE}
                  description={'Quản lý khóa học của bạn...'}
                  subtitle="Thêm 1 khóa học mỗi tháng"
               />
               <CardItem
                  title="Người dùng"
                  icon={<FaUserShield  className="text-3xl" />}
                  number={200}
                  path={path.ADMIN.USER}
                  description={'Quản trị người dùng...'}
                  subtitle=" Tăng 12 người dùng mỗi tháng"
               />
               <CardItem
                  title="Bài viết"
                  icon={<SlBookOpen className="text-3xl" />}
                  number={200}
                  path={path.ADMIN.POST}
                  description={'Quản lý bài viết, duyệt, xóa...'}
                  subtitle="Thêm 12 bài viết mỗi tháng"
               />
               
            </div>
         </div>
         </AdminLayout>
   );
}

export default Dashboard;

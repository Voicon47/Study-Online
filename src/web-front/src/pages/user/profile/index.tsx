import { Card, Image, Link, User } from '@nextui-org/react';
import UploadImg from '../../../components/UploadImg';
import { IoMdPerson } from 'react-icons/io';
import CourseJoined from './CourseJoined';
import { useAuth } from '../../../context/authContext';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { IUserCourse } from '../../../model/Course.model';
import { getUserCourseByUser } from '../service';
import { Helmet } from 'react-helmet-async';

function Profile() {
   const [userCourses, setUserCourses] = useState<IUserCourse[]>([]);
   const { user } = useAuth();

   useEffect(() => {
      const initUserCourseByUser = async () => {
         if (!user?.id) return;
         const res = await getUserCourseByUser(user?.id);
         setUserCourses(res);
      };

      initUserCourseByUser();
   }, [user]);

   return (
      <div className="w-full">
         {/* <Helmet>
            <title>Trang cá nhân của bạn</title>
         </Helmet> */}
         <div className="w-full  relative flex rounded-b-xl justify-center items-center">
            <Image
               className="m-auto bg-contain h-[20rem] w-full"
               alt="Code"
               src="https://firebasestorage.googleapis.com/v0/b/stydyonline-1ace6.appspot.com/o/images%2Fbooks-knowledge-study-education-word-graphic.jpg?alt=media&token=00fe9b34-8c35-45b1-96e4-2d54b295a089"
            ></Image>

            <div className="absolute bottom-3 right-3">
               <UploadImg
                  onResult={function (res: string): void {
                     console.log(res);
                  }}
               />
            </div>
            <Card className=" scale-150 absolute left-[5%] -bottom-[10%] p-2 pl-4 pr-4">
               <User
                  name="Elephant"
                  description={
                     <Link href={user?.avatar} size="sm" className='text-cyan-50' isExternal>
                        @{user?.email}
                     </Link>
                  }
                  avatarProps={{
                     src: user?.avatar,
                  }}
               />
            </Card>
         </div>

         <div className="flex mt-20 justify-between items-start gap-10">
            <Card className="p-4 w-full flex flex-col gap-4">
               <div>
                  <h5 className=" font-extrabold">Giới thiệu</h5>
                  <div className="flex justify-start items-center gap-4 mt-2">
                     <IoMdPerson className="" />
                     <h5 className=" ">
                        Đã tham gia từ ngày 18/11/2024
                     </h5>
                  </div>
               </div>

               <div>
                  <h5 className=" font-extrabold">Hoạt động gần đây</h5>
                  <div className="flex justify-start items-center gap-4 mt-2">
                     <IoMdPerson className="" />
                     <h5 className=" ">Chưa có hoạt động nào gần đây</h5>
                  </div>
               </div>
            </Card>

            <div className="flex flex-col gap-8 w-full">
               <h5 className=" font-extrabold">Các khóa học đã tham gia</h5>
               {userCourses.map((userCourse, index) => (
                  <CourseJoined key={index} data={userCourse} />
               ))}
            </div>
         </div>
      </div>
   );
}

export default Profile;

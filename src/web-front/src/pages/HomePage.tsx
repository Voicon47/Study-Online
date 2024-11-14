import { Link, Skeleton } from "@nextui-org/react";
import { useState, useEffect } from "react";
import BannerSlide from "../components/BannerSlide";
import { IHomeResponse } from "../model/Common.model";
import CourseItem from "../components/CourseItem";
import instance from "../axiosClient";
import { useAuth } from "../context/authContext";
import {Divider} from "@nextui-org/react";



const fetchData_1 = async (): Promise<IHomeResponse | null> => {
    try {
       const response = await fetch('https://localhost:7049/api/home');
       if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
       }
       const data: IHomeResponse = await response.json();
       return data;
    } catch (error) {
       console.error('Error fetching data:', error);
       return null;
    }
 };
 const fetchData = async (): Promise<IHomeResponse | null> => {
   try {
      const response = await instance.get<IHomeResponse>('/home');
      //console.log(response.data);
      return response.data;
   } catch (error) {
      console.error('Error fetching data:', error);
      return null;
   }
};
 function HomePage(){
    const [homeData, setHomeData] = useState<IHomeResponse | null>();
//    const loading = useLoading();

   const { isAuthenticated } = useAuth();

   // init data
   useEffect(() => {
      const getCourse = async () => {
        //  loading.startLoading();
         const data = await fetchData();
         //console.log(data)
        //  loading.stopLoading();
         if (data === null) return;
         setHomeData(data);
      };
      getCourse();
   }, []);

   console.log(homeData);

//    return loading.isLoading ? (
//       <Skeleton />
//    ) : (
   return(
      <>
         {/* <Helmet>
            <title>Khóa học trực tuyến - Học trên mọi lĩnh vực</title>
            <meta
               name="description"
               content="Khóa học trực tuyến cung cấp những khóa học chất lượng trên mọi lĩnh vực từ lập trình, kinh doanh đến nghệ thuật."
            />
            <meta
               name="keywords"
               content="khóa học trực tuyến, học trực tuyến, khóa học online, lập trình, kinh doanh, nghệ thuật"
            />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href="https://www.example.com/" />
            <meta property="og:title" content="Khóa học trực tuyến - Học trên mọi lĩnh vực" />
            <meta
               property="og:description"
               content="Khóa học trực tuyến cung cấp những khóa học chất lượng trên mọi lĩnh vực từ lập trình, kinh doanh đến nghệ thuật."
            />
            <meta property="og:image" content="https://www.example.com/og-image.jpg" />
            <meta property="og:url" content="https://www.example.com/" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Khóa học trực tuyến - Học trên mọi lĩnh vực" />
            <meta
               name="twitter:description"
               content="Khóa học trực tuyến cung cấp những khóa học chất lượng trên mọi lĩnh vực từ lập trình, kinh doanh đến nghệ thuật."
            />
            <meta name="twitter:image" content="https://www.example.com/twitter-image.jpg" />
         </Helmet>
         {!isAuthenticated && <LoginTap />} */}
         <div className="max-w-screen-xl mt-5 mb-10 m-auto">{homeData?.banners && <BannerSlide data={homeData?.banners} />}</div>
         <div className="max-w-screen-xl mt-5 m-auto ">
            {/* <ListTag /> */}
            {homeData &&
               homeData.courseRes.map((cour, index) => {
                  return (
                     <div className="w-full" key={index}>
                        <div className="flex mt-5 justify-between w-full items-center  ">
                           <div className="flex justify-start items-center gap-4">
                              <h5 className="font-extrabold text-2xl">{cour.categoryCourse.categoryName}</h5>
                           </div>
                           <Link href="#" className="underline font-extrabold text-black dark:text-white ">
                              Xem tất cả
                           </Link>
                           
                        </div>
                        <h5 className="text-white/2  mb-5">380.506+ người khác đã học</h5>
                        <Divider className="my-"/>
                        <div className="grid grid-cols-3 gap-10">
                           {cour.courses.map((c, index) => (
                              <CourseItem key={index} data={c} />
                           ))}
                        </div>
                     </div>
                  );
               })}
         </div>
      </>
   );
 }
 export default HomePage;
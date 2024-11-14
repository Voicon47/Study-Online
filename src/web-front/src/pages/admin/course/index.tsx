import { Breadcrumbs, BreadcrumbItem, Pagination } from '@nextui-org/react';
import { path } from '../../../routes/Path';
import AdminLayout from '../../../layouts/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FilterBarCourse from './FilterBarCourse';
import Table from './Table';
import { ICourse, IStatusCourse } from '../../../model/Course.model';
import { IPaginationClientData, IPaginationResponseDto } from '../../../assets/data/PaginatedResponse.dto';
import { ICourseQueryDto } from '../../../assets/data/CourseQuery.Dto';
import { IPaginationRequestDto } from '../../../assets/data/PaginationRequest.Dto';
import instance from '../../../axiosClient';
// import { Helmet } from 'react-helmet-async';

export type IFilterCourse = {
   categoryId?: number | string | null;
   status?: IStatusCourse | string | null;
   query?: string | null;
};

const getAllCourse = async (
   queryData: IPaginationRequestDto<ICourseQueryDto>,
): Promise<IPaginationResponseDto<ICourse> | null> => {
   try {
      const response = await fetch(import.meta.env.VITE_URL_API + 'course/pagination', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(queryData),
      });

      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData: IPaginationResponseDto<ICourse> = await response.json();
      //console.log(responseData)
      return responseData;
   } catch (error) {
      console.error('Error during registration:', error);
      return null;
   }
};

const countTotalCourse = async (queryData: ICourseQueryDto): Promise<number> => {
   try {
      const response = await fetch(import.meta.env.VITE_URL_API + 'course/count', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(queryData),
      });

      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData: number = await response.json();
      return responseData;
   } catch (error) {
      console.error('Error during registration:', error);
      return 0;
   }
};

function CourseManagement() {
   const history = useNavigate();
   const [data, setData] = useState<ICourse[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [paginationData, setPaginationData] = useState<IPaginationClientData>({
      totalPages: -1,
      size: 5,
      currentPage: 1,
   });

   const [filterData, setFilterData] = useState<IFilterCourse>({
      categoryId: null,
      status: null,
      query: null,
   });

   const handleChangePage = async (page: number) => {
      const queryData: IPaginationRequestDto<ICourseQueryDto> = {
         where: filterData,
         pageNumber: page,
         pageSize: paginationData.size,
      };
      setPaginationData((prev) => {
         return {
            ...prev,
            currentPage: page,
         };
      });
      setIsLoading(true);
      const res = await getAllCourse(queryData);
      // console.log("After change "+res)
      setIsLoading(false);
      res && setData(res.data);
   };
   // console.log(paginationData)
   const getTotalCourse = async () => {
      const queryData: ICourseQueryDto = {
         ...filterData,
      };
      // console.log("Get Total Course 1")
      // console.log(queryData)
      const totalCourse = await countTotalCourse(queryData);
      
      setPaginationData((prev) => {
         return {
            ...prev,
            totalPages: Math.ceil(+totalCourse / paginationData.size),
            isHasNextPage: totalCourse > paginationData.size,
         };
      });
   };
   //Initial value once reload page 
   useEffect(() => {
      // console.log("UseEffect 1")
      const initData = async () => {
         setIsLoading(true);
         await getTotalCourse();
         const queryData: IPaginationRequestDto<ICourseQueryDto> = {
            where: {},
            pageNumber: 1,
            pageSize: paginationData.size,
         };
         const res = await getAllCourse(queryData);
         console.log(res)
         setIsLoading(false);
         res && setData(res.data);
      };

      initData();
   }, []);
   /// update data base on onChange
   useEffect(() => {
      console.log("UseEffect 2")
      const filterData = async () => {
         await getTotalCourse();
         await handleChangePage(1);
      };
      setIsLoading(true);
      const queryTimeout = setTimeout(() => {
         filterData();
         setIsLoading(false);
      }, 1000);

      return () => {
         clearTimeout(queryTimeout);
      };
   }, [filterData]);

   return (
      <AdminLayout>
         {/* <Helmet>
            <title>Quản trị khóa học</title>
         </Helmet> */}
         <div className="w-full  p-4">
            <Breadcrumbs>
               <BreadcrumbItem onClick={() => history(path.ADMIN.COURSE)}>Quản trị</BreadcrumbItem>
               <BreadcrumbItem>Quản lý</BreadcrumbItem>
               <BreadcrumbItem>Khóa học</BreadcrumbItem>
            </Breadcrumbs>

            <FilterBarCourse onChange={(res: IFilterCourse) => setFilterData(res)} />
            <div className="pt-5">
               <Table data={data} isLoading={isLoading} />
            </div>
            {data.length > 0 && (
               <div className="p-4 mt-5 rounded-xl  flex justify-end items-center ">
                  <Pagination
                     total={paginationData.totalPages}
                     page={1}
                     initialPage={1}
                     showControls
                     loop
                     onChange={async (page) => await handleChangePage(page)}
                  />
               </div>
            )}
         </div>
      </AdminLayout>
   );
}

export default CourseManagement;

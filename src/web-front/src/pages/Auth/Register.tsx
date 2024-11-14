import { Breadcrumbs, BreadcrumbItem, Image, Button, Link, Input } from '@nextui-org/react';
import logo from '../../assets/img/logo.png';
// import { path } from '../../enum/path';
import { MdOutlineEmail } from 'react-icons/md';
import { TbPassword } from 'react-icons/tb';
import { useForm, SubmitHandler } from 'react-hook-form';
// import helper from '../../helper';
import toast from 'react-hot-toast';
import { IResponse } from '../../model/Common.model';
import { IUser } from '../../model/User.model';
// import { useLoading } from '../../context/loadingContext';
import { useAuth } from '../../context/authContext';
import { useEffect } from 'react';
import { useRouter } from '../../hook';
import axios from 'axios';
import instance from '../../axiosClient';
import { path } from '../../routes/Path';
import helper from '../../helper';
import { useLoading } from '../../context/loadingContext';
// import { Helmet } from 'react-helmet-async';

const registerFetch1 = async (userData: { email: string; password: string }): Promise<IResponse<IUser, IUser>> => {
   try {
      const response = await fetch('https://localhost:7005/api/auth/register', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(userData),
      });

      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData: IResponse<IUser, IUser> = await response.json();
      return responseData;
   } catch (error) {
      console.error('Error during registration:', error);
      throw error; // You might want to handle or log the error differently
   }
};
const registerFetch = async(userData: { email: string; password: string }): Promise<IResponse<IUser, IUser>> => {
   try {
       const response = await instance.post<IResponse<IUser, IUser>>('/auth/register',userData)
       return response.data;
   }catch(error){
      console.error('Error during registration:', error);
      throw error; // You might want to handle or log the error differently
   }
}

type Inputs = {
   email: string;
   password: string;
   confirmPassword: string;
};

function Register() {
   const loading = useLoading();
   const router = useRouter();
   const { isAuthenticated } = useAuth();
   const { register, handleSubmit, watch } = useForm<Inputs>();

   const onSubmit: SubmitHandler<Inputs> = async (data) => {
      
      if (validateEmail(data.email)) {
         toast.error('Email không hợp lệ!');
         return;
      } else if (!data.password) {
         toast.error('Vui lòng nhập mật khẩu!');
         return;
      } else if (!validateAgeConfirmation(data.confirmPassword)) {
         toast.error('Xác nhận mật khẩu không khớp!');
         return;
      }
      const registerUser = {
         email: data.email,
         password: data.password,
      };
      loading.startLoading();
      const response = await registerFetch(registerUser);
      console.log(response);
      loading.stopLoading();

      if (response.status === 200) {
         toast.success(response.message);
         data.email = '';
         data.password = '';
         data.confirmPassword = '';
         router.push(path.AUTH.LOGIN);
      } else {
         toast.error(response.message);
      }
   };

   const validateAgeConfirmation = (value: string) => {
      if (value !== watch('password')) {
         return false;
      }
      return true;
   };
   const validateEmail = (value: string) => {
      if (helper.isValidEmail(value)) {
         return false;
      }
      return true;
   };

   useEffect(() => {
      if (isAuthenticated) {
         router.push(path.HOME);
      }
   }, [isAuthenticated]);

   return (
      <div className="max-w-2xl m-auto mt-5 select-none">
         {/* <Helmet>
            <title>Đăng ký tài khoản mới</title>
         </Helmet> */}

         <Breadcrumbs isDisabled>
            <BreadcrumbItem>Trang chủ</BreadcrumbItem>
            <BreadcrumbItem>Đăng ký</BreadcrumbItem>
         </Breadcrumbs>

         <div className="flex flex-col gap-4 p-10 mt-5 rounded-lg border-solid border-second border-[1px] ">
            {/* <div className="flex justify-start items-center gap-10 ">
               <Image className="" isBlurred width={50} src={logo} alt="NextUI Album Cover" />
               <h5 className="font-semibold">Đăng ký tài khoản để tiếp tục với nhiều khóa học hấp dẫn</h5>
            </div> */}

            <div className="flex flex-col gap-6 justify-center items-center">
               <h5 className="font-extrabold text-2xl">Đăng ký tài khoản</h5>
               <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                  <Input
                     {...register('email')}
                     startContent={<MdOutlineEmail className="text-xl" />}
                     type="text"
                     label="Email của bạn"
                     labelPlacement={'outside'}
                     placeholder="Nhập email của bạn..."
                  />
                  <Input
                     {...register('password')}
                     startContent={<TbPassword className="text-xl" />}
                     type="password"
                     label="Mật khẩu"
                     labelPlacement={'outside'}
                     placeholder="Nhập mật khẩu của bạn..."
                  />
                  <Input
                     {...register('confirmPassword')}
                     startContent={<TbPassword className="text-xl" />}
                     type="password"
                     label="Nhập lại mật khẩu"
                     labelPlacement={'outside'}
                     placeholder="Nhập lại mật khẩu của bạn..."
                  />
                  <h5 className="w-full text-sm">
                     <span className="text-primary">Gợi ý:</span> Mật khẩu ít nhất 6 ký tự,..
                  </h5>
                  <Button color="primary" type="submit">
                     Đăng ký
                  </Button>
               </form>

               <span>
                  Bạn đã có tài khoản?
                  <Link href={path.AUTH.LOGIN} className="text-primary ml-2">
                     Đăng nhập
                  </Link>
               </span>
               <span className="text-center text-sm">
                  Việc bạn tiếp tục sử dụng trang web, đồng nghĩa bạn đồng ý với
                  <Link href={path.AUTH.REGISTER} className="underline text-gray-500 ml-2 mr-2">
                     điều khoản sử dụng
                  </Link>
                  của chúng tôi
               </span>
            </div>
         </div>
      </div>
   );
}

export default Register;

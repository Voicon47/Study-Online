import {ReactNode} from "react";
import Login from "../pages/Auth/Login";
import { path } from "./Path";
import { RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import Register from "../pages/Auth/Register";
import Learning from "../pages/course/Learning";
import SummaryCourse from "../pages/course/Summary";
import CreatePost from "../pages/post/create";
import Dashboard from "../pages/admin/dashboard";
import Course from "../pages/admin/course/manager-category";
import CourseManagement from "../pages/admin/course";
import AddCourse from "../pages/admin/course/add";
import AddCourseDetail from "../pages/admin/course/add/add-course-detail";
import ManagerCategory from "../pages/admin/course/manager-category";
import AddPost from "../pages/admin/post/add";
import PostManagement from "../pages/admin/post";
import UserManagement from "../pages/admin/user";
import { ProfilePage, SettingPage } from "../pages/user";
import UserManagerPost from "../pages/user/manager-post";



export type routeProps = {
    path: string;
    component: ReactNode;
    type: typeRoute;
 };
 
 export enum typeRoute {
    PRIVATE_ROUTE = 'private_route',
    PROTECTED_ROUTE = 'protected_route',
    PUBLIC_ROUTE = 'public_route',
 }

export const publicRoutes: routeProps[] = [
   // {
   //    path: '/test',
   //    component: <TestPage />,
   //    type: typeRoute.PUBLIC_ROUTE,
   // },
   // {
   //    path: path.AUTH.VERIFY_ACCOUNT,
   //    component: <VerifyAccount />,
   //    type: typeRoute.PUBLIC_ROUTE,
   // },
   // {
   //    path: path.AUTH.RESET_PASSWORD,
   //    component: <RecoveryPassword />,
   //    type: typeRoute.PUBLIC_ROUTE,
   // },
   {
      path: path.HOME,
      component: <HomePage />,
      type: typeRoute.PUBLIC_ROUTE,
   },
   {
      path: path.AUTH.LOGIN,
      component: <Login />,
      type: typeRoute.PUBLIC_ROUTE,
   },
   {
      path: path.AUTH.REGISTER,
      component: <Register />,
      type: typeRoute.PUBLIC_ROUTE,
   },
   // {
   //    path: path.POST.DETAIL + '/:postId',
   //    component: <DetailPost />,
   //    type: typeRoute.PUBLIC_ROUTE,
   // },
];
export const protectedRoutes: routeProps[] = [
   {
      path: path.ADMIN.DASHBOARD,
      component: <Dashboard />,
      type: typeRoute.PROTECTED_ROUTE,
   },
   {
      path: path.ADMIN.COURSE,
      component: <CourseManagement />,
      type: typeRoute.PROTECTED_ROUTE,
   },
   {
      path: path.ADMIN.ADD_COURSE,
      component: <AddCourse />,
      type: typeRoute.PROTECTED_ROUTE,
   },
   {
      path: path.ADMIN.DETAIL_COURSE + ':id',
      component: <AddCourseDetail />,
      type: typeRoute.PROTECTED_ROUTE,
   },
   {
      path: path.ADMIN.USER,
      component: <UserManagement />,
      type: typeRoute.PROTECTED_ROUTE,
   },
   {
      path: path.ADMIN.MANAGER_COURSE_CATEGORY,
      component: <ManagerCategory />,
      type: typeRoute.PROTECTED_ROUTE,
   },
   // {
   //    path: path.ADMIN.POST,
   //    component: <PostManagement />,
   //    type: typeRoute.PROTECTED_ROUTE,
   // },
   // {
   //    path: path.ADMIN.POST + '/add',
   //    component: <AddPost />,
   //    type: typeRoute.PROTECTED_ROUTE,
   // },
   
];
export const privateRoutes: routeProps[] = [
   {
      path: path.COURSE.SUMMARY + '/:courseId',
      component: <SummaryCourse />,
      type: typeRoute.PRIVATE_ROUTE,
   },
   {
      path: path.POST.CREATE,
      component: <CreatePost />,
      type: typeRoute.PRIVATE_ROUTE,
   },
   // {
   //    path: path.POST.VIEW,
   //    component: <ViewPost />,
   //    type: typeRoute.PRIVATE_ROUTE,
   // },
   {
      path: path.USER.MANAGER_POST,
      component: <UserManagerPost />,
      type: typeRoute.PRIVATE_ROUTE,
   },
   {
      path: path.USER.PROFILE,
      component: <ProfilePage />,
      type: typeRoute.PRIVATE_ROUTE,
   },
   {
      path: path.USER.SETTING,
      component: <SettingPage />,
      type: typeRoute.PRIVATE_ROUTE,
   },
   // {
   //    path: path.COURSE.PAYMENT_NOTIFICATION,
   //    component: <PaymentNotification />,
   //    type: typeRoute.PRIVATE_ROUTE,
   // },
];

export const learningRoutes: routeProps[] = [
   {
      path: path.COURSE.LEARNING + '/:courseId',
      component: <Learning />,
      type: typeRoute.PRIVATE_ROUTE,
   },
];

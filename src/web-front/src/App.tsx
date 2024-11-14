import { createBrowserRouter, Navigate, Outlet, Route, RouteObject, RouterProvider, Routes,useLocation  } from 'react-router-dom';
import { learningRoutes, privateRoutes, protectedRoutes, publicRoutes } from './routes/Routes'
// import { useState } from 'react'
import { ReactNode, useEffect } from 'react';
// import Login from './pages/Auth/Login';
import { useAuth } from './context/authContext';
import { useTheme } from './context/themeContext';
import { Toaster } from 'react-hot-toast';
import MainLayout from './layouts/MainLayout';
import { path } from './routes/Path';
import AdminLayout from './layouts/AdminLayout';

export enum Roles {
  ADMIN,
  STUDENT,
}

export default function App() {
  const { isAuthenticated, role } = useAuth();

  // const isAllowed = typeRole.ADMIN === typeRole.ADMIN && isAuthenticated;
  const { theme } = useTheme();

  useEffect(() => {
     theme && localStorage.setItem('theme', theme);
   //   console.log(theme)
  }, [theme]);
  return (
     <>
        <Toaster
           position="top-center"
           containerStyle={{
              zIndex: 1000000000000,
           }}
           toastOptions={{
              style: {
                 background: theme ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.5)',
                 color: theme ? 'white' : 'black',
                 backdropFilter: 'blur(20rem)',
                 userSelect: 'none',
              },
           }}
        />
        <Routes>
           {/* Public Routes */}
           {publicRoutes.map((route, index) => (
              <Route
                 key={index}
                 path={route.path}
                 element={
                    role === Roles.ADMIN ? (
                       <Navigate to={'/' + path.ADMIN.DASHBOARD} />
                    ) : (
                       <MainLayout isAuthenticated={isAuthenticated}>{route.component}</MainLayout>
                    )
                 }
              />
           ))}

           {/* Private Routes */}
           {privateRoutes.map((route, index) => (
              <Route
                 key={index}
                 path={route.path}
                 element={
                    role === Roles.ADMIN ? (
                       <Navigate to={'/' + path.ADMIN.DASHBOARD} />
                    ) : (
                       <MainLayout roles={[Roles.STUDENT]} isAuthenticated={isAuthenticated}>
                          {route.component}
                       </MainLayout>
                    )
                 }
              />
           ))}

           {/* learning routes */}
           {learningRoutes.map((route, index) => (
              <Route
                 key={index}
                 path={route.path}
                 element={role === Roles.ADMIN ? <Navigate to={path.ADMIN.DASHBOARD} /> : route.component}
              />
           ))}

           {/* Protected Routes */}
           {protectedRoutes.map((route, index) => (
              <Route
                 key={index}
                 path={route.path}
                 element={role === Roles.ADMIN ? route.component : <Navigate to={'/' + path.AUTH.LOGIN} />}
               // element={
               //    role === Roles.ADMIN ? (
               //       <AdminLayout >
               //          {route.component}
               //       </AdminLayout>
                     
               //    ) : (
               //       <Navigate to={'/' + path.AUTH.LOGIN} />
               //    )
               // }
              />
           ))}
        </Routes>
     </>
  );
}


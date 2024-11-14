import { Button, Image } from '@nextui-org/react';
import logo from '../assets/img/logo_1.png';
import { IoBookOutline } from 'react-icons/io5';
import { GoBell } from 'react-icons/go';
import { PiCloudMoonThin, PiSunLight } from 'react-icons/pi';
import { useRouter } from '../hook';
import Search from '../components/Search';
import UserInfo from '../components/UserInfo';
import { path } from '../routes/Path';
import { useAuth } from '../context/authContext';
import { useTheme } from '../context/themeContext';
function Header() {
   const router = useRouter();
   const { toggleTheme } = useTheme();

   const { isAuthenticated } = useAuth();
   return (
      <header className="select-none h-20 border-b-[1px] border-solid dark:border-gray-900 backdrop-blur-2xl fixed z-[100000] left-0 top-0 right-0 flex justify-between items-center p-4">
         <div
            onClick={() => {
               router.push('');
            }}
            className="cursor-pointer select-none flex justify-start items-center gap-10 w-1/3"
         >
            <Image className="m-5" width={80} radius='none' src={logo} alt="Study Online" />
            <h5 className="font-semibold">One For All</h5>
         </div>
         <Search />
         <div className="w-1/3 flex justify-end items-center gap-4">
            <Button
               className="bg-transparent hover:text-primary"
               onClick={toggleTheme}
               isIconOnly
               startContent={<PiSunLight className="text-xl hover:text-primary cursor-pointer" />}
            ></Button>
            {/* <PiCloudMoonThin /> */}
            {isAuthenticated ? (
               <>
                  <GoBell className="text-xl hover:text-primary cursor-pointer" />
                  <UserInfo />
               </>
            ) : (
               <Button color="primary" onClick={() => router.push(path.AUTH.LOGIN)}>
                  Đăng nhập
               </Button>
            )}
         </div>
      </header>
   );
}

export default Header;

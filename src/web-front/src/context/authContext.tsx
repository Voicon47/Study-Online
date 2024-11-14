import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { IUser } from '../model/User.model';
import helper from '../helper';
import { Roles } from '../App';
import { IToken } from '../model/Token.model';
import { User } from '@nextui-org/react';
import Cookies from 'js-cookie'; // Ensure js-cookie is installed
interface AuthContextProps {
   children: ReactNode;
}

interface AuthContextValue {
   user: IUser | null;
   isAuthenticated: boolean;
   login: (user: IUser, token: IToken) => void;
   logout: () => void;
   role: Roles | null;
   onUpdateUser: (user: IUser) => void;
}

export enum typeTheme {
   DARK_MODE = 'dark',
   LIGHT_MODE = 'light',
}
const getInitialRole = (): Roles | null => {
   const cookieRole = Cookies.get('userRole');
   // console.log("Cokkie "+cookieRole)
   switch (cookieRole) {
      case "0":
         return Roles.ADMIN;
      case "1":
         return Roles.STUDENT;
      default:
         return Roles.STUDENT; // Default to STUDENT or null, as preferred
   }
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState<any>(null);
   const [user, setUser] = useState<IUser | null>(null);
   const [role, setRole] = useState<Roles | null>(getInitialRole());
   // console.log("After "+role)
   const login = (user: IUser, token: IToken) => {
      setIsAuthenticated(true);
      setUser(user);
      if (user.role !== null && user.role !== undefined) {
         // setRole(user.role === 0 ? Roles.ADMIN : Roles.STUDENT)
         const userRole = user.role === 0 ? Roles.ADMIN : Roles.STUDENT;
         setRole(userRole);
         Cookies.set('userRole', userRole.toString(), { expires: 7 });
      }
      helper.login(token);
      helper.saveUserData(user);
   }; 
   const logout = () => {
      helper.logout();
      setIsAuthenticated(false);
      setUser(null);
      setRole(null);
      
   };
   
   const onUpdateUser = (user: IUser) => {
      helper.saveUserData(user);
      setUser(user);
   };
   // console.log("First")
   useEffect(() => {
      const accessToken = helper.getFullToken();
      const isAuth = accessToken !== null;
      setIsAuthenticated(isAuth);
      const user = helper.getUserData();
      user && accessToken && login(user, accessToken);
      // console.log("Auth:"+isAuth)
   }, []);
   return (
      <AuthContext.Provider value={{ isAuthenticated, user, login, logout, role, onUpdateUser }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   const context = useContext(AuthContext);
   // console.log(context?.role)
   if (!context) {
      throw new Error('useAuth must be used within a AuthProvider');
   }
   return context;
};

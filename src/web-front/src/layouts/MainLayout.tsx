import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { Roles } from "../App";
type MainLayoutProps = {
    children: React.ReactNode;
    isAuthenticated: boolean;
    roles?: Roles[];
 };
 
 function MainLayout(props: MainLayoutProps) {
    return (
        <div className="overflow-hidden max-w-screen min-h-screen select-none">
            <Header/>
            <div className="flex pt-20 gap-2 justify-start items-start w-full overflow-hidden pb-32">
                <div className="w-screen max-w-screen-2xl m-auto">{props.children}</div>
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;
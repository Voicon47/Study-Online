import Sidebar from './Sidebar';
import Header from './header';
type AdminLayoutProps = {
    children: React.ReactNode;
};
function AdminLayout(props: AdminLayoutProps) {
    return (
        <div className="max-w-screen flex  justify-between m-auto min-h-screen select-none">
            
            <div className="min-w-[18rem] dark:bg-second-dark bg-light-primary"><Sidebar /></div>
            <div className="w-full dark:bg-second-dark bg-light-primary">
                <Header />
                <div
                    style={{}}
                    className=" w-full relative overflow-hidden dark:bg-second-dark bg-light-primary "
                >
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;

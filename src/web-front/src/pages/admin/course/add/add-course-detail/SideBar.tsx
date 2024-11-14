
import { MdOutlineSettingsApplications } from "react-icons/md";
import { HiClipboardDocumentList } from "react-icons/hi2";
type SidebarProps = {
    active: number | 0;
    onChangeSidebar: (key: number) => void;
};
function Sidebar(props: SidebarProps) {
    const tabs = [
        {
            name: 'Danh sách nhóm bài học',
            icon: <HiClipboardDocumentList  className="text-xl" />,
            key: 1,
        },
        {
            name: 'Cài đặt của khóa học',
            icon: <MdOutlineSettingsApplications className="text-xl" />,
            key: 2,
        },
    ];

    return (
        <div className="w-fit pt-4 pb-4 h-full ">
            {tabs.map((tab) => (
                <div
                    onClick={() => props.onChangeSidebar(tab.key)}
                    className={`p-6 w-fit ${
                        props.active === tab.key && 'bg-primary/10'
                    }  hover:text-primary relative cursor-pointer  `}
                    key={tab.key}
                >
                    {tab.icon}
                    {props.active === tab.key && (
                        <div className="absolute right-0 h-[80%] bg-primary w-[4px] rounded-l-lg top-[10%]"></div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Sidebar;

import { Chip,Image } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "../../hook";
import { useAuth } from "../../context/authContext";
import { ILesson, IVideoLesson } from "../../model/Course.model";

type VideoItemProps = {
    data: ILesson
    isClick:() => void
    
 };
 function VideoItem(props: VideoItemProps) {
    const router = useRouter();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    
    
    return (
        <div onClick={props.isClick} className="flex flex-row gap-x-4 p-2 rounded-2xl hover:bg-slate-400/15 hover:shadow-md">
            {/* <img className="size-28 p-4 flex-none rounded-lg bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/> */}
            <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={props.data.imgUrl}
                width={200}

            />
            <div className="min-w-0 flex-auto ">
                <p className="text-xl font-semibold ">{props.data.title}</p>
                <p className="mt-1 truncate text-sm text-gray-500">{props.data.description}</p>
            </div>
            <div className='flex-none pr-5'>
                <Chip
                    className="capitalize"
                    color={props.data.status != true ? 'danger' : 'success'}
                    size="lg"
                    variant="flat"
                >
                    { props.data.status != true ? 'Chưa học' : 'Đã học'}
                </Chip>
            </div>
        </div>
    );
 }
 
 export default VideoItem;
 
 
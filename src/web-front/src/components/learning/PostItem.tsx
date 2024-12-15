import { ILesson, IPostLesson } from "../../model/Course.model"
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useRouter } from "../../hook";
import { Card, CardBody, CardHeader,Image, Spinner } from "@nextui-org/react";
type PostItemProps ={
    data : ILesson
    isClick: () => void
} 

function PostItem(props: PostItemProps)
{
    const router = useRouter();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Card className="w-full h-[250px] ">
            <CardHeader onClick={props.isClick} className="absolute z-10 top-1 flex-col !items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">{props.data.title}</p>
                <h4 className="text-white font-medium text-large">{props.data.description}</h4>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src={props.data.imgUrl}
            />
        </Card>
    );
}

export default PostItem
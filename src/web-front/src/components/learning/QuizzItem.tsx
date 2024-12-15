import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useRouter } from "../../hook";
import { ILesson, IQuestion } from "../../model/Course.model"
import { Card, CardBody, CardHeader,Image, Spinner } from "@nextui-org/react";

type QuizzItemProps = {
    data : ILesson
    isClick : () => void
}
function QuizzItem(props:QuizzItemProps){
    const router = useRouter();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Card  className="py-4 hover:shadow-md max-w-80">
            <CardHeader onClick={props.isClick} className="pb-0 pt-0 px-4 flex-col items-start">
                <h4 className="font-bold text-large truncate">{props.data.title}</h4>
                <small className="text-default-500 truncate w-64">{props.data.description}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                {isLoading && (
                    <div className="absolute z-30 top-0 bottom-0 right-0 left-0 bg-black/10 backdrop-blur-lg flex justify-center items-center">
                        <Spinner color="primary" />
                    </div>
                )}
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={props.data.imgUrl}
                />
            </CardBody>
        </Card>
        
    );
}
export default QuizzItem
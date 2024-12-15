import { Button } from '@nextui-org/react';
import PostLearning from '../../components/learning/PostLearning';
import QuizLearning from '../../components/learning/QuizLearning';
import VideoLearning from '../../components/learning/VideoLearning';
import { IGroupLesson, ILesson, IQuestion, ITypeLesson, IVideoLesson } from '../../model/Course.model';
import { IoMdClose } from 'react-icons/io';

type ModalLearningProp ={
    onClose: () => void;
    isOpen: boolean;
    type : ITypeLesson
    data : ILesson
}

function ModalLearning(props :ModalLearningProp){
    return (
        props.isOpen && (
            <div
                className="fixed flex justify-center items-start  dark:bg-second-dark bg-second-light top-0 bottom-0 left-0 right-0 "
                style={{
                    zIndex: 100000000000,
                }}
            >
                 <Button
                    onClick={props.onClose}
                    className="absolute top-4 right-4 hover:text-primary"
                    isIconOnly
                    variant="flat"
                    startContent={<IoMdClose className="cursor-pointer text-xl  " />}
                ></Button>
                <div className=" w-full  flex justify-between overflow-hidden">
                    <div className="flex overflow-hidden w-full justify-between ">
                        <div className="w-full " id="step-one">
                            {props.type === ITypeLesson.Quiz && (
                                <QuizLearning data={props.data} />
                            )}
                            {props.type === ITypeLesson.Video && (
                                <VideoLearning data={props.data} />
                            )}
                            {props.type === ITypeLesson.Post && (
                                <PostLearning data={props.data} />
                            )}
                        </div>
                        {/* <VideoLearning /> */}
                        {/* <OutlineLearning
                            currentLesson={userCourse?.currentLesson}
                            onChangeLesson={(res: IUserCourse) => setUserCourse(res)}
                            data={course}
                            lessonPassedList={userCourse.lessonPassed}
                        /> */}
                    </div>
                </div>    
            </div>    
        )
        
    );
}
export default ModalLearning
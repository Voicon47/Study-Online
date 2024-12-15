// import VideoLearning from '../../../components/learning/VideoLearning';
import { useState, useEffect, useCallback } from 'react';
import OutlineLearning from '../../components/learning/OutlineLearning';
import QuizLearning from '../../components/learning/QuizLearning';
import { ICourse, ILesson, IPostLesson, IQuestion, ITypeLesson, IUserCourse, IVideoLesson } from '../../model/Course.model';
import { useParams } from 'react-router-dom';
import LearningLayout from './layout';
import { useAuth } from '../../context/authContext';
import VideoLearning from '../../components/learning/VideoLearning';
import PostLearning from '../../components/learning/PostLearning';
import { Card, CardHeader, Chip, Divider, Progress,Image, CardBody, Spinner } from '@nextui-org/react';
import MainLayout from '../../layouts/MainLayout';
import { Roles } from '../../App';
import { FragmentBlogItemType, IFacebookEmbed, IHeading, IImage, IText, ITextEditor, IYoutubeEmbed } from '../../components/FragmentBlogItem/FragmentBlogItem.type';
import ModalLearning from './ModalLearning';
import VideoItem from '../../components/learning/VideoItem';
import QuizzItem from '../../components/learning/QuizzItem';
import PostItem from '../../components/learning/PostItem';
import { lessons } from './data';
// import { Helmet } from 'react-helmet-async';


type LearningProps = {
   type : ITypeLesson
   data : ILesson
}

function Learning() {
   const { courseId } = useParams();
   const { user } = useAuth();
   const [course, setCourse] = useState<ICourse | null>(null);
   const [userCourse, setUserCourse] = useState<IUserCourse | null>(null);
   const [isOpenLesson,setIsOpenLesson] = useState(false);
   const [isClickLesson,setIsClickLesson] = useState(false);
   const [dataSelected,setDataSelected] = useState<ILesson|null>(null);
   const [typeLesson,setTypeLesson] = useState<ITypeLesson>(ITypeLesson.Video);
   const [isLoading, setIsLoading] = useState(false);
   const [randomPost, setRandomPost] = useState<ILesson[]>([]);
   const [randomVideo, setRandomVideo] = useState<ILesson[]>([]);
   const [randomQuiz, setRandomQuiz] = useState<ILesson[]>([]);


   // Hàm chọn ngẫu nhiên N phần tử từ mảng
   function getRandomLessons(lessons: ILesson[], maxCount: number): ILesson[] {
    // Số lượng bài học ngẫu nhiên (từ 1 đến maxCount hoặc tổng số bài học)
    const randomCount = Math.floor(Math.random() * Math.min(maxCount, lessons.length)) + 1;

    // Trộn ngẫu nhiên các bài học
    const shuffledLessons = lessons.sort(() => 0.5 - Math.random());

    // Lấy ra `randomCount` bài học từ danh sách
    return shuffledLessons.slice(0, randomCount);
   }

   useEffect(() =>{
      const randomPost = getRandomLessons(lessons.filter((lesson) => lesson.type === ITypeLesson.Post), 5)
      const randomVideo = getRandomLessons(lessons.filter((lesson) => lesson.type === ITypeLesson.Video), 5)
      const randomQuiz = getRandomLessons(lessons.filter((lesson) => lesson.type === ITypeLesson.Quiz), 5)
      setRandomPost(randomPost);
      setRandomVideo(randomVideo);
      setRandomQuiz(randomQuiz);

   },[]);
   
   return(
      <>
         {course && (
            <div className="h-screen w-screen flex justify-center items-center">
               <div>
                  Loading....{' '}
                  <Progress size="sm" isIndeterminate aria-label="Loading..." className="max-w-md" color="primary" />
               </div>
            </div>
         )}
         {!course && ( 
         <MainLayout roles={[Roles.STUDENT]} isAuthenticated={true}>
            <div className="pt-10 w-full overflow-hidden pl-14">
               <div className='flex flex-row gap-2'>
                  <div className='flex flex-col gap-2 basis-3/4'>
                  {/* Video */}
                     <div className='flex flex-col gap-2 mb-4'>
                        <h1 className="font-extrabold text-3xl ">Video bài giảng</h1>
                        {randomVideo.filter((lesson) => lesson.type === ITypeLesson.Video)
                                 .map((c,index) => (
                                 <VideoItem 
                                    key={index} 
                                    data={c}
                                    isClick ={function(): void{
                                       setIsOpenLesson(true)
                                       // setTypeLesson(ITypeLesson.Video)
                                       c.status = true;
                                       setDataSelected(c)
                                       console.log("isClick Video")
                                       
                                 }}/>
                        ))}
                     </div>
                     <Divider orientation='horizontal' className='divide-dashed' />
                     {/* Quizzz */}
                     <h1 className='font-extrabold text-3xl'> Câu hỏi ôn tập </h1>
                     <div className='grid grid-cols-3 gap-5'>
                     {randomQuiz.filter((lesson) => lesson.type === ITypeLesson.Quiz)
                                 .map((c,index) => (
                                 <QuizzItem 
                                    key={index} 
                                    data={c}
                                    isClick ={function(): void{
                                       setIsOpenLesson(true)
                                       setDataSelected(c)
                                       console.log("isClick Quizz")
                                       
                                 }}/>
                        ))}
                        {/* <QuizzItem data ={lessons[0]} /> */}
                     </div>
                  </div>
                  <Divider orientation='vertical' className='h-screen' />
                  <div className='flex flex-col gap-2 basis-1/4 px-5'>
                     <h1 className='font-extrabold text-3xl'> Bài Giảng </h1>
                     {randomPost.filter((lesson) => lesson.type === ITypeLesson.Post)
                                 .map((c,index) => (
                                 <PostItem 
                                    key={index} 
                                    data={c}
                                    isClick ={function(): void{
                                       setIsOpenLesson(true)
                                       setDataSelected(c)
                                       
                                 }}/>
                        ))}
                        {/* <PostItem data ={lessons[0]} /> */}
                        
                  </div>
               </div>
            </div>
            {dataSelected &&(
               <ModalLearning
               isOpen = {isOpenLesson}
               type = {dataSelected.type}
               data={dataSelected}
               onClose={function() : void{
                  setIsOpenLesson(false)
                  setDataSelected(null)
                  console.log("Close")
               }}
             />
            )}
         </MainLayout>
            
         )}
 
      </>

   );
}

export default Learning;

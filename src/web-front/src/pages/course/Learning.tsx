// import VideoLearning from '../../../components/learning/VideoLearning';
import { useState, useEffect, useCallback } from 'react';
import OutlineLearning from '../../components/learning/OutlineLearning';
import QuizLearning from '../../components/learning/QuizLearning';
import { ICourse, ILesson, IQuestion, ITypeLesson, IUserCourse } from '../../model/Course.model';
import { changeCurrentProcessLearning, getCourseById, getUserCourse } from './service';
import { useParams } from 'react-router-dom';
import LearningLayout from './layout';
import { useAuth } from '../../context/authContext';
import VideoLearning from '../../components/learning/VideoLearning';
import PostLearning from '../../components/learning/PostLearning';
import { Progress } from '@nextui-org/react';
import MainLayout from '../../layouts/MainLayout';
import { Roles } from '../../App';
// import { Helmet } from 'react-helmet-async';
const quizzLesson: IQuestion[] = [
   {
      id: 1,
      content: "Trong quy trình bán hàng, bước nào là quan trọng nhất để xác định nhu cầu của khách hàng?",
      answers: ["Tìm kiếm khách hàng", "Chào hàng", "Xác định nhu cầu", "Chốt đơn"],
      correctAnswerIndex: 2,
      explain: "Xác định nhu cầu giúp người bán hiểu rõ vấn đề của khách hàng và đưa ra giải pháp phù hợp.",
      imgURL: "https://example.com/question-image-1.jpg",
      index: 1
   },
   {
      id: 2,
      content: "Trong bán hàng, kỹ năng nào giúp tạo sự tin tưởng với khách hàng?",
      answers: ["Lắng nghe chủ động", "Giới thiệu sản phẩm", "Hỏi giá", "Chào tạm biệt"],
      correctAnswerIndex: 0,
      explain: "Lắng nghe chủ động giúp người bán thấu hiểu và đáp ứng nhu cầu của khách hàng một cách hiệu quả.",
      imgURL: "https://example.com/question-image-2.jpg",
      index: 2
   },
   {
      id: 3,
      content: "Yếu tố nào tạo nên một lời chào hàng hiệu quả?",
      answers: ["Giá cả rẻ", "Sản phẩm đẹp", "Lợi ích cho khách hàng", "Thời gian giao hàng nhanh"],
      correctAnswerIndex: 2,
      explain: "Một lời chào hàng hiệu quả cần nêu rõ lợi ích sản phẩm mang lại cho khách hàng.",
      imgURL: "https://example.com/question-image-3.jpg",
      index: 3
   },
   {
      id: 4,
      content: "Khi khách hàng từ chối, cách phản hồi nào giúp duy trì cơ hội bán hàng?",
      answers: ["Thuyết phục ngay lập tức", "Hỏi lý do từ chối", "Chào tạm biệt", "Bỏ qua khách hàng"],
      correctAnswerIndex: 1,
      explain: "Hỏi lý do từ chối giúp người bán hiểu rõ vấn đề và có thể đưa ra các giải pháp phù hợp.",
      imgURL: "https://example.com/question-image-4.jpg",
      index: 4
   },
   {
      id: 5,
      content: "Trong bán hàng, điều nào sau đây giúp tăng khả năng chốt đơn thành công?",
      answers: ["Giảm giá sản phẩm", "Hiểu rõ nhu cầu khách hàng", "Cung cấp thêm sản phẩm", "Liên lạc thường xuyên"],
      correctAnswerIndex: 1,
      explain: "Hiểu rõ nhu cầu của khách hàng giúp người bán có thể cung cấp sản phẩm phù hợp nhất.",
      imgURL: "https://example.com/question-image-5.jpg",
      index: 5
   }
];
const lessons: ILesson[] =[
   {
   id: "1",
   type: ITypeLesson.Quiz,
   title: "Kiến thức cơ bản về bán hàng",
   description: "Bài kiểm tra kiến thức cơ bản về quy trình bán hàng và cách tạo niềm tin với khách hàng.",
   quiz: quizzLesson,
   video: null,
   index:1
   },
   {
      id: "lesson_2",
      type: ITypeLesson.Quiz,
      title: "Kỹ năng xử lý từ chối",
      description: "Bài kiểm tra về kỹ năng phản hồi và duy trì cơ hội bán hàng khi gặp phải từ chối từ khách hàng.",
      quiz: [
         {
            id: 3,
            content: "Yếu tố nào tạo nên một lời chào hàng hiệu quả?",
            answers: ["Giá cả rẻ", "Sản phẩm đẹp", "Lợi ích cho khách hàng", "Thời gian giao hàng nhanh"],
            correctAnswerIndex: 2,
            explain: "Một lời chào hàng hiệu quả cần nêu rõ lợi ích sản phẩm mang lại cho khách hàng.",
            imgURL: "https://example.com/question-image-3.jpg",
            index: 1
         },
         {
            id: 4,
            content: "Khi khách hàng từ chối, cách phản hồi nào giúp duy trì cơ hội bán hàng?",
            answers: ["Thuyết phục ngay lập tức", "Hỏi lý do từ chối", "Chào tạm biệt", "Bỏ qua khách hàng"],
            correctAnswerIndex: 1,
            explain: "Hỏi lý do từ chối giúp người bán hiểu rõ vấn đề và có thể đưa ra các giải pháp phù hợp.",
            imgURL: "https://example.com/question-image-4.jpg",
            index: 2
         }
      ],
      video: null,
      index: 2
   }
]
function Learning() {
   const { courseId } = useParams();
   const { user } = useAuth();
   const [course, setCourse] = useState<ICourse | null>(null);
   const [userCourse, setUserCourse] = useState<IUserCourse | null>(null);

   useEffect(() => {
      const intiCourseData = async () => {
         if (courseId) {
            const res = await getCourseById(courseId);
            if (res) {
               setCourse(res);
            }
         }
      };
      courseId && intiCourseData();
   }, [courseId]);

   // useEffect(() => {
   //    const initUserCourseData = async () => {
   //       if (courseId && course && user?.id) {
   //          const res = await getUserCourse(user?.id, courseId);
   //          if (res) {
   //             setUserCourse(res);
   //             if (!course?.groupLessons || course?.groupLessons.length == 0) return;
   //             if (res.currentLesson == null) {
   //                const currentGroupLesson = course.groupLessons[0];
   //                if (!currentGroupLesson.lessons || currentGroupLesson.lessons.length == 0) return;
   //                const currentLesson = currentGroupLesson.lessons[0];
   //                const resUpdate = await changeCurrentProcessLearning({
   //                   courseId: courseId,
   //                   lessonId: currentLesson.id ?? '',
   //                });
   //                resUpdate && setUserCourse(resUpdate);
   //             }
   //          }
   //       }
   //    };
   //    courseId && user?.id && initUserCourseData();
   // }, [user, course, courseId]);
   function getRandomInt(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    const randomNumber = getRandomInt(0, 1); // This will give a random number between 0 and 10
    const currentLesson = lessons[randomNumber]

   return (
      <>
         {!course && (
            <div className="h-screen w-screen flex justify-center items-center">
               <div>
                  Loading....{' '}
                  <Progress size="sm" isIndeterminate aria-label="Loading..." className="max-w-md" color="primary" />
               </div>
            </div>
         )}

         {(
            <MainLayout roles={[Roles.STUDENT]} isAuthenticated={true}>
               <div className="pt-header w-full pb-footer flex justify-between overflow-hidden">
                  <div className="flex overflow-hidden w-full justify-between ">
                     <div className="w-full " id="step-one">
                        {currentLesson && currentLesson.type === ITypeLesson.Quiz && (
                           <QuizLearning data={currentLesson} />
                        )}
                         {/* {userCourse?.currentLesson && userCourse?.currentLesson.type === ITypeLesson.Quiz && (
                           <QuizLearning data={userCourse?.currentLesson} />
                        )} */}
                        {/* {userCourse?.currentLesson && userCourse?.currentLesson.type === ITypeLesson.Video && (
                           <VideoLearning data={userCourse?.currentLesson} />
                        )} */}
                        {/* {userCourse?.currentLesson && userCourse?.currentLesson.type === ITypeLesson.Post && (
                           <PostLearning data={userCourse?.currentLesson} />
                        )} */}
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
               </MainLayout>
         )}
      </>
   );
}

export default Learning;

import Header from './Header';
import Footer from './Footer';
import UtilsButton from './UtilsButton';
import { ICourse, IUserCourse } from '../../../model/Course.model';
import { Outlet } from 'react-router-dom';

type LearningLayoutProps = {
   children: React.ReactNode;
   course: ICourse;
   userCourse: IUserCourse;
};
function LearningLayout(props: LearningLayoutProps) {
   return (
      <div className="w-screen min-h-screen overflow-hidden ">
         <Header course={props.course} userCourse={props.userCourse} />
         {/* {props.children} */}
         <Outlet/>
         <Footer />
         <UtilsButton />
      </div>
   );
}

export default LearningLayout;

import Modules from "../Modules";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div className="row">
      <div className="col-12 col-lg-10">
        <Modules />
      </div>
      <div className="col-lg-2 d-none d-lg-block pe-0">
        <CourseStatus />
      </div>
    </div>
  );
}
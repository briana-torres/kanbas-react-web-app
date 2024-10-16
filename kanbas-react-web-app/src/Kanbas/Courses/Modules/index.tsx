import { useParams } from "react-router";
import * as db from "../../Database";
import ModulesControls from "./ModuleControls";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

export default function Modules() {
  const { cid } = useParams();
  const modules = db.modules;

  return (
    <div className="d-flex flex-column">
      <div className="flex-fill">
        <div className="d-flex justify-content-end align-items-center mb-3">
          <ModulesControls />
        </div>
        <ul id="wd-modules" className="list-group rounded-0 w-100">
          {modules
            .filter((module: any) => module.course === cid)
            .map((module: any) => (
              <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary">
                  <BsGripVertical className="me-2 fs-3" />
                  <span>{module.name}</span>
                  <ModuleControlButtons />
                </div>
                {module.lessons && (
                  <ul className="wd-lessons list-group rounded-0">
                    {module.lessons.map((lesson: any) => (
                      <li key={lesson._id} className="wd-lesson list-group-item p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" />
                        {lesson.name}
                        <LessonControlButtons />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

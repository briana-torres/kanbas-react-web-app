export default function CourseStatus() {
    return (
      <div id="wd-course-status">
        <h2>Course Status</h2>
        <p>      <button>Unpublish</button> <button>Publish</button>
        </p>
        <table>
          <tr>
            {" "}
            <button>Import Existing Content</button>
          </tr>
          <tr>
            {" "}
            <button>Import from Commons</button>
          </tr>
          <tr>
            {" "}
            <button>Choose Home Page</button>
          </tr>
          <tr>
            {" "}
            <button>View Course Stream</button>
          </tr>
          <tr>
            {" "}
            <button>New Announcement</button>
          </tr>
          <tr>
            {" "}
            <button>New Analytics</button>
          </tr>
          <tr>
            {" "}
            <button>View Course Notifications</button>
          </tr>
        </table>
      </div>
    );
  }
  
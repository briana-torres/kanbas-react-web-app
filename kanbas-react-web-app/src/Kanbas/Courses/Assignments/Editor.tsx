export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">
          <h3>Assignment Name</h3>
        </label>
        <input id="wd-name" value="A1 - ENV + HTML" style={{ width: '100%'}} />
        <br />
        <br />
        <textarea id="wd-description" style={{ width: '100%'}}>
          The assignment is available online Submit a link to the landing page of
          your Web application running on Netlify. The landing page should include
          the following: Your full name and section Links to each of the lab
          assignments Link to the Kanbas application Links to all relevant source
          code repositories The Kanbas application should include a link to
          navigate back to the landing page.
        </textarea>
        <br />
        <table>
          <br />
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select>
                <option value="VAL1">ASSIGNMENTS</option>
              </select>{" "}
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select>
                <option value="VAL1">Online</option>
              </select>{" "}
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-blank"></label>
            </td>
            <td>
              <label>Online Entry Option</label>
              <br />
  
              <input type="checkbox" name="check-entry" id="wd-text-entry" />
              <label htmlFor="wd-text-entry">Text Entry</label>
              <br />
  
              <input type="checkbox" name="check-entry" id="wd-website-url" />
              <label htmlFor="wd-website-urlL">Website URL</label>
              <br />
  
              <input
                type="checkbox"
                name="check-entry"
                id="wd-media-recordings"
              />
              <label htmlFor="wd-media-recordings">Media Recordings</label>
              <br />
  
              <input
                type="checkbox"
                name="check-entry"
                id="wd-student-annotation"
              />
              <label htmlFor="wd-student-annotation">Student Annotation</label>
              <br />
  
              <input type="checkbox" name="check-entry" id="wd-file-upload" />
              <label htmlFor="wd-file-upload">File Uploads</label>
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign</label>
            </td>
            <td>
              Assign to
              <br />
              <input id="wd-assign-to" value={"Everyone"} />
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top"></td>
            <td>
              Due
              <br />
              <input type="date" id="wd-due-date" value="2024-05-13" />
              <br />{" "}
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top"></td>
            <td>
              <tr>
                <td>
                  {" "}
                  Available from
                  <br />
                  <input type="date" id="wd-available-from" value="2024-05-06" />
                  <br />{" "}
                </td>
                <td>
                  {" "}
                  Until
                  <br />
                  <input type="date" id="wd-available-until" value="2024-05-20" />
                  <br />{" "}
                </td>
              </tr>
            </td>
          </tr>
        </table>
        <hr />
        <button>Cancel</button>
        <button>Save</button>
      </div>
    );
  }
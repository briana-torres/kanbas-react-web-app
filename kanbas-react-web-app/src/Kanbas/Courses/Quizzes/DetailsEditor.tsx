import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import * as quizClient from "./client";

export default function DetailsEditor() {
    const { cid, qid } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [quiz, setQuiz] = useState<any>(qid ? null : {
        name: "",
        instructions: "",
        type: "Graded Quiz",
        points: 0,
        assignment_group: "QUIZZES",
        shuffle_questions: true,
        time_limit: 20,
        multiple_attempts: false,
        number_of_attempts: 1,
        show_answers: false,
        access_code: "",
        one_at_a_time: true,
        web_cam: false,
        lock_question_after_answering: false,
        due: "",
        for: "",
        available: "",
        until: "",
        published: false,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            if (qid) {
                const fetchedQuiz = await quizClient.getQuiz(qid);
                setQuiz(fetchedQuiz);
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [qid]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setQuiz((prev: any) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSaveQuiz = (courseId: string) => {
        if (qid) {
            quizClient.updateQuiz(qid, quiz);
        } else {
            quizClient.createQuiz(courseId, quiz);
        }
        if (quiz.published) {
            navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
        } else {
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${qid}/edit`);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!quiz) {
        return <div>Quiz not found</div>;
    }

    return (
        <div className="container">
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Quiz Name"
                    name="name"
                    value={quiz.name || ""}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Quiz Instructions:</label>
                <textarea
                    className="form-control"
                    name="instructions"
                    value={quiz.instructions || ""}
                    onChange={handleInputChange}
                    rows={4}
                />
            </div>

            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Quiz Type</label>
                <div className="col-sm-9">
                    <select className="form-select" name="type" value={quiz.type || ""} onChange={handleInputChange}>
                        <option value="GRADED">Graded Quiz</option>
                        <option value="PRACTICE">Practice Quiz</option>
                        <option value="GRADED_SURVEY">Graded Survey</option>
                        <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                    </select>
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Assignment Group</label>
                <div className="col-sm-9">
                    <select className="form-select" name="assignment_group" value={quiz.assignment_group || ""} onChange={handleInputChange}>
                        <option value="QUIZZES">Quizzes</option>
                        <option value="EXAMS">Exams</option>
                        <option value="ASSIGNMENTS">Assignments</option>
                        <option value="PROJECT">Project</option>
                    </select>
                </div>
            </div>

            <div className="mb-3">
                <h5>Options</h5>
                <div className="card p-3">
                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" name="shuffle_answers" checked={quiz.shuffle_answers || false} onChange={handleInputChange}/>
                        <label className="form-check-label">Shuffle Answers</label>
                    </div>

                    <div className="mb-3">
                        <div className="input-group" style={{ maxWidth: "200px" }}>
                            <input type="text" className="form-control" name="time_limit" value={quiz.time_limit || ""} onChange={handleInputChange}/>
                            <span className="input-group-text">minutes</span>
                        </div>
                    </div>

                    <div className="card p-3 mb-3">
                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" name="multiple_attempts" checked={quiz.multiple_attempts || false} onChange={handleInputChange}/>
                            <label className="form-check-label">Allow Multiple Attempts</label>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Number of Attempts: (0 for unlimited)</label>
                            <input type="number" className="form-control" name="number_of_attempts" value={quiz.number_of_attempts || 1} onChange={handleInputChange}/>
                        </div>

                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" name="show_answers" checked={quiz.show_answers || false} onChange={handleInputChange}/>
                            <label className="form-check-label">Show Correct Answers</label>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Access Code:</label>
                            <input type="text" className="form-control" name="access_code" value={quiz.access_code || ""} onChange={handleInputChange}/>
                        </div>

                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" name="one_at_a_time" checked={quiz.one_at_a_time || false} onChange={handleInputChange}/>
                            <label className="form-check-label">One Question at a Time</label>
                        </div>

                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" name="web_cam" checked={quiz.web_cam || false} onChange={handleInputChange}/>
                            <label className="form-check-label">Webcam Required</label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="lock_answers" checked={quiz.lock_answers || false} onChange={handleInputChange}/>
                            <label className="form-check-label">Lock Questions After Answering</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-3">
                <h5>Assign</h5>
                <div className="card p-3">
                    <div className="mb-3">
                        <label className="form-label">Assign to</label>
                        <select className="form-select" name="assign_to" value={quiz.assign_to || ""} onChange={handleInputChange}>
                            <option value="EVERYONE">Everyone</option>
                            <option value="HONORS">Honors</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Due</label>
                        <input type="date" className="form-control" name="due" value={quiz.due || ""} onChange={handleInputChange}/>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Available From</label>
                            <input type="date" className="form-control" name="available" value={quiz.available || ""} onChange={handleInputChange}/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Until</label>
                            <input type="date" className="form-control" name="until" value={quiz.until || ""} onChange={handleInputChange}/>
                        </div>
                    </div>
                </div>
            </div>

            <hr />
            <div className="d-flex justify-content-end gap-2">
                <button onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)} className="btn btn-secondary">
                    Cancel
                </button>
                <button onClick={() => cid && handleSaveQuiz(cid)} className="btn btn-primary">
                    {qid ? "Update Quiz" : "Create Quiz"}
                </button>
                {!quiz.published && (
                    <button onClick={() => { if (cid) { quiz.published = true; handleSaveQuiz(cid); }}} className="btn btn-success">
                        Save and Publish Quiz
                    </button>
                )}
            </div>
        </div>
    );
}
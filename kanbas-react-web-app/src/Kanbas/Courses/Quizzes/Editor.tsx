import * as client from "./client";
import { QuizForm, Quiz, QuizRootState } from './types';
import  QuizQuestions  from './Questions/index';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { QuizQuestionRootState } from './Questions/questionTypes';
import { addQuiz, updateQuiz, togglePublishQuiz } from './reducer';

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showTimeLimit, setShowTimeLimit] = useState(false);

  const quiz = useSelector((state: QuizRootState) => 
    state.quizzesReducer.quizzes.find((q : Quiz) => q._id === qid)
  );

  // Get all questions for the current quiz
  const quizQuestions = useSelector((state: QuizQuestionRootState) =>
    state.questionsReducer.questions.filter(q => q.quizId === qid)
  );

  const totalPoints = quizQuestions
  .filter(q => q._id !== qid)
  .reduce((sum, q) => sum + (q.points || 0), 0);
  

  const [activeTab, setActiveTab] = useState<'details' | 'questions'>('details');

  const [formData, setFormData] = useState<QuizForm>({
    title: '',
    description: '',
    points: 0,
    dueDate: new Date(),
    availableFromDate: new Date(),
    availableUntilDate: new Date(),
    published: false,
    numberOfQuestions: 0,
    quizType: 'GRADED_QUIZ',
    assignmentGroup: 'ASSIGNMENTS',
    shuffleAnswers: false,
    timeLimit: 0,
    multipleAttempts: false,
    numberOfAttempts: 1,
    showCorrectAnswers: true,
    accessCode: '',
    oneQuestionAtTime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false
  });
  
  useEffect(() => {
    if (quiz) {
      setFormData({
        title: quiz.title || '',
        description: quiz.description || '',
        points: totalPoints || 0,
        dueDate: quiz.dueDate ? new Date(quiz.dueDate) : new Date(),
        availableFromDate: quiz.availableFromDate ? new Date(quiz.availableFromDate) : new Date(),
        availableUntilDate: quiz.availableUntilDate ? new Date(quiz.availableUntilDate) : new Date(),
        published: quiz.published || false,
        numberOfQuestions: quiz.numberOfQuestions || 0,
        quizType: quiz.quizType || 'GRADED_QUIZ',
        assignmentGroup: quiz.assignmentGroup || 'ASSIGNMENTS',
        shuffleAnswers: quiz.shuffleAnswers || false,
        timeLimit: quiz.timeLimit || 0,
        multipleAttempts: quiz.multipleAttempts || false,
        numberOfAttempts: quiz.numberOfAttempts || 1,
        showCorrectAnswers: quiz.showCorrectAnswers || true,
        accessCode: quiz.accessCode || '',
        oneQuestionAtTime: quiz.oneQuestionAtTime || true,
        webcamRequired: quiz.webcamRequired || false,
        lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering || false
      });
    }
  }, [quiz]);

  const [showMenu, setShowMenu] = useState(false);

  const handlePublishToggle = async () => {
    try {
      if (quiz) {
        await client.updateQuiz(quiz._id, {
          ...quiz,
          published: !quiz.published,
          points: totalPoints
        });
      }
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };

  const formatDateForInput = (date: Date | null): string => {
    if (!date) return '';
    return new Date(date).toISOString().slice(0, 16);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'dueDate' || name === 'availableFromDate' || name === 'availableUntilDate') {
      setFormData(prev => ({
        ...prev,
        [name]: value ? new Date(value) : null
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (shouldPublish: boolean = false) => {
    try {
      const dataToSave = {
        ...formData,
        published: shouldPublish || quiz?.published || false,
        course: cid
      };
  
      let savedQuiz;
      if (qid && qid !== 'new') {
        // Update existing quiz
        savedQuiz = await client.updateQuiz(qid, {
          ...dataToSave,
          _id: qid,
        });
        dispatch(updateQuiz(savedQuiz));
  
        // If this is an update and we want to publish
        if (shouldPublish && savedQuiz?._id) {
          try {
            await client.publishQuiz(savedQuiz._id);
            dispatch(togglePublishQuiz(savedQuiz._id));
          } catch (publishError) {
            console.error("Error publishing quiz:", publishError);
          }
        }
      } else {
        // Create new quiz
        savedQuiz = await client.createQuiz(cid as string, dataToSave);
        dispatch(addQuiz(savedQuiz));
  
        // If this is a new quiz and we want to publish
        if (shouldPublish && savedQuiz?._id) {
          try {
            await client.publishQuiz(savedQuiz._id);
            dispatch(togglePublishQuiz(savedQuiz._id));
          } catch (publishError) {
            console.error("Error publishing quiz:", publishError);
          }
        }
      }
  
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };


  return (
    <div className="wd-kanbas-quiz-editor p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
      <div className="d-flex align-items-center gap-2">
        <span style={{ fontSize: '1.1rem' }}>Points {formData.points || 0}</span>
        <div className="d-flex align-items-center" style={{ color: '#666' }}>
          {quiz?.published ? (
            <>
              <i className="fas fa-check me-1"></i>
              <span>Published</span>
            </>
          ) : (
            <>
              <i className="fas fa-ban me-1"></i>
              <span>Not Published</span>
            </>
          )}
        </div>
      </div>
        
        <div className="position-relative">
          <button 
            className="btn btn-light border"
            style={{ padding: '2px 8px' }}
            onClick={() => setShowMenu(!showMenu)}
          >
            ⋮
          </button>
          
          {showMenu && (
            <div 
              className="position-absolute end-0 mt-1 bg-white border rounded shadow"
              style={{ 
                zIndex: 1000,
                minWidth: '150px'
              }}
            >
              <button 
                className="btn btn-link text-start w-100 px-3 py-2 text-decoration-none text-dark"
                onClick={() => {
                  handlePublishToggle();
                  setShowMenu(false);
                }}
              >
                {quiz?.published ? 'Unpublish' : 'Publish'}
              </button>
            </div>
          )}
        </div>
      </div>
  
      {/* Tabs */}

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'questions' ? 'active' : ''} text-danger`}
            onClick={() => {
              if (qid && qid !== 'new') {
                setActiveTab('questions');
              } else {
                alert("Please save the quiz details first before adding questions.");
              }
            }}
          >
            Questions
          </button>
        </li>
      </ul>

      {activeTab === 'details' ? (
      <>
      {/* Quiz Title */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Unnamed Quiz"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>
  
      <div className="mb-4">
        <div className="border rounded-bottom p-2">
          <textarea
            className="form-control border-0"
            rows={4}
            placeholder="Quiz Instructions"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
      </div>
  
      {/* Quiz Type */}
      <div className="mb-3">
        <label className="d-block mb-1">Quiz Type</label>
        <select
          className="form-select"
          name="quizType"
          value={formData.quizType}
          onChange={handleInputChange}
        >
          <option value="GRADED_QUIZ">Graded Quiz</option>
          <option value="PRACTICE_QUIZ">Practice Quiz</option>
          <option value="GRADED_SURVEY">Graded Survey</option>
          <option value="UNGRADED_SURVEY">Ungraded Survey</option>
        </select>
      </div>
  
      {/* Assignment Group */}
      <div className="mb-4">
        <label className="d-block mb-1">Assignment Group</label>
        <select
          className="form-select"
          name="assignmentGroup"
          value={formData.assignmentGroup}
          onChange={handleInputChange}
        >
          <option value="ASSIGNMENTS">ASSIGNMENTS</option>
          <option value="QUIZZES">QUIZZES</option>
          <option value="EXAMS">EXAMS</option>
          <option value="PROJECT">PROJECT</option>
        </select>
      </div>
  
      {/* Options */}
      <div className="mb-4">
        <h6 className="mb-3">Options</h6>
        <div className="ps-4">
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="shuffleAnswers"
              name="shuffleAnswers"
              checked={formData.shuffleAnswers}
              onChange={(e) => setFormData(prev => ({ ...prev, shuffleAnswers: e.target.checked }))}
            />
            <label className="form-check-label" htmlFor="shuffleAnswers">
              Shuffle Answers
            </label>
          </div>
  
          <div className="mb-3">
          <div className="form-check mb-2">
            <input
              type="checkbox"
              className="form-check-input"
              id="timeLimit"
              checked={showTimeLimit}
              onChange={(e) => {
                setShowTimeLimit(e.target.checked);
                setFormData(prev => ({
                  ...prev,
                  timeLimit: e.target.checked ? 20 : 0
                }));
              }}
            />
            <label className="form-check-label" htmlFor="timeLimit">
              Time Limit
            </label>
          </div>
            {showTimeLimit && (
              <div className="ps-4 d-flex align-items-center gap-2">
                <input
                  type="number"
                  className="form-control"
                  style={{ width: "100px" }}
                  value={formData.timeLimit}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    timeLimit: parseInt(e.target.value) || 0
                  }))}
                />
                <span>Minutes</span>
              </div>
            )}
          </div>
  
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="multipleAttempts"
              name="multipleAttempts"
              checked={formData.multipleAttempts}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                multipleAttempts: e.target.checked 
              }))}
            />
            <label className="form-check-label" htmlFor="multipleAttempts">
              Allow Multiple Attempts
            </label>
            {formData.multipleAttempts && (
              <div className="ps-4 mt-2">
                <input
                  type="number"
                  className="form-control"
                  style={{ width: "100px" }}
                  value={formData.numberOfAttempts}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    numberOfAttempts: parseInt(e.target.value) || 1 
                  }))}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="form-check mb-3">
      <input
        type="checkbox"
        className="form-check-input"
        id="showCorrectAnswers"
        name="showCorrectAnswers"
        checked={formData.showCorrectAnswers}
        onChange={(e) => setFormData(prev => ({ 
          ...prev, 
          showCorrectAnswers: e.target.checked 
        }))}
      />
      <label className="form-check-label" htmlFor="showCorrectAnswers">
        Show Correct Answers
      </label>
    </div>

    <div className="mb-3">
      <label className="form-label">Access Code</label>
      <input
        type="text"
        className="form-control"
        name="accessCode"
        value={formData.accessCode}
        onChange={handleInputChange}
        placeholder="Optional"
      />
    </div>

  <div className="form-check mb-3">
    <input
      type="checkbox"
      className="form-check-input"
      id="oneQuestionAtTime"
      name="oneQuestionAtTime"
      checked={formData.oneQuestionAtTime}
      onChange={(e) => setFormData(prev => ({ 
        ...prev, 
        oneQuestionAtTime: e.target.checked 
      }))}
    />
    <label className="form-check-label" htmlFor="oneQuestionAtTime">
      One Question at a Time
    </label>
  </div>

  <div className="form-check mb-3">
    <input
      type="checkbox"
      className="form-check-input"
      id="webcamRequired"
      name="webcamRequired"
      checked={formData.webcamRequired}
      onChange={(e) => setFormData(prev => ({ 
        ...prev, 
        webcamRequired: e.target.checked 
      }))}
    />
    <label className="form-check-label" htmlFor="webcamRequired">
      Webcam Required
    </label>
  </div>

  <div className="form-check mb-3">
    <input
      type="checkbox"
      className="form-check-input"
      id="lockQuestions"
      name="lockQuestionsAfterAnswering"
      checked={formData.lockQuestionsAfterAnswering}
      onChange={(e) => setFormData(prev => ({ 
        ...prev, 
        lockQuestionsAfterAnswering: e.target.checked 
      }))}
    />
    <label className="form-check-label" htmlFor="lockQuestions">
      Lock Questions After Answering
    </label>
  </div>
  
      {/* Assign Section */}
      <div className="mb-4">
        <h6 className="mb-3">Assign</h6>
        <div className="border rounded p-3">
          <div className="mb-3">
            <label className="d-block mb-1">Assign to</label>
            <div className="position-relative">
              <input 
                type="text" 
                className="form-control" 
                value="Everyone" 
                readOnly 
              />
              <button className="btn position-absolute top-50 end-0 translate-middle-y me-2">
                ×
              </button>
            </div>
          </div>
  
          <div className="mb-3">
            <label className="d-block mb-1">Due</label>
            <input
              type="datetime-local"
              className="form-control"
              name="dueDate"
              value={formatDateForInput(formData.dueDate)}
              onChange={handleInputChange}
            />
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="d-block mb-1">Available from</label>
              <input
                type="datetime-local"
                className="form-control"
                name="availableFromDate"
                value={formatDateForInput(formData.availableFromDate)}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label className="d-block mb-1">Until</label>
              <input
                type="datetime-local"
                className="form-control"
                name="availableUntilDate"
                value={formatDateForInput(formData.availableUntilDate)}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
  
      {/* Footer Buttons */}
      <div className="d-flex justify-content-center gap-2">
        <button 
          className="btn btn-light" 
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}
        >
          Cancel
        </button>
        <button 
          className="btn btn-primary" 
          onClick={() => handleSubmit(false)}
        >
          Save
        </button>
        <button 
          className="btn btn-success"
          onClick={() => handleSubmit(true)}
        >
          Save & Publish
        </button>
      </div>
      </>
      ) : (
        cid && qid ? (
          <QuizQuestions quizId={qid} courseId={cid} />
        ) : (
          <div>Missing required parameters</div>
        )
      )}
    </div>
  );
}
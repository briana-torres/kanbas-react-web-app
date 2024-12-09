import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { fetchSubmissions} from './Review/reducer';

export default function QuizStartScreen() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const quiz = useSelector((state: any) => 
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { submissions, status } = useSelector((state: RootState) => state.submissionsReducer);

  useEffect(() => {
    if (qid && currentUser._id) {
      dispatch(fetchSubmissions({ 
        quizId: qid, 
        studentId: currentUser._id 
      }) as any);
    }
  }, [qid, currentUser._id, dispatch]);

  const currentDate = new Date();
  const availableFromDate = quiz?.availableFromDate ? new Date(quiz.availableFromDate) : null;
  const availableUntilDate = quiz?.availableUntilDate ? new Date(quiz.availableUntilDate) : null;

  const CountOfAttempt = submissions.length;
  const AttempLeft = quiz?.multipleAttempts ? quiz?.numberOfAttempts - CountOfAttempt : 1 - CountOfAttempt;

  const isFacultyOrAdmin = currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN';
  const isStudent = currentUser.role === 'STUDENT';
  const isQuizPublished = quiz?.published;
  const isAvailable =
    (!availableFromDate || currentDate >= availableFromDate) &&
    (!availableUntilDate || currentDate <= availableUntilDate);

  const canBeginQuiz = isQuizPublished && isAvailable && (AttempLeft > 0 || isFacultyOrAdmin);

  const renderActionButton = () => {
    if (!isQuizPublished && isStudent) {
      return <p className="text-muted">This quiz is not yet published.</p>;
    }

    if (isFacultyOrAdmin) {
      return (
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview/take`)}
        >
          {CountOfAttempt === 0 ? 'Begin Quiz' : 'Retake Quiz'}
        </button>
      );
    }

    if (isStudent && isAvailable) {
      if (canBeginQuiz) {
        return (
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview/take`)}
          >
            {CountOfAttempt === 0 ? 'Begin Quiz' : 'Retake Quiz'}
          </button>
        );
      }

      return (
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview/review`)}
        >
          View Correct Answers
        </button>
      );
    }

    return <p className="text-muted">Quiz is not available at this time.</p>;
  };

  return (
    <div className="p-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="mb-4" style={{ borderBottom: '2px solid #0d6efd', paddingBottom: '10px' }}>
        {quiz?.title}
      </h2>
      
      <div className="alert alert-info mb-4" style={{ borderLeft: '4px solid #0d6efd' }}>
        <i className="bi bi-info-circle me-2"></i>
        You are now previewing the published version of this quiz.
      </div>

      <section className="mb-4">
        <h4 className="mb-3">Quiz Instructions</h4>
        <p className="ms-3">{quiz?.description || 'No instructions provided.'}</p>
      </section>

      <section className="quiz-details mb-4">
        <div className="mb-3 p-2" style={{ borderLeft: '3px solid #dee2e6' }}>
          <h5>Time Limit</h5>
          <p className="ms-3 text-secondary">
            {quiz?.timeLimit ? `${quiz.timeLimit} Minutes` : 'No time limit'}
          </p>
        </div>

        <div className="mb-3 p-2" style={{ borderLeft: '3px solid #dee2e6' }}>
          <h5>Multiple Attempts</h5>
          <p className="ms-3" style={{ color: quiz?.multipleAttempts ? '#28a745' : '#dc3545' }}>
            {quiz?.multipleAttempts ? 'Yes' : 'No'}
          </p>
        </div>

        <div className="mb-3 p-2" style={{ borderLeft: '3px solid #dee2e6' }}>
          <h5>Attempts Left</h5>
          <p className="ms-3 text-secondary">{AttempLeft}</p>
        </div>

        <div className="mb-3 p-2" style={{ borderLeft: '3px solid #dee2e6' }}>
          <h5>Points</h5>
          <p className="ms-3 text-secondary">{quiz?.points || '0'} pts</p>
        </div>
      </section>

      <div className="d-flex flex-column gap-3 mt-5">
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/details`)}
          >
            Cancel
          </button>

          <div>{renderActionButton()}</div>
        </div>

        
      {!isStudent && (
          <button 
            className="btn btn-outline-primary w-100 mt-3"
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/questions`)}
          >
            Keep Editing This Quiz
          </button>
        )}
      </div>
    </div>
  );
}
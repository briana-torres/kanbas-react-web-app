import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { QuizSubmission, QuizSubmissionAnswer } from './QuizSubmissionType';
import { RootState } from '../../../../store';
import { fetchSubmissions, updateScores } from './reducer';

const QuizReview = () => {
  const { qid, cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [editingScores, setEditingScores] = useState(false);
  const [editedPoints, setEditedPoints] = useState<{[key: string]: number}>({});
  
  const quiz = useSelector((state: any) => 
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { submissions, status } = useSelector((state: RootState) => state.submissionsReducer);
  const currentSubmission = submissions[0];

  const isFacultyOrAdmin = currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN';

  useEffect(() => {
    if (qid && currentUser._id) {
      dispatch(fetchSubmissions({ 
        quizId: qid, 
        studentId: currentUser._id 
      }) as any);
    }
  }, [qid, currentUser._id, dispatch]);

  useEffect(() => {
    if (currentSubmission) {
      const points: {[key: string]: number} = {};
      currentSubmission.answers.forEach((answer: QuizSubmissionAnswer) => {
        points[answer.questionId] = answer.points;
      });
      setEditedPoints(points);
    }
  }, [currentSubmission]);

  const handlePointsChange = (questionId: string, points: number) => {
    setEditedPoints(prev => ({
      ...prev,
      [questionId]: Math.max(0, Math.min(points, 
        currentSubmission.answers.find(a => a.questionId === questionId)?.maxPoints || 0))
    }));
  };

  const saveScores = async () => {
    if (!currentSubmission) return;

    try {
      const updates = {
        answers: currentSubmission.answers.map(answer => ({
          questionId: answer.questionId,
          points: editedPoints[answer.questionId]
        })),
        role: currentUser.role
      };

      await dispatch(updateScores({
        submissionId: currentSubmission._id,
        updates: updates
      }) as any);
      setEditingScores(false);
    } catch (error) {
      console.error('Error updating scores:', error);
    }
  };

  const renderAttemptHistory = () => {
    if (!submissions?.length) return null;
    
    return (
      <div className="mb-4">
        <h3 className="mb-3">Attempt History</h3>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Attempt</th>
                <th>Time</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission._id}>
                  <td>Attempt {submission.attemptNumber}</td>
                  <td>{submission.timeSpent} minutes</td>
                  <td>{submission.score} out of {submission.maxScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderQuestion = (answer: QuizSubmissionAnswer) => (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>Question {currentQuestionIndex + 1}</span>
        <span>{answer.points} / {answer.maxPoints} pts</span>
      </div>
      <div className="card-body">
        <div className="mb-3">{answer.question}</div>
        
        {answer.questionType === 'MULTIPLE_CHOICE' && (
          <div>
            {answer.choices?.map((choice) => (
              <div 
                key={choice.text}
                className={`p-2 mb-2 border rounded ${
                  choice.isCorrect ? 'bg-success bg-opacity-10' :
                  choice.text === answer.userAnswer ? 'bg-danger bg-opacity-10' : ''
                }`}
              >
                <div className="d-flex align-items-start">
                  <span className="me-2">
                    {choice.isCorrect ? '✓' : 
                     choice.text === answer.userAnswer ? '✗' : ''}
                  </span>
                  <span>{choice.text}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {(answer.questionType === 'TRUE_FALSE' || answer.questionType === 'FILL_BLANK') && (
          <div>
            <div className={`p-2 mb-2 border rounded ${
              answer.isCorrect ? 'bg-success bg-opacity-10' : 'bg-danger bg-opacity-10'
            }`}>
              <div className="small text-muted">Your answer:</div>
              <div>{String(answer.userAnswer)}</div>
            </div>
            <div className="p-2 border rounded bg-success bg-opacity-10">
              <div className="small text-muted">Correct answer:</div>
              <div>{String(answer.correctAnswer)}</div>
            </div>
          </div>
        )}

        {editingScores && isFacultyOrAdmin && (
          <div className="mt-3">
            <label className="form-label">Points:</label>
            <input
              type="number"
              className="form-control w-auto"
              value={editedPoints[answer.questionId]}
              onChange={(e) => handlePointsChange(answer.questionId, Number(e.target.value))}
              min="0"
              max={answer.maxPoints}
            />
          </div>
        )}
      </div>
    </div>
  );

  if (status === 'loading') {
    return (
      <div className="d-flex justify-content-center p-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!currentSubmission) {
    return <div className="p-4 text-center">No submission found.</div>;
  }

  const currentAnswer = currentSubmission.answers[currentQuestionIndex];

  return (
    <div className="container py-4">
      {isFacultyOrAdmin && renderAttemptHistory()}

      <div className="mb-4">
        <div style={{ 
          fontSize: '14px', 
          color: '#2D3B45',
          marginBottom: '20px'
        }}>
          Score for this quiz: <span className="fw-bold">{currentSubmission.score}</span> out of {currentSubmission.maxScore}</div>
        <div style={{ fontSize: '14px', color: '#2D3B45' }}>
          Submitted {new Date(currentSubmission.endTime).toLocaleString()}</div>
        <div style={{ fontSize: '14px', color: '#2D3B45' }}>
          This attempt took {currentSubmission.timeSpent} minutes.</div>
      </div>

      {isFacultyOrAdmin && (
        <div className="mb-4">
          {editingScores ? (
            <div className="btn-group">
              <button
                onClick={saveScores}
                className="btn btn-success"
              >
                Save Scores
              </button>
              <button
                onClick={() => setEditingScores(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditingScores(true)}
              className="btn btn-primary"
            >
              Edit Scores
            </button>
          )}
        </div>
      )}

      {renderQuestion(currentAnswer)}

      <div className="d-flex justify-content-between align-items-center">
        <button
          onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
          disabled={currentQuestionIndex === 0}
          className="btn btn-outline-secondary"
        >
          Previous
        </button>

        <div>
          Question {currentQuestionIndex + 1} of {currentSubmission.answers.length}
        </div>

        <button
          onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
          disabled={currentQuestionIndex === currentSubmission.answers.length - 1}
          className="btn btn-outline-secondary"
        >
          Next
        </button>
      </div>

      <div className="mt-4">
        <button
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}
          className="btn btn-outline-primary"
        >
          Return to Quizzes
        </button>
        
        {quiz?.multipleAttempts && (
          <button
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview/take`)}
            className="btn btn-primary ms-2"
          >
            Take Quiz Again
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizReview;
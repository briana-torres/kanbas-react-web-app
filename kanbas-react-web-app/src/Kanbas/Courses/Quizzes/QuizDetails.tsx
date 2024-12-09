import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Quiz, QuizRootState } from './types';

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state: QuizRootState) => state.accountReducer.currentUser);
  const quiz = useSelector((state: QuizRootState) => 
    state.quizzesReducer.quizzes.find((q : Quiz) => q._id === qid)
  );

  const isFacultyOrAdmin = currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN';
  const isStudent = currentUser.role === 'Student';

  const formatDate = (date: Date | string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  if (!quiz) return null;

  return (
    <div className="p-4">
      <div className="bg-white d-flex gap-2 p-2 mb-4">
        <button 
          className="btn"
          style={{
            backgroundColor: '#f5f5f5',
            border: '1px solid #ccc',
            borderRadius: '3px',
            padding: '6px 12px',
            color: '#333'
          }}
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview`)}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#e6e6e6';
            e.currentTarget.style.borderColor = '#adadad';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
            e.currentTarget.style.borderColor = '#ccc';
          }}
        >
          Preview
        </button>
        {isFacultyOrAdmin && (
          <button 
            className="btn"
            style={{
              backgroundColor: '#f5f5f5',
              border: '1px solid #ccc',
              borderRadius: '3px',
              padding: '6px 12px',
              color: '#333'
            }}
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`)}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#e6e6e6';
              e.currentTarget.style.borderColor = '#adadad';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
              e.currentTarget.style.borderColor = '#ccc';
            }}
          >
            <i className="fas fa-edit me-1"></i>Edit
          </button>
        )}
      </div>

      <h3 className="mb-4 mt-2">{quiz.title}</h3>

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '12px 24px',
        fontSize: '15px',
        maxWidth: '700px',
        margin: '0'
      }}>
        <div className="text-end text-secondary">Quiz Type</div>
        <div>{quiz.quizType.replace('_', ' ')}</div>

        <div className="text-end text-secondary">Points</div>
        <div>{quiz.points}</div>

        <div className="text-end text-secondary">Assignment Group</div>
        <div>{quiz.assignmentGroup}</div>

        <div className="text-end text-secondary">Shuffle Answers</div>
        <div>{quiz.shuffleAnswers ? 'Yes' : 'No'}</div>

        <div className="text-end text-secondary">Time Limit</div>
        <div>{quiz.timeLimit === 0 ? "Unlimited" : `${quiz.timeLimit} Minutes`}</div>

        <div className="text-end text-secondary">Multiple Attempts</div>
        <div>{quiz.multipleAttempts ? 'Yes' : 'No'}</div>

        <div className="text-end text-secondary">View Responses</div>
        <div>Always</div>

        <div className="text-end text-secondary">Show Correct Answers</div>
        <div>Immediately</div>

        <div className="text-end text-secondary">One Question at a Time</div>
        <div>{quiz.oneQuestionAtTime ? 'Yes' : 'No'}</div>

        <div className="text-end text-secondary">Require Respondus LockDown Browser</div>
        <div>No</div>

        <div className="text-end text-secondary">Required to View Quiz Results</div>
        <div>No</div>

        <div className="text-end text-secondary">Webcam Required</div>
        <div>{quiz.webcamRequired ? 'Yes' : 'No'}</div>

        <div className="text-end text-secondary">Lock Questions After Answering</div>
        <div>{quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No'}</div>
      </div>

      <div className="mt-4" style={{ maxWidth: '700px', margin: '0' }}>
        <table className="table">
          <thead>
            <tr style={{ borderBottom: '1px solid #dee2e6', borderTop: '1px solid #dee2e6' }}>
              <th 
                className="fw-normal text-secondary" 
                style={{ width: '25%', border: 'none' }}
              >
                Due
              </th>
              <th 
                className="fw-normal text-secondary" 
                style={{ width: '25%', border: 'none' }}
              >
                For
              </th>
              <th 
                className="fw-normal text-secondary" 
                style={{ width: '25%', border: 'none' }}
              >
                Available from
              </th>
              <th 
                className="fw-normal text-secondary" 
                style={{ width: '25%', border: 'none' }}
              >
                Until
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #dee2e6' }}>
              <td style={{ border: 'none' }}>{formatDate(quiz.dueDate)}</td>
              <td style={{ border: 'none' }}>Everyone</td>
              <td style={{ border: 'none' }}>{formatDate(quiz.availableFromDate)}</td>
              <td style={{ border: 'none' }}>{formatDate(quiz.availableUntilDate)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
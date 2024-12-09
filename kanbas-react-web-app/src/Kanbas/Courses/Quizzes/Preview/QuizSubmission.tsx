import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { QuizQuestionRootState } from '../Questions/questionTypes';

export default function QuizSubmission() {
  const { qid, cid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { 
    userAnswers = [], 
    startTime,
    score,
    totalPoints,
    percentage
  } = location.state || {};

  const timeSpent = Math.round((new Date().getTime() - new Date(startTime).getTime()) / (1000 * 60));

  const quiz = useSelector((state: any) => 
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h3>{quiz?.title}</h3>

      <div style={{ 
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <div style={{ 
          fontSize: '24px', 
          fontWeight: 'bold',
          marginBottom: '20px',
          color: percentage >= 70 ? '#2D8C3C' : '#D12B1F'
        }}>
          {percentage}%
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
            Score:
          </div>
          <div>
            {score} out of {totalPoints} points
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
            Time Spent:
          </div>
          <div>
            {timeSpent} minutes
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
            Submitted:
          </div>
          <div>
            {new Date().toLocaleString()}
          </div>
        </div>

        {quiz?.showCorrectAnswers && (
          <button
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview/review`)}
            style={{
              backgroundColor: '#2D8C3C',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            View Correct Answers
          </button>
        )}
      </div>

      <div style={{ 
        marginTop: '20px',
        display: 'flex',
        gap: '10px'
      }}>
        <button
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}
          style={{
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Return to Quizzes
        </button>

        {quiz?.multipleAttempts && (
          <button
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview/take`)}
            style={{
              backgroundColor: '#2D8C3C',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Take Quiz Again
          </button>
        )}
      </div>
    </div>
  );
}
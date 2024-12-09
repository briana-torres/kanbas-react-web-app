import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { QuizQuestionRootState, QuizQuestion } from '../Questions/questionTypes';
import { fetchQuestions } from '../Questions/reducer';
import { UserAnswer } from './QuizPreviewType';
import { RootState } from '../../../store';
import { submitQuiz } from './Review/reducer'; 

export default function QuizPreview() {
  const { qid, cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showQuestions, setShowQuestions] = useState(true);
  const [startTime] = useState(new Date());
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])

  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { submissions, status } = useSelector((state: RootState) => state.submissionsReducer);
  const currentSubmission = submissions[0];

  const isFacultyOrAdmin = currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN';
  const isStudent = currentUser.role === 'Student';

  useEffect(() => {
    if (qid) {
      dispatch(fetchQuestions(qid) as any);
    }
  }, [qid, dispatch]);

  const questions = useSelector((state: QuizQuestionRootState) => 
    state.questionsReducer.questions.filter(q => q.quizId === qid)
  );

  const quiz = useSelector((state: any) => 
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  const handleAnswerChange = (questionId: string, answer: string | boolean) => {
    setUserAnswers(prev => {
      const existing = prev.find((a: UserAnswer) => a.questionId === questionId);
      if (existing) {
        return prev.map((a: UserAnswer) => a.questionId === questionId ? { ...a, answer } : a);
      }
      return [...prev, { questionId, answer }];
    });
  };

  useEffect(() => {
    if (quiz?.timeLimit) {
      setTimeRemaining(quiz.timeLimit * 60);
      const interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            handleQuizSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setIntervalId(interval);
  
      return () => clearInterval(interval);
    }
  }, [quiz]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const quizStatus = useSelector((state: QuizQuestionRootState) => 
    state.questionsReducer.status
  );


  const calculateSubmissionScore = (userAnswers: UserAnswer[], questions: QuizQuestion[]) => {
    let correctAnswers = 0;
    let totalPoints = 0;
  
    questions.forEach(question => {
      totalPoints += question.points;
      const userAnswer = userAnswers.find(a => a.questionId === question._id);
      if (!userAnswer) return;
  
      switch (question.questionType) {
        case 'MULTIPLE_CHOICE':
          const correctChoice = question.choices?.find(c => c.isCorrect);
          if (correctChoice && userAnswer.answer === correctChoice.text) {
            correctAnswers += question.points;
          }
          break;
        
        case 'TRUE_FALSE':
          if (userAnswer.answer === question.correctAnswer) {
            correctAnswers += question.points;
          }
          break;
        
        case 'FILL_BLANK':
          if (question.correctAnswers && question.correctAnswers.length > 0) {
            const correct = question.correctAnswers.some(ans => {
              const userAns = userAnswer.answer as string;
              return ans.caseSensitive 
                ? ans.text === userAns
                : ans.text.toLowerCase() === userAns.toLowerCase();
            });
            if (correct) {
              correctAnswers += question.points;
            }
          }
          break;
      }
    });

    return {
      score: correctAnswers,
      total: totalPoints,
      percentage: totalPoints > 0 ? Math.round((correctAnswers / totalPoints) * 100) : 0
    };
  };

  const handleQuizSubmit = async () => {
    if (!qid || !cid) return; 
  
    try {
      const scoreResult = calculateSubmissionScore(userAnswers, questions);
      
      const processedAnswers = questions.map(question => {
        const userAnswer = userAnswers.find(a => a.questionId === question._id);
        let correctAnswer: string | boolean = '';
        let isCorrect = false;
        let userAnswerValue: string | boolean = ''; // Default empty answer
  
        if (userAnswer) {
          switch (question.questionType) {
            case 'MULTIPLE_CHOICE':
              const correctChoice = question.choices?.find(c => c.isCorrect);
              correctAnswer = correctChoice?.text || '';
              isCorrect = correctChoice?.text === userAnswer.answer;
              userAnswerValue = userAnswer.answer;
              break;
  
            case 'TRUE_FALSE':
              correctAnswer = question.correctAnswer || false;
              isCorrect = userAnswer.answer === question.correctAnswer;
              userAnswerValue = userAnswer.answer;
              break;
  
            case 'FILL_BLANK':
              correctAnswer = question.correctAnswers?.[0]?.text || '';
              isCorrect = question.correctAnswers?.some(ans => {
                const userAns = userAnswer.answer as string;
                return ans.caseSensitive 
                  ? ans.text === userAns
                  : ans.text.toLowerCase() === userAns.toLowerCase();
              }) || false;
              userAnswerValue = userAnswer.answer;
              break;
          }
        } else {
          switch (question.questionType) {
            case 'MULTIPLE_CHOICE':
              correctAnswer = question.choices?.find(c => c.isCorrect)?.text || '';
              break;
            case 'TRUE_FALSE':
              correctAnswer = question.correctAnswer || false;
              break;
            case 'FILL_BLANK':
              correctAnswer = question.correctAnswers?.[0]?.text || '';
              break;
          }
        }
  
        return {
          questionId: question._id,
          questionType: question.questionType,
          userAnswer: userAnswerValue,
          correctAnswer,
          points: isCorrect ? question.points : 0,
          maxPoints: question.points,
          isCorrect,
          question: question.question,
          choices: question.choices
        };
      });
  
      const submissionData = {
        quizId: qid,
        courseId: cid,
        studentId: currentUser._id,
        answers: processedAnswers,
        startTime: startTime,
        endTime: new Date(),
        timeSpent: Math.round((new Date().getTime() - startTime.getTime()) / (1000 * 60)),
        score: scoreResult.score,
        maxScore: scoreResult.total,
        percentage: scoreResult.percentage,
        status: 'completed' as const
      };
  
      await dispatch(submitQuiz({ 
        quizId: qid,
        submission: submissionData 
      }) as any);
  
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview/submitted`, {
        state: { 
          userAnswers,
          startTime: startTime.getTime(),
          score: scoreResult.score,
          totalPoints: scoreResult.total,
          percentage: scoreResult.percentage
        }
      });
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };
  

  if (status === 'loading') {
    return (
      <div className="d-flex justify-content-center p-4">
        <div className="spinner-border" style={{ color: '#2D3B45' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const renderQuestionContent = (question: QuizQuestion) => {
    switch (question.questionType) {
      case 'MULTIPLE_CHOICE':
        return (
          <div className="mt-3">
            {question.choices?.map((choice, idx) => (
              <div key={idx} className="mb-2 d-flex align-items-start">
                <input
                  type="radio"
                  name={`question_${question._id}`}
                  checked={userAnswers.find(a => a.questionId === question._id)?.answer === choice.text}
                  onChange={() => handleAnswerChange(question._id, choice.text)}
                  className="mt-1 me-2"
                  style={{ 
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer'
                  }}
                />
                <span style={{ color: '#2D3B45', fontSize: '14px' }}>{choice.text}</span>
              </div>
            ))}
          </div>
        );
      
      case 'TRUE_FALSE':
        return (
          <div className="mt-3">
            <div className="mb-2 d-flex align-items-start">
              <input
                type="radio"
                name={`question_${question._id}`}
                checked={userAnswers.find(a => a.questionId === question._id)?.answer === true}
                onChange={() => handleAnswerChange(question._id, true)}
                className="mt-1 me-2"
                style={{ 
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer'
                }}
              />
              <span style={{ color: '#2D3B45', fontSize: '14px' }}>True</span>
            </div>
            <div className="mb-2 d-flex align-items-start">
              <input
                type="radio"
                name={`question_${question._id}`}
                checked={userAnswers.find(a => a.questionId === question._id)?.answer === false}
                onChange={() => handleAnswerChange(question._id, false)}
                className="mt-1 me-2"
                style={{ 
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer'
                }}
              />
              <span style={{ color: '#2D3B45', fontSize: '14px' }}>False</span>
            </div>
          </div>
        );
      
      case 'FILL_BLANK':
        return (
          <div className="mt-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your answer"
              value={userAnswers.find(a => a.questionId === question._id)?.answer as string || ''}
              onChange={(e) => handleAnswerChange(question._id, e.target.value)}
              style={{ maxWidth: '300px' }}
            />
          </div>
        );
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return (
      <div className="p-4 text-center">
        <p>Question not found.</p>
      </div>
    );
  }

  return (
    <div className="d-flex" style={{ padding: '20px' }}>
      <div style={{ flex: '1', marginRight: '20px', maxWidth: '800px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h3>{quiz?.title}</h3>
          {timeRemaining > 0 && (
            <div style={{ 
              backgroundColor: '#f5f5f5',
              padding: '8px 15px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '14px'
            }}>
              Time Remaining: {formatTime(timeRemaining)}
            </div>
          )}
        </div>

        <div style={{ color: '#333', marginBottom: '20px' }}>
          <div>Started: {startTime.toLocaleString()}</div>
        </div>

        <div style={{ 
          backgroundColor: '#FFFFFF',
          border: '1px solid #DEE2E6',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <div style={{
            borderBottom: '1px solid #DEE2E6',
            padding: '12px 15px',
            backgroundColor: '#F8F9FA'
          }}>
            <div style={{ fontSize: '14px' }}>
              Question {currentQuestionIndex + 1}
              <span style={{ color: '#6C757D', marginLeft: '8px' }}>
                {currentQuestion.points} pts
              </span>
            </div>
          </div>

          <div style={{ padding: '20px' }}>
            <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
              {currentQuestion.question}
            </div>
            {renderQuestionContent(currentQuestion)}
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #DEE2E6',
          paddingTop: '20px'
        }}>
          <div style={{ color: '#666', fontSize: '14px' }}>
            Quiz saved at {new Date().toLocaleTimeString()}
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            {currentQuestionIndex > 0 && (
              <button
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                style={{
                  backgroundColor: '#F8F9FA',
                  border: '1px solid #DEE2E6',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                Previous
              </button>
            )}

            <button
              onClick={() => {
                if (currentQuestionIndex < questions.length - 1) {
                  setCurrentQuestionIndex(prev => prev + 1);
                } else {
                  handleQuizSubmit();
                }
              }}
              style={{
                backgroundColor: '#F8F9FA',
                border: '1px solid #DEE2E6',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit Quiz'}
            </button>
          </div>
        </div>

        {isFacultyOrAdmin && (
        <div style={{ 
          borderTop: '1px solid #DEE2E6',
          marginTop: '20px',
          paddingTop: '20px'
          }}>
          <button
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/questions`)}
            style={{
              border: 'none',
              background: 'none',
              color: '#666',
              padding: '0',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            <i className="fas fa-pencil-alt" style={{ marginRight: '8px' }}></i>
            Keep Editing This Quiz
          </button>
        </div>
        )}
      </div>

      {/* Questions Navigation - Right Side */}
      <div style={{ width: '250px' }}>
        <div style={{ 
          backgroundColor: '#f5f5f5',
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '15px',
          position: 'sticky',
          top: '20px'
        }}>
          <h6 style={{ marginBottom: '15px', color: '#333' }}>Questions</h6>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {questions.map((question, index) => (
              <div
                key={question._id}
                onClick={() => setCurrentQuestionIndex(index)}
                style={{ 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: currentQuestionIndex === index ? '#D12B1F' : '#333',
                  padding: '5px'
                }}
              >
                <span style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: '1px solid #ddd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  backgroundColor: currentQuestionIndex === index ? '#fff' : 'transparent'
                }}>
                  {index + 1}
                </span>
                <span>Question {index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
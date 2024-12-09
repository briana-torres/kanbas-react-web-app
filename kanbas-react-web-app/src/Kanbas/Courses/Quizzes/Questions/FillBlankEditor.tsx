import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QuizQuestionForm, QuizQuestionRootState } from './questionTypes';
import { createQuestion, fetchQuestions, updateQuestionThunk } from './reducer';
import { useParams } from 'react-router-dom';


export default function FillBlankEditor({ 
  questionId, 
  onClose,
  points,
  setPoints 
}: { 
  questionId?: string; 
  onClose: () => void;
  points: number;
  setPoints: (points: number) => void;
}) {
  const dispatch = useDispatch();
  const { qid } = useParams();

  const question = useSelector((state: QuizQuestionRootState) =>
    questionId ? state.questionsReducer.questions.find(q => q._id === questionId) : undefined
  );

  const [questionText, setQuestionText] = useState(question?.question || '');
  const [answers, setAnswers] = useState(
    question?.correctAnswers || [{ text: '', caseSensitive: false }]
  );

  useEffect(() => {
    if (question) {
      setQuestionText(question.question);
      setAnswers(question.correctAnswers || [{ text: '', caseSensitive: false }]);
    }
  }, [question]);

  const handleSubmit = async () => {
    const questionData = {
      questionType: 'FILL_BLANK' as const,
      question: questionText,
      points: points,
      correctAnswers: answers.filter(answer => answer.text.trim() !== '') 
    };

    try {
      if (questionId) {
        // Update the question first
        const resultAction = await dispatch(updateQuestionThunk({
          questionId,
          question: questionData
        }) as any);
        
        // After successful update, fetch all questions to refresh the list
        if (updateQuestionThunk.fulfilled.match(resultAction)) {
          await dispatch(fetchQuestions(qid!) as any);
        }
      } else {
        // Create new question
        const resultAction = await dispatch(createQuestion({
          quizId: qid!,
          question: questionData
        }) as any);
        
        // After successful creation, fetch all questions to refresh the list
        if (createQuestion.fulfilled.match(resultAction)) {
          await dispatch(fetchQuestions(qid!) as any);
        }
      }
      onClose();
    } catch (error) {
      console.error('Error saving question:', error);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <p className="text-secondary mb-2">
          Enter your question text, then define all possible correct answers for the blank.
          Students will see the question followed by a small text box to type their answer.
        </p>
        
        <div className="border rounded">
          <div className="bg-light border-bottom p-2">
            <div className="d-flex gap-2">
              <select className="form-select form-select-sm" style={{ width: '70px' }}>
                <option>12pt</option>
              </select>
              <select className="form-select form-select-sm" style={{ width: '120px' }}>
                <option>Paragraph</option>
              </select>
              <div className="btn-group">
                <button className="btn btn-light btn-sm border">B</button>
                <button className="btn btn-light btn-sm border">I</button>
                <button className="btn btn-light btn-sm border">U</button>
              </div>
            </div>
          </div>
          
          <div className="p-3">
            <textarea 
              className="form-control border-0"
              placeholder="Question"
              rows={3}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h6>Answers:</h6>
        {answers.map((answer, index) => (
          <div key={index} className="mb-2">
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Possible Answer"
                value={answer.text}
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[index].text = e.target.value;
                  setAnswers(newAnswers);
                }}
              />
              <button 
                className="btn btn-link text-danger"
                onClick={() => setAnswers(answers.filter((_, i) => i !== index))}
                disabled={answers.length === 1} 
              >
                ×
              </button>
            </div>
          </div>
        ))}
        
        <button 
          className="btn btn-link text-danger"
          onClick={() => setAnswers([...answers, { text: '', caseSensitive: false }])}
        >
          + Add Another Answer
        </button>
      </div>

      <div className="d-flex justify-content-start gap-2">
        <button className="btn btn-light" onClick={onClose}>Cancel</button>
        <button
          onClick={handleSubmit}
          style={{ 
            border: 'none',
            padding: '6px 20px',
            background: '#DC332F',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          {questionId ? 'Update Question' : 'Create Question'}
        </button>
      </div>
    </div>
  );
}
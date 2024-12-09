import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QuizQuestionForm, QuizQuestionRootState } from './questionTypes';
import { createQuestion, fetchQuestions, updateQuestionThunk } from './reducer';
import { useParams } from 'react-router-dom';

export default function TrueFalseEditor({   questionId, 
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

  const [correctAnswer, setCorrectAnswer] = useState<boolean>(question?.correctAnswer ?? true);
  const [questionText, setQuestionText] = useState(question?.question || '');

  useEffect(() => {
    if (question) {
      setCorrectAnswer(question.correctAnswer ?? true);
      setQuestionText(question.question);
    }
  }, [question]);

  const handleSubmit = async () => {
    const questionData = {
      questionType: 'TRUE_FALSE' as const,
      question: questionText,
      points: points, 
      correctAnswer: correctAnswer
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
        <p className="text-secondary mb-2">Enter your question text, then select if True or False is the correct answer.</p>
        
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
        <div className="ms-2">
          <div className="form-check mb-2">
            <input
              type="radio"
              className="form-check-input"
              name="trueFalse"
              checked={correctAnswer === true}
              onChange={() => setCorrectAnswer(true)}
            />
            <label className="form-check-label">True</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="trueFalse"
              checked={correctAnswer === false}
              onChange={() => setCorrectAnswer(false)}
            />
            <label className="form-check-label">False</label>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-start gap-2">
        <button className="btn btn-light" onClick={onClose}>Cancel</button>
        <button 
          className="btn btn-danger" 
          onClick={handleSubmit}
        >
          {questionId ? 'Update Question' : 'Create Question'}
        </button>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QuizQuestionForm, QuizQuestionRootState } from './questionTypes';
import { createQuestion, fetchQuestions, updateQuestionThunk } from './reducer';
import { useParams } from 'react-router-dom';

export default function MultipleChoiceEditor({  questionId, 
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
  const [answers, setAnswers] = useState(() => 
    question?.choices 
      ? [...question.choices.map(choice => ({ ...choice }))]
      : [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: true }
        ]
  );
  

  useEffect(() => {
    if (question) {
      setQuestionText(question.question);
      setAnswers([...(question.choices || []).map(choice => ({ ...choice }))]);
    }
  }, [question]);

  const handleSubmit = async () => {
    if (!answers.some(answer => answer.isCorrect)) {
      alert('Please select a correct answer');
      return;
    }

    if (answers.some(answer => answer.text.trim() === '')) {
      alert('Please fill in all answer choices');
      return;
    }

    const questionData = {
      questionType: 'MULTIPLE_CHOICE' as const,
      question: questionText,
      points: points,
      choices: answers.filter(answer => answer.text.trim() !== '')
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
        <p className="text-secondary mb-2">Enter your question and multiple answers, then select the one correct answer.</p>
        
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
          <div key={index} className="d-flex align-items-center gap-2 mb-2">
            <div style={{ width: '24px' }}>
              <input
                type="radio"
                name="correctAnswer"
                checked={answer.isCorrect}
                onChange={() => {
                  setAnswers(answers.map((a, i) => ({
                    ...a,
                    isCorrect: i === index
                  })));
                }}
              />
            </div>
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
            {answers.length > 2 && (
              <button 
                className="btn btn-link text-danger"
                onClick={() => setAnswers(answers.filter((_, i) => i !== index))}
              >
                ×
              </button>
            )}
          </div>
        ))}
        
        <button 
          className="btn btn-link text-danger"
          onClick={() => setAnswers([...answers, { text: '', isCorrect: false }])}
        >
          + Add Another Answer
        </button>
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
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QuizQuestion, QuizQuestionRootState } from './questionTypes';
import MultipleChoiceEditor from './MultipleChoiceEditor';
import TrueFalseEditor from './TrueFalseEditor';
import FillBlankEditor from './FillBlankEditor';
import {updateQuiz} from '../reducer';
import * as quizClient from "../client";
import { Quiz, QuizRootState } from '../types';

export default function QuestionEditor({ questionId, onClose }: { questionId?: string; onClose: () => void }) {
  const question = useSelector((state: QuizQuestionRootState) =>
    questionId ? state.questionsReducer.questions.find(q => q._id === questionId) : undefined
  );
  const dispatch = useDispatch();
  // Get all questions for the current quiz
  const quizQuestions = useSelector((state: QuizQuestionRootState) =>
    state.questionsReducer.questions.filter(q => q.quizId === question?.quizId)
  );

  const [questionType, setQuestionType] = useState(question?.questionType || 'MULTIPLE_CHOICE');
  const [points, setPoints] = useState(question?.points || 4);

  const quiz = useSelector((state: QuizRootState) => 
    state.quizzesReducer.quizzes.find((q: Quiz) => q._id === question?.quizId)
  );

    // Calculate quiz total points excluding current question if editing
    const totalPoints = quizQuestions
    .filter(q => q._id !== questionId)
    .reduce((sum, q) => sum + (q.points || 0), 0) + points;

  const handlePointsChange = async (newPoints: number) => {
    setPoints(newPoints);

    if (!quiz || !quiz._id) {
      console.error("Quiz not found");
      return;
    }
  
  
    dispatch(updateQuiz({
      ...quiz,
      points: totalPoints
    }));

    // Update in database
    try {
      await quizClient.updateQuiz(quiz._id, {
        ...quiz,
        points: totalPoints
      });
    } catch (error) {
      console.error("Error updating quiz points:", error);
    }
  };
  

  useEffect(() => {
    if (question?.questionType) {
      setQuestionType(question.questionType);
    }
  }, [question]);

  const renderQuestionEditor = () => {
    const editorProps = {
      questionId,
      onClose,
      points,
      setPoints
    };

    switch (questionType) {
      case 'MULTIPLE_CHOICE':
        return <MultipleChoiceEditor {...editorProps} />;
      case 'TRUE_FALSE':
        return <TrueFalseEditor {...editorProps} />;
      case 'FILL_BLANK':
        return <FillBlankEditor {...editorProps} />;
      default:
        return <MultipleChoiceEditor {...editorProps} />;
    }
  };


  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-3">
          <select
            className="form-select"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as QuizQuestion['questionType'])}
            style={{ width: 'auto' }}
          >
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option value="TRUE_FALSE">True/False</option>
            <option value="FILL_BLANK">Fill in the Blank</option>
          </select>
          <div className="d-flex align-items-center">
            <span className="me-2">Question Points:</span>
            <input
              type="number"
              className="form-control"
              style={{ width: '60px' }}
              value={points}
              onChange={(e) => handlePointsChange(parseInt(e.target.value) || 0)}
              
            />
            <span className="ms-3">
              Quiz Total: {totalPoints} pts
            </span>
          </div>
        </div>
      </div>
      {renderQuestionEditor()}
    </div>
  );
}
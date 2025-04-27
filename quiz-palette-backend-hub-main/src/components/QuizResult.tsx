
import React from 'react';
import { Button } from '@/components/ui/button';
import { QuizQuestion } from '../types/quiz';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  answers: { questionId: string; selectedAnswer: string; correct: boolean }[];
  questions: QuizQuestion[];
  onRestart: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({
  score,
  totalQuestions,
  answers,
  questions,
  onRestart,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getFeedbackMessage = () => {
    if (percentage >= 80) {
      return "Excellent! You've mastered this quiz!";
    } else if (percentage >= 60) {
      return "Good job! You have a solid understanding.";
    } else if (percentage >= 40) {
      return "Not bad! You're making progress.";
    } else {
      return "Keep trying! You'll improve with practice.";
    }
  };

  return (
    <div className="animate-bounce-in bg-white rounded-xl p-6 sm:p-8 shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">Quiz Completed!</h2>
      <p className="text-center text-gray-600 mb-6">{getFeedbackMessage()}</p>
      
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="relative w-40 h-40 mb-4">
          <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-4xl font-bold text-quiz-primary">{percentage}%</span>
          </div>
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="5"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={percentage >= 60 ? '#7C5CFC' : percentage >= 40 ? '#94A3B8' : '#F87171'}
              strokeWidth="5"
              strokeDasharray={`${percentage * 2.83} 283`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
        </div>
        <p className="text-xl font-medium">
          You scored {score} out of {totalQuestions}
        </p>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Question Summary:</h3>
        <div className="space-y-3">
          {answers.map((answer, index) => {
            const question = questions.find(q => q.id === answer.questionId);
            const selectedOption = question?.options.find(o => o.id === answer.selectedAnswer);
            const correctOption = question?.options.find(o => o.id === question?.correctAnswer);
            
            return (
              <div 
                key={answer.questionId} 
                className={`p-3 rounded-lg ${answer.correct ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}
              >
                <p className="font-medium mb-1">Question {index + 1}: {question?.question}</p>
                <p className={`text-sm ${answer.correct ? 'text-green-600' : 'text-red-600'}`}>
                  Your answer: {selectedOption?.text}
                  {!answer.correct && correctOption && (
                    <span className="block text-green-600 mt-1">
                      Correct answer: {correctOption.text}
                    </span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      
      <Button onClick={onRestart} className="w-full">Restart Quiz</Button>
    </div>
  );
};

export default QuizResult;

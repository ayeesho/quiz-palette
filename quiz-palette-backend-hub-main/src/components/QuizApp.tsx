import React, { useState, useEffect } from 'react';
import { quizQuestions } from '../data/quizData';
import { QuizState } from '../types/quiz';
import ProgressBar from './ProgressBar';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const QuizApp: React.FC = () => {
  const { toast } = useToast();
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedAnswer: null,
    score: 0,
    answers: [],
    quizCompleted: false,
  });
  const [showFeedback, setShowFeedback] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const currentQuestion = quizQuestions[quizState.currentQuestionIndex];

  const handleStartQuiz = () => {
    setIsStarted(true);
  };

  const handleAnswerSubmit = (answer: string) => {
    const correct = answer === currentQuestion.correctAnswer;
    
    // Show feedback first
    setShowFeedback(true);
    
    // Show toast with feedback
    toast({
      title: correct ? "Correct!" : "Incorrect!",
      description: correct 
        ? "Great job! You got it right." 
        : `The correct answer was ${quizQuestions[quizState.currentQuestionIndex].options.find(
            opt => opt.id === currentQuestion.correctAnswer
          )?.text}.`,
      variant: correct ? "default" : "destructive",
    });
    
    // Update the quiz state with the new answer and score
    setQuizState(prev => ({
      ...prev,
      selectedAnswer: answer,
      score: correct ? prev.score + 1 : prev.score,
      answers: [
        ...prev.answers,
        {
          questionId: currentQuestion.id,
          selectedAnswer: answer,
          correct,
        },
      ],
    }));
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    
    // If we're on the last question, complete the quiz
    if (quizState.currentQuestionIndex === quizQuestions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        quizCompleted: true,
      }));
      return;
    }
    
    // Otherwise, move to the next question
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      selectedAnswer: null,
    }));
  };

  const handleRestartQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      selectedAnswer: null,
      score: 0,
      answers: [],
      quizCompleted: false,
    });
    setShowFeedback(false);
  };

  // Listen for Next button clicks
  useEffect(() => {
    if (showFeedback) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          handleNextQuestion();
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [showFeedback]);

  if (!isStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-xl p-6 sm:p-8 animate-bounce-in">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-quiz-primary">Web Development Quiz</h1>
            <p className="text-gray-600 mb-6">Test your knowledge with this interactive quiz about web development fundamentals.</p>
            <Button onClick={handleStartQuiz} size="lg" className="px-8">Start Quiz</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        {!quizState.quizCompleted ? (
          <Card className="p-6 sm:p-8">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-500">
                  Question {quizState.currentQuestionIndex + 1} of {quizQuestions.length}
                </p>
                <p className="text-sm font-medium text-gray-500">
                  Score: {quizState.score}
                </p>
              </div>
              <ProgressBar
                currentQuestion={quizState.currentQuestionIndex + 1}
                totalQuestions={quizQuestions.length}
              />
            </div>
            
            <QuizQuestion
              question={currentQuestion}
              onAnswerSubmit={handleAnswerSubmit}
              showFeedback={showFeedback}
            />
            
            {showFeedback && (
              <div className="mt-4">
                <Button onClick={handleNextQuestion} className="w-full">
                  {quizState.currentQuestionIndex === quizQuestions.length - 1
                    ? 'View Results'
                    : 'Next Question'}
                </Button>
              </div>
            )}
          </Card>
        ) : (
          <QuizResult
            score={quizState.score}
            totalQuestions={quizQuestions.length}
            answers={quizState.answers}
            questions={quizQuestions}
            onRestart={handleRestartQuiz}
          />
        )}
      </div>
    </div>
  );
};

export default QuizApp;

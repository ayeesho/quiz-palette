
import { useState, useEffect } from 'react';
import { QuizQuestion as QuestionType } from '../types/quiz';
import { Button } from '@/components/ui/button';
import QuizOption from './QuizOption';

interface QuizQuestionProps {
  question: QuestionType;
  onAnswerSubmit: (answer: string) => void;
  showFeedback: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswerSubmit,
  showFeedback,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasFeedback, setHasFeedback] = useState(false);

  // Reset selected option when question changes
  useEffect(() => {
    setSelectedOption(null);
    setHasFeedback(false);
  }, [question.id]);

  // Update feedback state based on prop
  useEffect(() => {
    setHasFeedback(showFeedback);
  }, [showFeedback]);

  const handleOptionSelect = (optionId: string) => {
    if (!hasFeedback) {
      setSelectedOption(optionId);
    }
  };

  const handleSubmit = () => {
    if (selectedOption) {
      onAnswerSubmit(selectedOption);
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">{question.question}</h2>
      <div className="space-y-2">
        {question.options.map((option) => (
          <QuizOption
            key={option.id}
            option={option}
            isSelected={selectedOption === option.id}
            isDisabled={hasFeedback}
            isCorrect={hasFeedback && option.id === question.correctAnswer}
            isIncorrect={hasFeedback && selectedOption === option.id && option.id !== question.correctAnswer}
            onSelect={handleOptionSelect}
          />
        ))}
      </div>
      <div className="mt-6">
        <Button 
          onClick={handleSubmit} 
          disabled={!selectedOption || hasFeedback} 
          className="w-full"
        >
          {hasFeedback ? 'Next Question' : 'Submit Answer'}
        </Button>
      </div>
    </div>
  );
};

export default QuizQuestion;

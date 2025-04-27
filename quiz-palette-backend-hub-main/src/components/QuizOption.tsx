
import { QuizOption as OptionType } from '../types/quiz';
import { cn } from '@/lib/utils';

interface QuizOptionProps {
  option: OptionType;
  isSelected: boolean;
  isDisabled: boolean;
  isCorrect?: boolean;
  isIncorrect?: boolean;
  onSelect: (optionId: string) => void;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  isDisabled,
  isCorrect,
  isIncorrect,
  onSelect,
}) => {
  const handleClick = () => {
    if (!isDisabled) {
      onSelect(option.id);
    }
  };

  return (
    <button
      className={cn(
        "w-full p-4 mb-3 text-left rounded-lg border border-gray-200 transition-all duration-200 hover:border-quiz-primary",
        isSelected && !isCorrect && !isIncorrect && "border-quiz-primary bg-purple-50",
        isCorrect && "border-quiz-correct bg-green-50",
        isIncorrect && "border-quiz-incorrect bg-red-50",
        isDisabled && !isSelected && "opacity-70 hover:border-gray-200 cursor-not-allowed",
      )}
      onClick={handleClick}
      disabled={isDisabled}
      aria-pressed={isSelected}
    >
      <div className="flex items-center">
        <div className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full mr-3 text-white text-sm font-medium",
          isSelected && !isCorrect && !isIncorrect && "bg-quiz-primary",
          isCorrect && "bg-quiz-correct",
          isIncorrect && "bg-quiz-incorrect",
          !isSelected && !isCorrect && !isIncorrect && "bg-quiz-neutral"
        )}>
          {option.id.toUpperCase()}
        </div>
        <span className="text-gray-800">{option.text}</span>
      </div>
    </button>
  );
};

export default QuizOption;

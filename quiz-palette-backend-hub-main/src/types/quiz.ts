
export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctAnswer: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  selectedAnswer: string | null;
  score: number;
  answers: { questionId: string; selectedAnswer: string; correct: boolean }[];
  quizCompleted: boolean;
}


import { QuizQuestion } from '../types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What does HTML stand for?',
    options: [
      { id: 'a', text: 'Hyper Text Markup Language' },
      { id: 'b', text: 'High Technology Modern Language' },
      { id: 'c', text: 'Hyper Transfer Markup Language' },
      { id: 'd', text: 'Home Tool Markup Language' }
    ],
    correctAnswer: 'a'
  },
  {
    id: '2',
    question: 'Which of the following is a JavaScript framework?',
    options: [
      { id: 'a', text: 'Django' },
      { id: 'b', text: 'Flask' },
      { id: 'c', text: 'React' },
      { id: 'd', text: 'Ruby on Rails' }
    ],
    correctAnswer: 'c'
  },
  {
    id: '3',
    question: 'Which CSS property is used to change the text color?',
    options: [
      { id: 'a', text: 'background-color' },
      { id: 'b', text: 'text-color' },
      { id: 'c', text: 'font-color' },
      { id: 'd', text: 'color' }
    ],
    correctAnswer: 'd'
  },
  {
    id: '4',
    question: 'What does API stand for?',
    options: [
      { id: 'a', text: 'Application Programming Interface' },
      { id: 'b', text: 'Application Process Integration' },
      { id: 'c', text: 'Advanced Programming Interface' },
      { id: 'd', text: 'Automated Processing Interface' }
    ],
    correctAnswer: 'a'
  },
  {
    id: '5',
    question: 'Which of the following is NOT a JavaScript data type?',
    options: [
      { id: 'a', text: 'String' },
      { id: 'b', text: 'Boolean' },
      { id: 'c', text: 'Character' },
      { id: 'd', text: 'Number' }
    ],
    correctAnswer: 'c'
  }
];

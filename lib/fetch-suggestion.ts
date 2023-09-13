import { Board } from '@/typings';
import FormatTodosForAI from './format-todos-for-ai';

const fetchSuggestion = async (board: Board) => {
  const todos = FormatTodosForAI(board);
  console.log(todos, 'todostodostodos');
  const res = await fetch('api/generate-summary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ todos }),
  });
  const GPTData = await res.json();
  const { content } = GPTData;
  return content;
};

export default fetchSuggestion;

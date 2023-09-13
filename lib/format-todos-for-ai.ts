import { Board, TypedColumn } from '@/typings';

const FormatTodosForAI = (board: Board) => {
  const todos = Array.from(board.columns.entries());
  let flatArrayCounted = todos.reduce((acc, item) => {
    acc[item[0]] = item[1].todos.length;
    return acc;
  }, {} as { [key in TypedColumn]: number });
  return flatArrayCounted;
};

export default FormatTodosForAI;

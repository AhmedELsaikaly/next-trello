'use client';
import React, { useMemo } from 'react';
import { Todo, TypedColumn } from '@/typings';
import { PlusCircleIcon } from '@heroicons/react/20/solid';

import { Draggable, Droppable } from 'react-beautiful-dnd';
import { TodoCard } from '..';
import { useBoardStore, useModalStore } from '@/store';

type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
};

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: 'Todo',
  inprogress: 'InProgress',
  done: 'Done',
};

const Column = ({ id, todos, index }: Props) => {
  const { searchString, setNewTaskType } = useBoardStore();
  const { openModal } = useModalStore();
  const finalTodosLength = useMemo(() => {
    if (searchString) {
      return todos.filter((todoItem) =>
        todoItem.title.toLocaleLowerCase().includes(searchString)
      ).length;
    } else {
      return todos.length;
    }
  }, [searchString, todos]);

  const handleAddTodo = () => {
    setNewTaskType(id);
    openModal();
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {/* render droppable todos in the columns */}
          <Droppable droppableId={index.toString()} type='card'>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? 'bg-green-200' : 'bg-white/50'
                }`}
              >
                <h2 className='flex justify-between font-bold text-xl p-2'>
                  {idToColumnText[id]}
                  <span className='text-gray-500 bg-gray-200 rounded-full px-2 py-2 text-sm font-normal'>
                    {!searchString ? todos.length : finalTodosLength}
                  </span>
                </h2>
                <div className='space-y-2'>
                  {todos.map((todo, index) => {
                    if (
                      searchString &&
                      !todo.title
                        .toLocaleLowerCase()
                        .includes(searchString.toLocaleLowerCase())
                    ) {
                      return null;
                    } else {
                      return (
                        <Draggable
                          key={todo.$id}
                          draggableId={todo.$id}
                          index={index}
                        >
                          {(provided) => (
                            <TodoCard
                              todo={todo}
                              index={index}
                              id={id}
                              innerRef={provided.innerRef}
                              dragHandleProps={provided.dragHandleProps}
                              draggableProps={provided.draggableProps}
                            />
                          )}
                        </Draggable>
                      );
                    }
                  })}
                  {provided.placeholder}
                  <div className='flex items-end justify-end'>
                    <button
                      onClick={handleAddTodo}
                      className='text-green-500 hover:text-green-600'
                    >
                      <PlusCircleIcon className='h-10 w-10' />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;

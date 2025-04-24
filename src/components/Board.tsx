'use client';

import { useEffect, useState } from 'react';
import { getColumnDataByBoard } from '@/app/actions/BoardActions/route';
import TaskCard from './TaskCards';
import { DoorClosed } from 'lucide-react';
import NewColumnButton from './new/NewColumnButton';
import NewTaskButton from './new/NewTaskButton';

interface ColumnData {
  id: string;
  name: string;
  tasks: {
    id: string;
    title: string;
    subtasks: { is_complete: boolean }[];
  }[];
}

export default function Board({ boardId, boardName }: { boardId: string, boardName:string }) {
  const [columns, setColumns] = useState<ColumnData[]>([]);

  const getColumns = () => {
    getColumnDataByBoard(boardId).then(setColumns).catch(console.error);
  }
  useEffect(() => {
   getColumns();
  }, [boardId]);

  return (
    <div className="flex-1 bg-gray-50 text-gray-900 overflow-auto min-h-screen">
      <header className="flex justify-between items-center mb-6 bg-white border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold">{boardName}</h1>
        {columns?.length > 0 &&
        <NewTaskButton
        boardId={boardId}
        columns={columns.map((col) => ({ id: col.id, name: col.name }))}
        onTaskAdded={getColumns}
        /> }
      </header>

    <div className='p-6'>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
            {columns.map((col) => (
            <div key={col.id} className="bg-white border p-4 rounded-lg shadow-sm min-h-[300px] flex flex-col gap-4">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">{col.name}</h2>
                {col.tasks.length == 0 && <div className='flex flex-col items-center text-gray-600 text-2xl justify-center font-light gap-4'> <DoorClosed height={100} width={100}></DoorClosed> No Tasks</div>}
                {col.tasks.map((task) => {
                const total = task.subtasks.length;
                const done = task.subtasks.filter(st => st.is_complete).length;
                return (
                    <TaskCard
                    key={task.id}
                    title={task.title}
                    completedSubtasks={done}
                    totalSubtasks={total}
                    />
                );
                })}
            </div>
            ))}

            <NewColumnButton
            boardId={boardId}
            onColumnAdded={getColumns}
            position={columns.length}
            />
        </div>
      </div>
    </div>
  );
}

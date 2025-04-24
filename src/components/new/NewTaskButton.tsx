'use client';

import { useState } from 'react';

interface ColumnOption {
  id: string;
  name: string;
}

export default function NewTaskButton({
  boardId,
  columns,
  onTaskAdded,
}: {
  boardId: string;
  columns: ColumnOption[];
  onTaskAdded: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [columnId, setColumnId] = useState(columns[0]?.id || '');

  const handleSubmit = async () => {
    if (!taskName.trim() || !columnId) return;

    await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ columnId, title: taskName.trim() }),
      headers: { 'Content-Type': 'application/json' },
    });

    setTaskName('');
    setColumnId(columns[0]?.id || '');
    setOpen(false);
    onTaskAdded();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm"
      >
        + Add New Task
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Add New Task</h2>

            <label className="block text-sm mb-1">Select Column To Add This Task</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={columnId}
              onChange={(e) => setColumnId(e.target.value)}
            >
              {columns.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.name}
                </option>
              ))}
            </select>

            <label className="block text-sm mb-1">Task Name</label>
            <input
              type="text"
              placeholder="e.g. Build login page"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />

          

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

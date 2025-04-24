'use client';

import { useState } from 'react';

export default function NewColumnButton({
  boardId,
  onColumnAdded,
  position,
}: {
  boardId: string;
  onColumnAdded: () => void;
  position: number;
}) {
  const [open, setOpen] = useState(false);
  const [columnName, setColumnName] = useState('');

  const handleSubmit = async () => {
    if (!columnName.trim()) return;
    await fetch('/api/columns', {
      method: 'POST',
      body: JSON.stringify({ boardId, name: columnName.trim(), position }),
      headers: { 'Content-Type': 'application/json' },
    });
    setColumnName('');
    setOpen(false);
    onColumnAdded();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="border-2 border-dashed border-gray-300 hover:border-indigo-400 text-gray-500 hover:text-indigo-600 rounded-lg flex items-center justify-center text-sm font-medium min-h-[300px] p-4 transition-all"
      >
        + New Column
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Add New Column</h2>
            <input
              type="text"
              placeholder="Column Name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
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
                Add Column
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

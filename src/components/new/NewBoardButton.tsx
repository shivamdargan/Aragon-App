'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function NewBoardButton({
  onBoardAdded
}: {
  onBoardAdded: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [boardName, setBoardName] = useState('');

  const handleSubmit = async () => {
    if (!boardName.trim()) return;
    await fetch('/api/boards', {
      method: 'POST',
      body: JSON.stringify({ name: boardName.trim() }),
      headers: { 'Content-Type': 'application/json' },
    });
    setBoardName('');
    setOpen(false);
    onBoardAdded();
  };

  return (
    <>
      <button 
       onClick={() => setOpen(true)}
       className="py-2 px-4 text-indigo-600 hover:text-indigo-800 flex items-center gap-2 mt-4">
          <Plus className="h-4 w-4" /> Create New Board
        </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Add New Board</h2>
            <input
              type="text"
              placeholder="Board Name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
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

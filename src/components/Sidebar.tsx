'use client';

import { useEffect, useState } from 'react';
import getAllBoards from '@/app/actions/BoardActions/route';
import { Menu, X } from "lucide-react"; // Icon library
import { LayoutDashboard } from 'lucide-react';
import { BoardType } from '@/types/utils';
import NewBoardButton from './new/NewBoardButton';

interface SidebarProps {
  activeBoardId: string;
  onSelectBoard: any ;
}

export default function Sidebar({ activeBoardId, onSelectBoard }: SidebarProps) {
  const [boards, setBoards] = useState<BoardType[]>([]);

  const getBoards = () => {
    getAllBoards().then(setBoards).catch(console.error);
  }
  useEffect(() => {
   getBoards();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    {/* Mobile menu toggle */}
    <button
        className="md:hidden p-4 z-30 text-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
  {/* Sidebar */}

  <aside
        className={`fixed h-screen top-0 left-0 w-64 bg-white text-black z-30 p-4 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex md:flex-col md:justify-between`}
      >
     <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <LayoutDashboard className="h-5 w-5" /> kanban
      </h2>
      <nav className="flex flex-col gap-2 text-sm flex-1">
        {boards.map((board) => (
          <button
            key={board.id}
            className={`py-2 px-4 rounded-md text-left font-medium ${
              board.id === activeBoardId ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'
            }`}
            onClick={() => onSelectBoard({id:board.id , name: board.name})}
          >
            {board.name}
          </button>
        ))}

        <NewBoardButton
        onBoardAdded={getBoards}
        />

      </nav>
    </aside>
    </>
  );
}

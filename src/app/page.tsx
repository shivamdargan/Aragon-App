'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Board from '@/components/Board';
import getAllBoards from './actions/BoardActions/route';
import { BoardType } from '@/types/utils';


export interface Board {

}
export default function Home() {
  const [activeBoard, setActiveBoard] = useState<BoardType | null>(null);

  useEffect(() => {
    getAllBoards().then((boards) => {
      if (boards.length > 0) {
          setActiveBoard({
          id:boards[0].id,
          name:boards[0].name
        });
    }
    });
  }, []);

  return (
    <main className="flex h-screen">
      <Sidebar activeBoardId={activeBoard?.id ?? ''} onSelectBoard={setActiveBoard} />
      {activeBoard ? 
      <Board boardId={activeBoard.id} boardName = {activeBoard.name}/> : 
      <div className="flex-1 flex items-center justify-center text-gray-500">Loading board...</div>}
    </main>
  );
}
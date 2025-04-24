"use server"
import { createClient } from '@/utils/supabase/server';

export default async function getAllBoards() {
  const supabase = await createClient();
  const { data: boards , error } = await supabase.from("boards")
  .select('id, name')
  .order('created_at');

  if (error) throw error;
  return boards; 
}

export const getColumnDataByBoard = async (boardId: string) => {
    const supabase = await createClient();
  const { data, error } =  await supabase.from("columns")
    .select(`id, name, position, tasks ( id, title, subtasks ( is_complete ) )`)
    .eq('board_id', boardId)
    .order('position');

  if (error) throw error;
  return data;
};

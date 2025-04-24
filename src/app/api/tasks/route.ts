"use server"
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {

  const { columnId, title } = await req.json();
  
  const supabase = await createClient();
  const { error } =  await supabase.from("tasks")
  .insert([
    {
      column_id: columnId,
      title,
    },
  ]);


  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

import { NextResponse } from "next/server"
import { supabase, Room } from "@/lib/supabase"

export async function GET() {
  const { data, error } = await supabase.from("rooms").select("*")
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = (await request.json()) as Room
  const { data, error } = await supabase.from("rooms").insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

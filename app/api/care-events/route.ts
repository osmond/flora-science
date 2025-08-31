import { NextResponse } from "next/server"
import { supabase, CareEvent } from "@/lib/supabase"

export async function GET() {
  const { data, error } = await supabase.from("care_events").select("*")
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = (await request.json()) as CareEvent
  const { data, error } = await supabase
    .from("care_events")
    .insert(body)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

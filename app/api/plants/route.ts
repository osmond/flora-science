import { NextResponse } from "next/server"
import { supabase, Plant } from "@/lib/supabase"

export async function GET() {
  const { data, error } = await supabase.from("plants").select("*")
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = (await request.json()) as Plant
  const { data, error } = await supabase.from("plants").insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

import { NextResponse } from "next/server"
import { supabase, CareEvent } from "@/lib/supabase"

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { data, error } = await supabase
    .from("care_events")
    .select("*")
    .eq("id", params.id)
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = (await request.json()) as Partial<CareEvent>
  const { data, error } = await supabase
    .from("care_events")
    .update(body)
    .eq("id", params.id)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await supabase
    .from("care_events")
    .delete()
    .eq("id", params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}


import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Lê o corpo da requisição
    const { name, number, street, tripId } = body;

    // Verifica campos obrigatórios
    if (!name || !number || !street || !tripId) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes" }, { status: 400 });
    }

    // Insere o passageiro no banco de dados usando Supabase
    const { data, error } = await supabase
      .from("passengers")
      .insert([{ name, number, street, tripId }])
      .select("*"); // Retorna o registro inserido

    if (error) {
      console.error("Erro ao criar passageiro:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error("Erro ao processar a requisição:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

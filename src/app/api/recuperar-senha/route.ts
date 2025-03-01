import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from 'zod';

// definindo schema para a validação de input
const recoverySchema = z.object({
  email: z.string().min(1, 'O e-mail é obrigatório').email('Email inválido'),
  password: z
    .string()
    .min(1, 'Senha obrigatória')
    .min(8, 'A senha deve ter mais de 8 caracteres'),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = recoverySchema.parse(body);

        // Verificar se o email existe no banco de dados
        const user = await db.user.findUnique({
            where: { email },
        });

        // Se o usuário não existir, retornar erro
        if (!user) {
            console.log("Email não encontrado:", email);  // Log para debug
            return NextResponse.json(
                { message: 'Email não encontrado!' },
                { status: 404 }
            );
        }

        console.log("Email encontrado, preparando para atualizar a senha...");  // Log para debug

        // Se o email existir, criptografar a nova senha
        const hashedPassword = await hash(password, 10);

        console.log("Senha criptografada:", hashedPassword);  // Log para verificar a senha criptografada

        // Atualizar a senha do usuário
        const updatedUser = await db.user.update({
            where: { email },
            data: { password: hashedPassword },
        });

        console.log("Senha atualizada com sucesso para o email:", email);  // Log para confirmar que a atualização ocorreu

        return NextResponse.json(
            { message: 'Senha alterada com sucesso!' },
            { status: 200 }
        );
    } catch (error) {
        console.error("Erro ao atualizar senha:", error);  // Log de erro
        return NextResponse.json(
            { message: 'Algo deu errado', error },
            { status: 500 }
        );
    }
}

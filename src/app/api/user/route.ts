import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from 'zod'


// definindo schema para a validação de input
const userSchema = z
  .object({
    username: z.string().min(1, 'Nome de usuário é obrigatório').max(100),
    email: z.string().min(1, 'O e-mail é obrigatório').email('Email invalido'),
    password: z
      .string()
      .min(1, 'Senha obrigatória')
      .min(8, 'PA senha deve ter mais de 8 caracteres'),
  });

// export async function GET() {
//     return NextResponse.json({ sucess: true})
// }

export async function POST(req: Request) {
    console.log(process.env.DATABASE_URL, 'front e back')
    console.log(process.env.NEXT_PUBLIC_SUPABASE_URL, 'front e back prisma')
    try {
        const body = await req.json();
        console.log("Recebendo requisição com body:", body); // Log para debug

        const { email, username, password } = userSchema.parse(body);

        console.log("Validado pelo Zod:", { email, username });

        // Checando se o email já existe
        const existingUserByEmail = await db.user.findUnique({
            where: { email },
        });
        if (existingUserByEmail) {
            console.log("Usuário já existe com este email");
            return NextResponse.json(
                { user: null, message: 'Já existe usuário com este email' },
                { status: 409 }
            );
        }

        // Checando se o nome de usuário já existe
        const existingUserByUsername = await db.user.findUnique({
            where: { username },
        });
        if (existingUserByUsername) {
            console.log("Usuário já existe com este nome");
            return NextResponse.json(
                { user: null, message: 'Já existe usuário com este nome' },
                { status: 409 }
            );
        }

        console.log("Criando usuário...");
        const hashedPassword = await hash(password, 10);

        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        console.log("Usuário criado com sucesso:", newUser);

        const { password: NewUserPassword, ...rest } = newUser;

        return NextResponse.json(
            { user: rest, message: 'Usuário criado com sucesso!' },
            { status: 201 }
        );
    } catch (error) {
        console.error("Erro ao criar usuário:", error); // Adiciona detalhes do erro no log
        return NextResponse.json(
            { message: 'Algo deu errado', error: error },
            { status: 500 }
        );
    }
}

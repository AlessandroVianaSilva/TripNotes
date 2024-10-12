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
    try {
        const body = await req.json();
        const { email, username, password } = userSchema.parse(body);

        //checando se o email existe
        const existingUserByEmail = await db.user.findUnique({
            where: {email: email},
        });
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: 'Já existe usuário com este email'}, {status: 409})
        }

        //checando se o nome de usuário existe
        const existingUserByUsername = await db.user.findUnique({
            where: {username: username},
        });
        if (existingUserByUsername) {
            return NextResponse.json({ user: null, message: 'Já existe usuário com este com este nome'}, {status: 409})
        }

        const hashedPassword = await hash(password, 10);

        const NewUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            }
        });

        const  {password: NewUserPassword, ...rest} = NewUser

        return NextResponse.json({user: rest, message: 'Usuário criado com sucesso!'}, {status: 201});
    } catch (error) {
        return NextResponse.json({ message: 'Algo deu errado'}, {status: 500});
    }
}
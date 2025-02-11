
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  console.log("Middleware executado para:", req.nextUrl.pathname);
  
  // Verifique o token JWT diretamente no middleware
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  if (token) {
    console.log("Token JWT encontrado:", token); // Verifique o conteúdo do token
  } else {
    console.log("Token JWT não encontrado");
  }

  // Retorne a resposta com o token
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/viagem/:id*", "/viagem/:path*"], // Rotas protegidas
};

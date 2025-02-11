
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google"; // Importa o GoogleProvider
// import { db } from "./db";
// import { compare } from "bcrypt";

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(db),
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: 'jwt',
//   },
//   pages: {
//     signIn: '/login',
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         console.log("Tentativa de login:", credentials);
//         if (!credentials?.email || !credentials?.password) {
//           console.log("Faltando credenciais.");
//           return null;
//         }
      
//         const existingUser = await db.user.findUnique({
//           where: { email: credentials.email },
//         });
//         if (!existingUser) {
//           console.log("Usuário não encontrado.");
//           return null;
//         }
      
//         const passwordMatch = await compare(credentials.password, existingUser.password);
      
//         if (!passwordMatch) {
//           console.log("Senha incorreta.");
//           return null;
//         }
      
//         console.log("Login bem-sucedido:", existingUser);
      
//         // Verifique se o id realmente é um número ou string antes de passar
//         const user = {
//           id: existingUser.id.toString(),  // Convertendo para string caso seja um número ou UUID
//           username: existingUser.username,
//           email: existingUser.email,
//         };
      
//         console.log("Dados do usuário retornados:", user); // Verifique o conteúdo aqui
//         return user;
//       }
//     }),
//     GoogleProvider({
//         clientId: process.env.GOOGLE_CLIENT_ID!,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//         // console.log("Token no callback jwt:", token);
//         if (user) {
//         //   console.log("Usuário autenticado no callback jwt:", user); // Verifique se o `user` contém o id
//           return {
//             ...token,
//             userId: user.id,  // Aqui estamos armazenando o id do usuário no token
//             username: user.username,
//           };
//         }
//         return token;
//       },
//       async session({ session, token }) {
//         // console.log("Token no callback session:", token);
//         // console.log("Sessão antes de ser retornada:", session); // Verifique o conteúdo da sessão
      
//         // Atribua o userId da token para a sessão
//         return {
//           ...session,
//           user: {
//             ...session.user,
//             id: token.userId || null,  // Garantir que o userId esteja no token
//         username: token.username || null,  // Garantir que o username esteja no token
//           },
//         };
//       }
//       ,
//   },
// };
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"; // Importa o GoogleProvider
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',  // Página de login personalizada
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Tentativa de login:", credentials);
        if (!credentials?.email || !credentials?.password) {
          console.log("Faltando credenciais.");
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: { email: credentials.email },
        });
        if (!existingUser) {
          console.log("Usuário não encontrado.");
          return null;
        }

        const passwordMatch = await compare(credentials.password, existingUser.password);

        if (!passwordMatch) {
          console.log("Senha incorreta.");
          return null;
        }

        console.log("Login bem-sucedido:", existingUser);

        const user = {
          id: existingUser.id.toString(),  // Garantir que o id é uma string
          username: existingUser.username,
          email: existingUser.email,
        };

        console.log("Dados do usuário retornados:", user);
        return user;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          userId: user.id,  // Armazenando o id do usuário no token
          username: user.username,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.userId || null,  // Garantir que o userId esteja no token
          username: token.username || null,  // Garantir que o username esteja no token
        },
      };
    },
    async redirect({ url, baseUrl }) {
      // Redireciona para a página principal após o login
      return baseUrl;  // Pode personalizar para outra página, se necessário
    }
  },
};

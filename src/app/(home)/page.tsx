// import React from "react";
import TravelManager from "@/components/TravelList/TravelManager";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { redirect } from "next/navigation";

// export default async function TravelList() {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     redirect("/login");
//   }
//   // Aqui estamos passando o userId para o TravelManager diretamente
//   const userId = Number(session.user.id);

//   return (
//     <div>
//       <TravelManager userId={userId} />
//     </div>
//   );
// }
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function TravelList() {
  const session = await getServerSession(authOptions);

  // console.log("Sessão obtida:", session); // Adicione o log aqui para depuração
  // console.log("Sessão no Frontend:", session);

  if (session) {
    console.log("ID do usuário:", session.user.id);
  }

  if (!session) {
    redirect("/login");
  }

  const userId = Number(session.user.id);

  console.log("userId:", userId); // Verifique o valor do userId

  return (
    <div>
      <TravelManager userId={userId} />
    </div>
  );
}

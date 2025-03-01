// import React from "react";
import TravelManager from "@/components/TravelList/TravelManager";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function TravelList() {
  const session = await getServerSession(authOptions);

  if (session) {
    console.log("ID do usuário:", session.user.id);
  }

  if (!session) {
    redirect("/login");
  }

  const userId = Number(session.user.id);

  return (
    <div>
      <TravelManager userId={userId} />
    </div>
  );
}

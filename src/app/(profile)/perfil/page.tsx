"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import UserProfile from "@/components/ProfileDetail/UserProfile";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<{
    celphone?: string | null;
    username?: string | null;
  } | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!session?.user?.id) return;

      const { data, error } = await supabase
        .from("User")
        .select("celphone, username")
        .eq("id", session.user.id) // Mantendo o ID como string
        .single();

      if (error) {
        console.error("Erro ao buscar perfil:", error.message);
        return;
      }

      setUserProfile(data);
    };

    fetchUserProfile();
  }, [session?.user?.id]);

  if (status === "loading") return <p>Carregando...</p>;

  return (
    <div className="w-full mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Perfil do Usuário</h1>
      {session?.user && userProfile ? (
        <UserProfile
          userId={session.user.id} // Aqui passa o ID correto para o componente filho
          username={userProfile.username ?? "Não informado"}
          email={session.user.email ?? "Não informado"}
          image={session.user.image ?? null}
          celphone={userProfile.celphone ?? "Não informado"}
        />
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default ProfilePage;

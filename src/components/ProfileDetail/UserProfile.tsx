"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserProfileProps {
  userId: string;
  username?: string | null;
  email?: string | null;
  image?: string | null;
  celphone?: string | null;
}

const UserProfile: React.FC<UserProfileProps> = ({
  userId,
  username,
  email,
  image,
  celphone,
}) => {
  const [Name, setName] = useState(username || "");
  const [userEmail, setUserEmail] = useState(email || "");
  const [userCelphone, setUserCelphone] = useState(celphone || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const router = useRouter();

  const handleSave = () => {
    setIsModalOpen(true);
  };

  const confirmSave = async () => {
    if (!userId) {
      return;
    }
    const { error } = await supabase
      .from("User")
      .update({ username: Name, celphone: userCelphone })
      .eq("id", userId);

    if (error) {
      console.error("Erro ao atualizar perfil:", error.message);
      // alert("Erro ao atualizar perfil. Tente novamente.");
      toast.error("Erro ao atualizar perfil. Tente novamente.");

      return;
    }

    setIsModalOpen(false);
    // alert("Perfil atualizado com sucesso!");
    toast.success("Perfil atualizado com sucesso!");
  };

  const handleDeleteAccount = async () => {
    if (!userId) {
      // console.error("Usuário não autenticado.");
      toast.error("Erro: Usuário não autenticado.");
      return;
    }

    try {
      // Excluindo o usuário da tabela User
      const { error: deleteError } = await supabase
        .from("User")
        .delete()
        .eq("id", userId);

      if (deleteError) {
        console.error("Erro ao excluir conta:", deleteError.message);
        toast.error("Erro ao excluir conta. Tente novamente.");
        return;
      }

      // Deslogar o usuário
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) {
        console.error("Erro ao deslogar:", signOutError.message);
        toast.error("Erro ao deslogar. Tente novamente.");
        return;
      }

      toast.success("Conta encerrada com sucesso!");
      router.push("/login"); // Redirecionar para a página de login
    } catch (error) {
      console.error("Erro inesperado:", error);
      toast.error("Erro inesperado. Tente novamente.");
    }
  };

  return (
    <div className=" bg-white p-6 shadow-lg rounded-lg dark:bg-gray-800">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme={
          document.documentElement.classList.contains("dark") ? "dark" : "light"
        }
      />

      <h2 className="text-xl font-bold mb-4 text-gray-00 dark:text-white">
        Informações Pessoais de sua conta
      </h2>

      <div className="mb-4 ">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 dark:text-white">Nome</label>
            <input
              type="text"
              value={Name}
              onChange={(e) => {
                let value = e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, ""); // Remove números e caracteres especiais
                value = value.replace(/\s{2,}/g, " "); // Remove espaços duplos
                value = value
                  .toLowerCase()
                  .replace(/^\w/, (c) => c.toUpperCase()); // Mantém a primeira letra maiúscula
                if (value.length <= 25) {
                  setName(value);
                }
              }}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Nome"
            />
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 dark:text-white">
              Celular
            </label>
            <input
              type="text"
              value={userCelphone}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

                // Limita a 11 dígitos
                if (value.length > 11) {
                  value = value.slice(0, 11);
                }

                // Formata o número (XX)XXXXX-XXXX
                if (value.length <= 2) {
                  value = `(${value}`;
                } else if (value.length <= 7) {
                  value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else {
                  value = `(${value.slice(0, 2)}) ${value.slice(
                    2,
                    7
                  )}-${value.slice(7)}`;
                }

                setUserCelphone(value);
              }}
              className="w-full px-3 py-2 border rounded-lg "
              placeholder="(XX)XXXXX-XXXX"
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-white">Email</label>
        <input
          type="email"
          value={userEmail}
          readOnly
          className="w-full px-3 py-2 border rounded-lg cursor-not-allowed"
        />
      </div>
      <hr className="my-6 border-t-1 border-gray-300" />

      <h2 className="mb-2 font-semibold">Salvar alterações?</h2>
      <div className=" flex gap-4 ">
        <button
          onClick={handleSave}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg"
        >
          Salvar
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 text-white bg-red-500 rounded-lg"
        >
          Cancelar
        </button>
      </div>
      <hr className="my-6 border-t-1 border-gray-300" />

      <h3 className="mb-2 font-semibold">Deseja encerrar sua conta?</h3>
      <div className=" gap-4">
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="px-4 py-2 text-white dark:bg-red-600 bg-red-500 rounded-lg"
        >
          Encerrar Conta
        </button>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-lg text-gray-700 dark:text-white">
              Tem certeza que deseja encerrar sua conta?{" "}
              <span className="text-red-500">Essa ação é irreversível!</span>
            </p>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 text-white bg-red-500 rounded-lg"
              >
                Sim, encerrar conta
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-lg text-gray-700 dark:text-white">
              Tem certeza de que deseja salvar as alterações?
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={confirmSave}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg"
              >
                Sim
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-white bg-red-500 rounded-lg"
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

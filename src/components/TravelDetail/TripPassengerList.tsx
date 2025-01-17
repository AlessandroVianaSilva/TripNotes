
"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import AddingPassengerPopup from "./AddingPassengerPopup";
import { useRouter } from "next/navigation";

interface Passenger {
  id: number;
  name: string;
  destinationStreet: string;
  destinationNumber: string;
  tripId: number;
}

const TripPassengerList = () => {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [showPopup, setShowPopup] = useState(false); // Controla a visibilidade do popup
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); // Modal de confirmação de exclusão
  const [passengerToDelete, setPassengerToDelete] = useState<Passenger | null>(
    null
  ); // Viagem a ser excluída
  const router = useRouter();

  const fetchPassengers = async () => {
    const { data, error } = await supabase.from("passengers").select("*");

    if (error) {
      console.error("Erro ao buscar passageiros:", error.message);
    } else {
      // Verificando se 'data' é um array de 'Trip' e atualizando o estado
      if (Array.isArray(data)) {
        setPassengers(data); // Agora o TypeScript sabe que 'data' é um array de 'Trip'
      }
    }
  };

  const handlePassengerSave = (newPassenger: Passenger) => {
    console.log("Nova viagem recebida no pai:", newPassenger);
    setPassengers((prevPassengers) => [...prevPassengers, newPassenger]); // Adiciona a nova viagem ao estado
    setShowPopup(false); // Fecha o popup
  };

  // Função para excluir a viagem
  const handleDeletePassenger = async (id: number) => {
    const { error } = await supabase.from("passengers").delete().eq("id", id);

    if (error) {
      console.error("Erro ao excluir passageiro:", error.message);
    } else {
      setPassengers((prevPassengers) =>
        prevPassengers.filter((passenger) => passenger.id !== id)
      ); // Remove a viagem do estado
      setShowConfirmDelete(false); // Fecha a modal
    }
  };

  // Quando o botão Excluir for clicado, configura o estado da viagem a ser excluída
  const handleOpenDeleteConfirm = (passenger: Passenger) => {
    setPassengerToDelete(passenger);
    setShowConfirmDelete(true); // Exibe a modal de confirmação
  };

  // Carrega as viagens ao montar o componente
  useEffect(() => {
    fetchPassengers();
  }, []);

  return (
    <div className="p-4">
      <div>
      <h1 className="text-2xl font-bold mb-4">Passageiros</h1>

      {/* Botão para abrir o popup */}
      <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={() => setShowPopup(true)}
        >
          Adicionar
        </button>

        {/* Popup para adicionar viagem */}
        {showPopup && (
          <AddingPassengerPopup
            onPassengerSave={handlePassengerSave} // Passando a função para salvar a viagem
            setShowPopup={setShowPopup} // Passando a função para fechar o popup
          />
        )}

      </div>
    </div>
  );
};

export default TripPassengerList;

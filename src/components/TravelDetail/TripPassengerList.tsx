"use client";
// import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
// import AddingPassengerPopup from "./AddingPassengerPopup";
import { useRouter } from "next/navigation";
// import { Passenger } from "@prisma/client";

import { useEffect, useState } from "react";
import AddingPassengerPopup from "./AddingPassengerPopup";
// import { Passenger } from "@prisma/client";

interface Passenger {
  id: number;
  name: string;
  street: string;
  number: string;
  tripId: number;
}

const TripPassengerList = ({ tripId }: { tripId: number }) => {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [showPopup, setShowPopup] = useState(false); // Controla a visibilidade do popup
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); // Modal de confirmação de exclusão
  const [passengerToDelete, setPassengerToDelete] = useState<Passenger | null>(
    null
  ); // Viagem a ser excluída
  const router = useRouter();

  const fetchPassengers = async () => {
    const { data, error } = await supabase
      .from("passengers")
      .select("*")
      .eq("tripId", tripId); // Filtra pelo tripId

    if (error) {
      console.error("Erro ao buscar passageiros:", error.message);
    } else if (data) {
      setPassengers(data as Passenger[]);
    }
  };

  const handlePassengerSave = (newPassenger: Passenger) => {
    console.log("Nova viagem recebida no pai:", newPassenger);
    setPassengers((prevPassengers) => [...prevPassengers, newPassenger]); // Adiciona a nova viagem ao estado
    setShowPopup(false); // Fecha o popup
    console.log(newPassenger);
  };
  // const handlePassengerSave = (newPassenger: Passenger) => {
  //   setPassengers((prev) => [...prev, newPassenger]);
  // };

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
            onPassengerSave={handlePassengerSave}
            setShowPopup={setShowPopup}
            tripId={tripId} // Passa o tripId correto
          />
        )}
      </div>

      {/* Lista de viagens */}
      <div className="mt-6">
        {/* <h2 className="text-xl font-semibold">Passageiros:</h2> */}

        {passengers.length > 0 ? (
          <div className="mt-4">
            {/* Cabeçalho */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 p-3 bg-blue-500 text-white font-bold rounded-t dark:bg-blue-600 dark:text-white">
              <div>Origem</div>
              <div>Destino</div>
              <div>Data</div>
              <div>Visualizar</div>
              <div>Excluir</div>
            </div>

            {/* Lista de viagens */}
            {passengers.map((passenger) => (
              <div
                key={passenger.id}
                className="grid grid-cols-3 sm:grid-cols-5 gap-4 p-3 border-b last:border-none bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                {/* Colunas com dados */}
                <div>{passenger.name}</div>
                <div>{passenger.number}</div>
                {/* <div>{formatDate(trip.date)}</div> */}

                {/* Botão Visualizar */}
                <div>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                    // onClick={() => router.push(/viagem/${passenger.id})}
                  >
                    Visualizar
                  </button>
                </div>

                {/* Botão Excluir */}
                <div>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                    // onClick={() => handleOpenDeleteConfirm(trip)} // Chama a função para abrir a modal
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-2">Nenhuma viagem salva ainda.</p>
        )}
      </div>
    </div>
  );
};

export default TripPassengerList;

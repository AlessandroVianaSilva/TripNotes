// "use client";

// import { supabase } from "@/lib/supabaseClient";
// import { useState } from "react";
// import EditTravelPopup from "@/components/TravelDetail/EditTravelPopup";

// type DetailsProps = {
//   id: string;
// };

// export type Trip = {
//     id: number; // ID da viagem
//     origin: string; // Origem da viagem
//     destination: string; // Destino da viagem
//     time: string; // Horário da viagem
//     date: string; // Data da viagem
//   };

// const Details = async ({ id }: DetailsProps) => {
//   console.log("ID recebido:", id);
//   const [showEditPopup, setShowEditPopup] = useState(false);
//   const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
//   const [travels, setTravels] = useState<Trip[]>([]); // Estado para armazenar viagens

//   const tripId = parseInt(id, 10);

//   const { data: trip, error } = await supabase
//     .from("travels")
//     .select("*")
//     .eq("id", tripId)
//     .single();

//   if (error || !trip) {
//     console.error("Erro ao buscar viagem:", error);
//     return <p>Erro ao carregar os detalhes da viagem.</p>;
//   }

//   const { origin, destination, time, date } = trip;

//   const handleOpenEditPopup = (trip: Trip) => {
//     setSelectedTrip(trip);
//     setShowEditPopup(true);
//   };

//   const handleUpdateTrip = (updatedTrip: Trip) => {
//     // Atualiza a viagem na lista local
//     setTravels((prevTravels) =>
//       prevTravels.map((t) => (t.id === updatedTrip.id ? updatedTrip : t))
//     );
//   };

//   return (
//     <div className="mt-6">
//       <h2 className="text-xl font-semibold">Detalhes da Viagem:</h2>

//       {/* Cabeçalho */}
//       <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 p-3 bg-blue-500 text-white font-bold rounded-t dark:bg-blue-600 dark:text-white">
//         <div>Origem</div>
//         <div>Destino</div>
//         <div>Data</div>
//         <div>Horário</div>
//         <div>Editar</div>
//         <div>Excluir</div>
//       </div>

//       {/* Detalhes da viagem */}
//       <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 p-3 border-b last:border-none bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
//         <div>{origin}</div>
//         <div>{destination}</div>
//         <div>{new Date(date).toLocaleDateString()}</div>
//         <div>{time}</div>
//         {/* </div> */}

//         {/* Botão Editar */}
//         <div>
//           <button
//             className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700"
//             onClick={() => handleOpenEditPopup(trip)} // Abre a modal
//           >
//             Editar
//           </button>
//         </div>
//         {showEditPopup && selectedTrip && (
//           <EditTravelPopup
//             trip={selectedTrip}
//             onUpdateTrip={handleUpdateTrip}
//             setShowPopup={setShowEditPopup}
//           />
//         )}

//         {/* Botão Excluir */}
//         <div>
//           <button
//             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
//             // onClick={() => handleDelete(tripId)}
//           >
//             Excluir
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Details;

"use client"; // Importante para que o componente seja tratado como cliente

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import EditTravelPopup from "@/components/TravelDetail/EditTravelPopup";
import React from "react";
import { useRouter } from "next/navigation";

export type Trip = {
  id: number;
  origin: string;
  destination: string;
  time: string;
  date: string;
};

type DetailsProps = {
  id: string;
};

const Details = ({ id }: DetailsProps) => {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [travels, setTravels] = useState<Trip[]>([]); // Estado para armazenar viagens
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); // Controle da modal de confirmação
  const [tripToDelete, setTripToDelete] = useState<Trip | null>(null); // Viagem a ser excluída
  const router = useRouter();

  const tripId = parseInt(id, 10);

  useEffect(() => {
    const fetchTripDetails = async () => {
      const { data: trip, error } = await supabase
        .from("travels")
        .select("*")
        .eq("id", tripId)
        .single();

      if (error || !trip) {
        console.error("Erro ao buscar viagem:", error);
        return;
      }

      setTravels([trip]); // Definir a viagem buscada como a lista de viagens
      setLoading(false); // Atualiza o estado para indicar que os dados foram carregados
    };

    fetchTripDetails();
  }, [tripId]); // Reexecuta quando o id da viagem mudar

  const handleOpenEditPopup = (trip: Trip) => {
    setSelectedTrip(trip);
    setShowEditPopup(true);
  };

  const handleUpdateTrip = (updatedTrip: Trip) => {
    // Atualiza a viagem na lista local
    setTravels((prevTravels) =>
      prevTravels.map((t) => (t.id === updatedTrip.id ? updatedTrip : t))
    );
  };

  const handleOpenDeleteConfirm = (trip: Trip) => {
    setTripToDelete(trip);
    setShowConfirmDelete(true); // Exibe a modal de confirmação
  };

  const handleDeleteTrip = async () => {
    if (!tripToDelete) return;

    const { error } = await supabase
      .from("travels")
      .delete()
      .eq("id", tripToDelete.id);

    if (error) {
      console.error("Erro ao excluir a viagem:", error);
      return;
    }

    setShowConfirmDelete(false); // Fecha a modal de confirmação
    router.push("/"); // Redireciona para a página inicial
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Detalhes da Viagem:</h2>

      {/* Cabeçalho */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 p-3 bg-blue-500 text-white font-bold rounded-t dark:bg-blue-600 dark:text-white">
        <div>Origem</div>
        <div>Destino</div>
        <div>Data</div>
        <div>Horário</div>
        <div>Editar</div>
        <div>Excluir</div>
      </div>

      {/* Detalhes da viagem */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 p-3 border-b last:border-none bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
        {travels.map((trip) => (
          <React.Fragment key={trip.id}>
            <div>{trip.origin}</div>
            <div>{trip.destination}</div>
            <div>{new Date(trip.date).toLocaleDateString()}</div>
            <div>{trip.time}</div>

            {/* Botão Editar */}
            <div>
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700"
                onClick={() => handleOpenEditPopup(trip)} // Abre a modal
              >
                Editar
              </button>
            </div>
            {showEditPopup && selectedTrip && (
              <EditTravelPopup
                trip={selectedTrip}
                onUpdateTrip={handleUpdateTrip}
                setShowPopup={setShowEditPopup}
              />
            )}

            {/* Botão Excluir */}
            <div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                onClick={() => handleOpenDeleteConfirm(trip)} // Chama a função para abrir a modal
              >
                Excluir
              </button>
            </div>
            {/* Modal de Confirmação de Exclusão */}
            {showConfirmDelete && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-gray-300 dark:bg-gray-800 p-6 rounded shadow-lg w-90">
                  <h2 className="text-xl font-semibold mb-4 text-center">
                    Você tem certeza?
                  </h2>
                  <div className="flex justify-center space-x-4">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={handleDeleteTrip} // Chama a função para excluir
                    >
                      Excluir
                    </button>
                    <button
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-black"
                      onClick={() => setShowConfirmDelete(false)} // Fecha a modal
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Details;
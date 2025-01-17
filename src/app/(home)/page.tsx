
// 'use client'
// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import AddingTravelPopup from "../../components/TravelList/AddingTravelPopup";

// type Trip = {
//   id: number;
//   origin: string;
//   destination: string;
//   time: string;
//   date: string;
// };

// const TravelManager = () => {
//   const [travels, setTravels] = useState<Trip[]>([]); // Estado para armazenar as viagens
//   const [showPopup, setShowPopup] = useState(false); // Controla a visibilidade do popup

//   // Função para buscar as viagens do Supabase
//   const fetchTravels = async () => {
//     const { data, error } = await supabase.from("travels").select("*");

//     if (error) {
//       console.error("Erro ao buscar viagens:", error.message);
//     } else {
//       // Verificando se 'data' é um array de 'Trip' e atualizando o estado
//       if (Array.isArray(data)) {
//         setTravels(data); // Agora o TypeScript sabe que 'data' é um array de 'Trip'
//       }
//     }
//   };

//   // Função chamada após salvar uma viagem
//   const handleTripSave = (newTrip: Trip) => {
//     console.log("Nova viagem recebida no pai:", newTrip);
//     setTravels((prevTravels) => [...prevTravels, newTrip]); // Adiciona a nova viagem ao estado
//     setShowPopup(false); // Fecha o popup
//   };

//   // Carrega as viagens ao montar o componente
//   useEffect(() => {
//     fetchTravels();
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Gerenciamento de Viagens</h1>

//       {/* Botão para abrir o popup */}
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         onClick={() => setShowPopup(true)}
//       >
//         Adicionar Viagem
//       </button>

//       {/* Popup para adicionar viagem */}
//       {showPopup && (
//         <AddingTravelPopup
//           onTripSave={handleTripSave} // Passando a função para salvar a viagem
//           setShowPopup={setShowPopup} // Passando a função para fechar o popup
//         />
//       )}

//       {/* Lista de viagens */}
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">Viagens Salvas:</h2>
//         {travels.length > 0 ? (
//           <ul className="mt-2 space-y-2">
//             {travels.map((trip) => (
//               <li key={trip.id} className="border p-3 rounded shadow-sm bg-gray-500">
//                 <p><strong>Origem:</strong> {trip.origin}</p>
//                 <p><strong>Destino:</strong> {trip.destination}</p>
//                 <p><strong>Horário:</strong> {trip.time}</p>
//                 <p><strong>Data:</strong> {trip.date}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="mt-2">Nenhuma viagem salva ainda.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TravelManager;

import TravelManager from '@/components/TravelList/TravelManager'
import React from 'react'

const TravelList = () => {
  return (
    <div className=''>
      <TravelManager />
    </div>
  )
}

export default TravelList



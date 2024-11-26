"use client";

import { useState } from "react";
import React from "react";

const AddingTravelPopup = () => {
const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Botão para abrir o popup */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={togglePopup}
      >
        Adicionar Viagem
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl text-gray-700 font-bold mb-4">Adicionar Nova Viagem</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="origin">
                  Origem
                </label>
                <input
                  type="text"
                  id="origin"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite a origem"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="destination">
                  Destino
                </label>
                <input
                  type="text"
                  id="destination"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite o destino"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="time">
                  Horário
                </label>
                <input
                  type="time"
                  id="time"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="date">
                  Data
                </label>
                <input
                  type="date"
                  id="date"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={togglePopup}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddingTravelPopup

// export default function addingTravelPopup() {
//   const [isOpen, setIsOpen] = useState(false);
//   const togglePopup = () => setIsOpen(!isOpen);

//   return (
//     <div>
//       {/* Botão para abrir o popup */}
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         onClick={togglePopup}
//       >
//         Adicionar Viagem
//       </button>

//       {/* Popup */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-xl font-bold mb-4">Adicionar Nova Viagem</h2>
//             <form>
//               <div className="mb-4">
//                 <label
//                   className="block text-gray-700 font-medium mb-2"
//                   htmlFor="origin"
//                 >
//                   Origem
//                 </label>
//                 <input
//                   type="text"
//                   id="origin"
//                   className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Digite a origem"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   className="block text-gray-700 font-medium mb-2"
//                   htmlFor="destination"
//                 >
//                   Destino
//                 </label>
//                 <input
//                   type="text"
//                   id="destination"
//                   className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Digite o destino"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   className="block text-gray-700 font-medium mb-2"
//                   htmlFor="time"
//                 >
//                   Horário
//                 </label>
//                 <input
//                   type="time"
//                   id="time"
//                   className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   className="block text-gray-700 font-medium mb-2"
//                   htmlFor="date"
//                 >
//                   Data
//                 </label>
//                 <input
//                   type="date"
//                   id="date"
//                   className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div className="flex justify-between">
//                 <button
//                   type="button"
//                   className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//                   onClick={togglePopup}
//                 >
//                   Cancelar
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                 >
//                   Salvar
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

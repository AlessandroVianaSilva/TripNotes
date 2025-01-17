// "use client";

// import { useState } from "react";
// import { supabase } from "@/lib/supabaseClient";

// type Trip = {
//   id: number;           // ID da viagem
//   origin: string;       // Origem da viagem
//   destination: string;  // Destino da viagem
//   time: string;         // Horário da viagem
//   date: string;         // Data da viagem
// };

// type AddingTravelPopupProps = {
//   onTripSave: (newTrip: Trip) => void;
//   setShowPopup: (show: boolean) => void;
// };

// const AddingTravelPopup = ({ onTripSave, setShowPopup }: AddingTravelPopupProps) => {
//   const [formData, setFormData] = useState<Trip>({
//     id: 0,
//     origin: "",
//     destination: "",
//     time: "",
//     date: "",
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // Aqui você pode chamar o onTripSave passando a nova viagem
//     onTripSave(formData);
//     setShowPopup(false);  // Fecha o popup após salvar
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-4">Adicionar Viagem</h2>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={formData.origin}
//             onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
//             placeholder="Origem"
//             className="mb-2 p-2 w-full border rounded"
//           />
//           <input
//             type="text"
//             value={formData.destination}
//             onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
//             placeholder="Destino"
//             className="mb-2 p-2 w-full border rounded"
//           />
//           <input
//             type="text"
//             value={formData.time}
//             onChange={(e) => setFormData({ ...formData, time: e.target.value })}
//             placeholder="Horário"
//             className="mb-2 p-2 w-full border rounded"
//           />
//           <input
//             type="date"
//             value={formData.date}
//             onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//             placeholder="Data"
//             className="mb-4 p-2 w-full border rounded"
//           />

//           <div className="flex justify-between">
//             <button
//               type="button"
//               className="text-red-500"
//               onClick={() => setShowPopup(false)} // Fecha o popup
//             >
//               Cancelar
//             </button>
//             <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//               Salvar Viagem
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddingTravelPopup;

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Trip = {
  id: number; // ID da viagem
  origin: string; // Origem da viagem
  destination: string; // Destino da viagem
  time: string; // Horário da viagem
  date: string; // Data da viagem
};

type AddingTravelPopupProps = {
  onTripSave: (newTrip: Trip) => void;
  setShowPopup: (show: boolean) => void;
};

const AddingTravelPopup = ({
  onTripSave,
  setShowPopup,
}: AddingTravelPopupProps) => {
  const [formData, setFormData] = useState<Trip>({
    id: 0,
    origin: "",
    destination: "",
    time: "",
    date: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Indica que o envio está em progresso

    const { origin, destination, time, date } = formData;

    try {
      const { data, error } = await supabase
        .from("travels")
        .insert([{ origin, destination, time, date }])
        .select("*"); // Garante que todos os campos sejam retornados

      if (error) {
        console.error("Erro ao salvar no Supabase:", error.message);
        setIsSubmitting(false);
        return;
      }

      const safeData = data as Trip[] | null;

      if (safeData && safeData.length > 0) {
        const newTrip = safeData[0];
        console.log("Viagem salva com sucesso no Supabase:", newTrip);
        onTripSave(newTrip);
      } else {
        console.error("Erro: Nenhum dado retornado pelo Supabase.");
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
    } finally {
      setIsSubmitting(false); // Finaliza o estado de envio
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow-lg w-96">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">Inserir dados</h2>
          
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={formData.origin}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(value)) {
                const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
                setFormData({ ...formData, origin: formattedValue });
              }
            }}
            placeholder="Origem"
            className="mb-2 p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700"
          />

          <input
            type="text"
            value={formData.destination}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(value)) {
                const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
                setFormData({ ...formData, destination: formattedValue });
              }
            }}
            placeholder="Destino"
            className="mb-2 p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700"
          />

          <input
            type="text"
            value={formData.time}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número
              if (value.length > 6) value = value.slice(0, 6); // Limita a 6 caracteres

              // Adiciona os ":" automaticamente
              if (value.length >= 5) {
                value = `${value.slice(0, 2)}:${value.slice(
                  2,
                  4
                )}:${value.slice(4, 6)}`;
              } else if (value.length >= 3) {
                value = `${value.slice(0, 2)}:${value.slice(2, 4)}`;
              }

              setFormData({ ...formData, time: value });
            }}
            placeholder="Horário (00:00:00)"
            className="mb-2 p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700"
          />

          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            placeholder="Data"
            className="mb-4 p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700"
            min={new Date().toISOString().split("T")[0]}
          />

          <div className="flex justify-between">
            <button
              type="button"
              className="text-red-500 dark:text-red-400"
              onClick={() => setShowPopup(false)} // Fecha o popup
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-blue-500 text-white px-4 py-2 rounded ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Salvando..." : "Salvar Viagem"}
            </button>
          </div>
        </form>
        </div>

      </div>
    </div>
  );
};

export default AddingTravelPopup;

"use client";
import { supabase } from "@/lib/supabaseClient";
import React, { useState } from "react";

type Passenger = {
  id: number;
  name: string;
  destinationStreet: string;
  destinationNumber: string;
  tripId: number;
};

type AddingPassengerPopupProps = {
  onPassengerSave: (newTrip: Passenger) => void;
  setShowPopup: (show: boolean) => void;
  // tripId: number; // O ID da viagem será passado pelo componente pai
};

const AddingPassengerPopup = ({
  onPassengerSave,
  setShowPopup,
}: AddingPassengerPopupProps) => {
  const [formData, setFormData] = useState<Passenger>({
    id: 0,
    name: "",
    destinationStreet: "",
    destinationNumber: "",
    tripId: 0,
    // tripId: tripId, // Define o tripId inicial
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Indica que o envio está em progresso

    const { name, destinationNumber, destinationStreet } = formData;

    try {
      const { data, error } = await supabase
        .from("passengens")
        .insert([{ name, destinationNumber, destinationStreet }])
        .select("*"); // Garante que todos os campos sejam retornados

      if (error) {
        console.error("Erro ao salvar no Supabase:", error.message);
        setIsSubmitting(false);
        return;
      }

      const safeData = data as Passenger[] | null;

      if (safeData && safeData.length > 0) {
        const newPassenger = safeData[0];
        console.log("Passageiro salvo com sucesso no Supabase:", newPassenger);
        onPassengerSave(newPassenger);
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
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">
            Inserir dados 
          </h2>
          <form onSubmit={handleSubmit}>


            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(value)) {
                  const formattedValue =
                    value.charAt(0).toUpperCase() + value.slice(1);
                  setFormData({ ...formData, name: formattedValue });
                }
              }}
              placeholder="Nome"
              className="mb-2 p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700"
            />

            <input
              type="text"
              value={formData.destinationNumber}
              // onChange={(e) => {
              //   const value = e.target.value;
              //   if (/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(value)) {
              //     const formattedValue =
              //       value.charAt(0).toUpperCase() + value.slice(1);
              //     setFormData({ ...formData, name: formattedValue });
              //   }
              // }}
              placeholder="Numero endereço"
              className="mb-2 p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700"
            />

            {/* <input
              type="text"
              value={formData.destinationStreet}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(value)) {
                  const formattedValue =
                    value.charAt(0).toUpperCase() + value.slice(1);
                  setFormData({ ...formData, name: formattedValue });
                }
              }}
              placeholder="Nome Rua"
              className="mb-2 p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700"
            /> */}

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

export default AddingPassengerPopup;

function onPassengerSave(newPassenger: Passenger) {
  throw new Error("Function not implemented.");
}

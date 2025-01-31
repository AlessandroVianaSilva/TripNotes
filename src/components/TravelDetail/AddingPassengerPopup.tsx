"use client";
import { supabase } from "@/lib/supabaseClient";
// import { Passenger } from "@prisma/client";
import React, { useState } from "react";


type Passenger = {
  id: number;
  name: string;
  street: string;
number: string;
  tripId: number;
};

type AddingPassengerPopupProps = {
  onPassengerSave: (newPassenger: Passenger) => void;
  setShowPopup: (show: boolean) => void;
  tripId: number; // O ID da viagem será passado pelo componente pai
};

const AddingPassengerPopup = ({
  onPassengerSave,
  setShowPopup,
  tripId,
}: AddingPassengerPopupProps) => {
  const [passengerData, setPassengerData] = useState<Passenger>({
    id: 0,
    name: "",
    street: "",
    number: "",
    tripId: tripId,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  
  //   try {
  //     const { data, error } = await supabase
  //       .from("passengers")
  //       .insert([
  //         {
  //           name: formData.name,
  //           street: formData.street,
  //           number: formData.number,
  //           tripId: tripId, // Usa o tripId recebido do pai
  //         },
  //       ])
  //       .select("*");
  
  //     if (error) {
  //       console.error("Erro ao salvar passageiro:", error.message);
  //       setIsSubmitting(false);
  //       return;
  //     }
  
  //     if (data && data.length > 0) {
  //       const newPassenger = data[0];
  //       onPassengerSave(newPassenger);
  //     }
  //   } catch (error) {
  //     console.error("Erro inesperado:", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("tripId no submit:", tripId); 
    if (!tripId || tripId === 0) {
      console.error("Trip ID inválido");
      setIsSubmitting(false);
      return;
    }
  
    try {
      const { data, error } = await supabase
        .from("passengers")
        .insert([passengerData])
        .select("*")
        // .headers({
        //   "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`, // Chave anon
        // });
  
      if (error) {
        console.error(error);
        setIsSubmitting(false);
        return;
      }
  
      if (data && data.length > 0) {
        onPassengerSave(data[0]); // Retorna o passageiro salvo ao componente pai
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      if (error instanceof Error) {
        console.error("Erro detalhado:", error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  
  //   try {
  //     const response = await fetch("/api/passenger", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(passengerData),
  //     });
  
  //     const result = await response.json();
  
  //     if (!response.ok) {
  //       throw new Error(result.error || "Erro ao salvar passageiro");
  //     }
  
  //     onPassengerSave(result[0]); // Retorna o passageiro salvo ao componente pai
  //   } catch (error) {
  //     console.error("Erro ao salvar passageiro:", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  
  
  

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
              value={passengerData.name}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(value)) {
                  const formattedValue =
                    value.charAt(0).toUpperCase() + value.slice(1);
                  setPassengerData({ ...passengerData, name: formattedValue });
                }
              }}
              placeholder="Origem"
              className="mb-2 p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700"
            />
            <input
              type="text"
              value={passengerData.street}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(value)) {
                  const formattedValue =
                    value.charAt(0).toUpperCase() + value.slice(1);
                  setPassengerData({
                    ...passengerData,
                    street: formattedValue,
                  });
                }
              }}
              placeholder="Origem"
              className="mb-2 p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700"
            />
            <input
              type="text"
              value={passengerData.number}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(value)) {
                  const formattedValue =
                    value.charAt(0).toUpperCase() + value.slice(1);
                  setPassengerData({
                    ...passengerData,
                    number: formattedValue,
                  });
                }
              }}
              placeholder="Origem"
              className="mb-2 p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700"
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



export default AddingPassengerPopup;
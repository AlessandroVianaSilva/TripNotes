"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Trip } from "./Details";

type EditTravelPopupProps = {
  trip: Trip;
  onUpdateTrip: (updatedTrip: Trip) => void;
  setShowPopup: (show: boolean) => void;
};

const EditTravelPopup = ({
  trip,
  onUpdateTrip,
  setShowPopup,
}: EditTravelPopupProps) => {
  const [formData, setFormData] = useState<Trip>(trip);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { id, origin, destination, time, date } = formData;

    try {
      const { data, error } = await supabase
        .from("travels")
        .update({ origin, destination, time, date })
        .eq("id", id)
        .select("*");

      if (error) {
        console.error("Erro ao atualizar no Supabase:", error.message);
        setIsSubmitting(false);
        return;
      }

      const safeData = data as Trip[] | null;

      if (safeData && safeData.length > 0) {
        const updatedTrip = safeData[0];
        console.log("Viagem atualizada com sucesso no Supabase:", updatedTrip);
        onUpdateTrip(updatedTrip);
      } else {
        console.error("Erro: Nenhum dado retornado pelo Supabase.");
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
    } finally {
      setIsSubmitting(false);
      setShowPopup(false); // Fecha a modal após salvar
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">
          Editar Viagem
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={(e) => {
              let value = e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, ""); // Remove números e caracteres especiais
              value = value.replace(/\s{2,}/g, " "); // Remove espaços duplos
              value = value
                .toLowerCase()
                .replace(/^\w/, (c) => c.toUpperCase()); // Mantém a primeira letra maiúscula
              setFormData({ ...formData, origin: value });
            }}
            placeholder="Origem"
            className="mb-2 p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700"
          />

          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={(e) => {
              let value = e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, ""); // Remove números e caracteres especiais
              value = value.replace(/\s{2,}/g, " "); // Remove espaços duplos
              value = value
                .toLowerCase()
                .replace(/^\w/, (c) => c.toUpperCase()); // Mantém a primeira letra maiúscula
              setFormData({ ...formData, destination: value });
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
              onClick={() => setShowPopup(false)}
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
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTravelPopup;

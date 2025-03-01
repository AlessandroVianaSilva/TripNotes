
import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabaseClient";

type Trip = {
  id: number;
  origin: string;
  destination: string;
  time: string;
  date: string;
  userId: number;
};

type AddingTravelPopupProps = {
  onTripSave: (newTrip: Trip) => void;
  setShowPopup: (show: boolean) => void;
  userId: number; 
};

const AddingTravelPopup = ({
  onTripSave,
  setShowPopup,
  userId,
}: AddingTravelPopupProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Trip>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const onSubmit = async (formData: Trip) => {
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from("travels")
        .insert([{ ...formData,  userId }]) 
        .select("*");

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
      setIsSubmitting(false);
    }
  };

  // Função para formatar a string: primeira letra maiúscula e o resto minúsculas
  const capitalizeFirstLetter = (str: string) => {
    return str
      .replace(/\b\w/g, (char) => char.toUpperCase()) // Primeira letra maiúscula
      .replace(/[^A-Za-zÀ-ÖØ-ß\s]/g, ""); // Remove números e caracteres especiais
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">
          Inserir dados
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Origem"
              {...register("origin", {
                required: "Origem é obrigatória.",
                pattern: {
                  value: /^[A-Za-zÀ-ÖØ-ß\s]*$/, // Permitindo letras e espaços
                  message: "A origem deve conter apenas letras e espaços.",
                },
                setValueAs: (value) => capitalizeFirstLetter(value), // Formatar para primeira letra maiúscula
              })}
              onChange={(e) => {
                e.target.value = capitalizeFirstLetter(e.target.value); // Formatar ao digitar
              }}
              className={`p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 ${
                errors.origin ? "border-red-500" : ""
              }`}
            />
            {errors.origin && (
              <p className="text-red-500 text-sm">{errors.origin.message}</p>
            )}
          </div>

          <div className="mb-2">
            <input
              type="text"
              placeholder="Destino"
              {...register("destination", {
                required: "Destino é obrigatório.",
                pattern: {
                  value: /^[A-Za-zÀ-ÖØ-ß\s]*$/, // Permitindo letras e espaços
                  message: "O destino deve conter apenas letras e espaços.",
                },
                setValueAs: (value) => capitalizeFirstLetter(value), // Formatar para primeira letra maiúscula
              })}
              onChange={(e) => {
                e.target.value = capitalizeFirstLetter(e.target.value); // Formatar ao digitar
              }}
              className={`p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 ${
                errors.destination ? "border-red-500" : ""
              }`}
            />
            {errors.destination && (
              <p className="text-red-500 text-sm">
                {errors.destination.message}
              </p>
            )}
          </div>

          <div className="mb-2">
            <input
              type="time"
              placeholder="Horário (HH:MM:SS)"
              {...register("time", { required: "Horário é obrigatório." })}
              className={`p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 ${
                errors.time ? "border-red-500" : ""
              }`}
            />
            {errors.time && (
              <p className="text-red-500 text-sm">{errors.time.message}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="date"
              {...register("date", { required: "Data é obrigatória." })}
              className={`p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 ${
                errors.date ? "border-red-500" : ""
              }`}
              min={new Date().toISOString().split("T")[0]}
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}
          </div>

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
  );
};

export default AddingTravelPopup;

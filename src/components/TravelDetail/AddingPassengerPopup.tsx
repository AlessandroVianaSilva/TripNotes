"use client";
import { supabase } from "@/lib/supabaseClient";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type Passenger = {
  id: number;
  name: string;
  street: string;
  number: string;
  tripId: number;
  price: string;
  neighborhood: string;
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Passenger>({
    defaultValues: {
      name: "",
      street: "",
      number: "",
      tripId: tripId,
      price: "",
      neighborhood: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: Passenger) => {
    setIsSubmitting(true);

    console.log("tripId no submit:", tripId);
    if (!tripId || tripId === 0) {
      console.error("Trip ID inválido");
      setIsSubmitting(false);
      return;
    }

    try {
      const { data: insertedData, error } = await supabase
        .from("passengers")
        .insert([data])
        .select("*");

      if (error) {
        console.error(error);
        setIsSubmitting(false);
        return;
      }

      if (insertedData && insertedData.length > 0) {
        onPassengerSave(insertedData[0]);
        reset(); // Limpa os campos após o envio
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow-lg w-96">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">
            Inserir dados
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Nome */}
            <div className="mb-2">
              <input
                type="text"
                placeholder="Nome"
                {...register("name", {
                  required: "Nome é obrigatório.",
                  pattern: {
                    value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/,
                    message: "Nome inválido, apenas letras e espaços.",
                  },
                  setValueAs: (value) =>
                    value
                      .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "") // Remove números e caracteres especiais
                      .toLowerCase() // Converte todas as letras para minúsculas
                      .replace(/\b\w/g, (char: string) => char.toUpperCase()), // Torna a primeira letra de cada palavra maiúscula
                })}
                onChange={(e) => {
                  
                  e.target.value = e.target.value
                  
                    .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "") // Remove números e caracteres especiais
                    .toLowerCase() // Converte todas as letras para minúsculas
                    .replace(/\b\w/g, (char) => char.toUpperCase()); // Torna a primeira letra de cada palavra maiúscula
                }}
                className={`p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            {/* Preço */}
            <div className="mb-2">
              <input
                type="text"
                placeholder="Preço"
                {...register("price", {
                  required: "Preço é obrigatório.",
                  onChange: (e) => {
                    let value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
                    if (value) {
                      const numericValue = Number(value) / 100; // Divide por 100 para ajustar a escala
                      value = numericValue.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      });
                    }

                    e.target.value = value;
                  },
                })}
                className={`p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 ${
                  errors.price ? "border-red-500" : ""
                }`}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

            {/* Bairro */}
            <div className="mb-2">
            <input
                type="text"
                placeholder="Bairro"
                {...register("neighborhood", {
                  required: "Nome é obrigatório.",
                  pattern: {
                    value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/,
                    message: "Bairro inválido, apenas letras e espaços.",
                  },
                  setValueAs: (value) =>
                    value
                      .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "") // Remove números e caracteres especiais
                      .toLowerCase() // Converte todas as letras para minúsculas
                      .replace(/\b\w/g, (char: string) => char.toUpperCase()), // Torna a primeira letra de cada palavra maiúscula
                })}
                onChange={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "") // Remove números e caracteres especiais
                    .toLowerCase() // Converte todas as letras para minúsculas
                    .replace(/\b\w/g, (char) => char.toUpperCase()); // Torna a primeira letra de cada palavra maiúscula
                }}
                className={`p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 ${
                  errors.neighborhood ? "border-red-500" : ""
                }`}
              />
              {errors.neighborhood && (
                <p className="text-red-500 text-sm">
                  {errors.neighborhood.message}
                </p>
              )}
            </div>

            {/* Rua */}
            <div className="mb-2">
            <input
                type="text"
                placeholder="Rua"
                {...register("street", {
                  required: "Nome é obrigatório.",
                  pattern: {
                    value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/,
                    message: "Rua inválida, apenas letras e espaços.",
                  },
                  setValueAs: (value) =>
                    value
                      .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "") // Remove números e caracteres especiais
                      .toLowerCase() // Converte todas as letras para minúsculas
                      .replace(/\b\w/g, (char: string) => char.toUpperCase()), // Torna a primeira letra de cada palavra maiúscula
                })}
                onChange={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "") // Remove números e caracteres especiais
                    .toLowerCase() // Converte todas as letras para minúsculas
                    .replace(/\b\w/g, (char) => char.toUpperCase()); // Torna a primeira letra de cada palavra maiúscula
                }}
                className={`p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 ${
                  errors.street ? "border-red-500" : ""
                }`}
              />
              {errors.street && (
                <p className="text-red-500 text-sm">{errors.street.message}</p>
              )}
            </div>

            {/* Número */}
            <div className="mb-2">
              <input
                type="text"
                placeholder="Número"
                inputMode="numeric" // Melhora a usabilidade em mobile (teclado numérico)
                {...register("number", {
                  required: "Número é obrigatório.",
                  pattern: {
                    value: /^\d+$/, // Permite apenas números
                    message: "Apenas números são permitidos.",
                  },
                  onChange: (e) => {
                    e.target.value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
                  },
                })}
                className={`p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 ${
                  errors.number ? "border-red-500" : ""
                }`}
              />
              {errors.number && (
                <p className="text-red-500 text-sm">{errors.number.message}</p>
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
                {isSubmitting ? "Salvando..." : "Salvar passageiro"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddingPassengerPopup;

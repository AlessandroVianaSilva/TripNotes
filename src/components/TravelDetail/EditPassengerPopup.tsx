"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

interface Passenger {
  id: number;
  name: string;
  street: string;
  number: string;
  tripId: number;
  price: string;
  neighborhood: string;
}

interface Props {
  passenger: Passenger;
  onUpdatePassenger: (updatedPassenger: Passenger) => void;
  setShowEditPopup: (value: boolean) => void;
}

const EditPassengerPopup = ({
  passenger,
  onUpdatePassenger,
  setShowEditPopup,
}: Props) => {
  const [formData, setFormData] = useState({
    ...passenger,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("passengers")
      .update(formData)
      .eq("id", passenger.id);

    if (error) {
      console.error("Erro ao atualizar passageiro:", error.message);
    } else {
      onUpdatePassenger(formData);
      setShowEditPopup(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">
          Editar Passageiro
        </h2>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
            if (value) {
              const numericValue = Number(value) / 100; // Divide por 100 para formato decimal
              value = numericValue.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
            }
            setFormData((prev) => ({ ...prev, price: value })); // Atualiza o estado formatado
          }}
          placeholder="Preço"
          className="mb-2 p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700"
        />

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => {
            let value = e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, ""); // Remove números e caracteres especiais
            value = value.replace(/\s{2,}/g, " "); // Remove espaços duplos
            value = value.toLowerCase().replace(/^\w/, (c) => c.toUpperCase()); // Mantém a primeira letra maiúscula
            setFormData({ ...formData, name: value });
          }}
          placeholder="Nome"
          className="mb-2 p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700"
        />

        <input
          type="text"
          name="neighborhood"
          value={formData.neighborhood}
          onChange={(e) => {
            let value = e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, ""); // Remove números e caracteres especiais
            value = value.replace(/\s{2,}/g, " "); // Remove espaços duplos
            value = value.toLowerCase().replace(/^\w/, (c) => c.toUpperCase()); // Mantém a primeira letra maiúscula
            setFormData({ ...formData, neighborhood: value });
          }}
          placeholder="Bairro"
          className="mb-2 p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700"
        />
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={(e) => {
            let value = e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, ""); // Remove números e caracteres especiais
            value = value.replace(/\s{2,}/g, " "); // Remove espaços duplos
            value = value.toLowerCase().replace(/^\w/, (c) => c.toUpperCase()); // Mantém a primeira letra maiúscula
            setFormData({ ...formData, street: value });
          }}
          placeholder="Rua"
          className="mb-2 p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700"
        />
        <input
          type="text"
          name="number"
          value={formData.number}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
            setFormData({ ...formData, number: value });
          }}
          placeholder="Número"
          className="mb-2 p-2 w-full border rounded text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700"
        />

        <div className="flex justify-between">
          <button
            onClick={() => setShowEditPopup(false)}
            className="text-red-500 dark:text-red-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Atualizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPassengerPopup;

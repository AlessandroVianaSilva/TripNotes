
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import AddingPassengerPopup from "./AddingPassengerPopup";
import EditPassengerPopup from "./EditPassengerPopup"; // Importe o popup de edição

interface Passenger {
  id: number;
  name: string;
  street: string;
  number: string;
  tripId: number;
  price: string;
  neighborhood: string;
  celphone?: string;
  observation?: string;
}

const TripPassengerList = ({ tripId }: { tripId: number }) => {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editingPassenger, setEditingPassenger] = useState<Passenger | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [passengerToDelete, setPassengerToDelete] = useState<number | null>(null);

  const fetchPassengers = async () => {
    const { data, error } = await supabase
      .from("passengers")
      .select("*")
      .eq("tripId", tripId);

    if (error) {
      console.error("Erro ao buscar passageiros:", error.message);
    } else if (data) {
      setPassengers(data as Passenger[]);
    }
  };

  const handlePassengerSave = (newPassenger: Passenger) => {
    setPassengers((prev) => [newPassenger, ...prev]);
    setShowPopup(false);
  };

  const confirmDeletePassenger = (id: number) => {
    setPassengerToDelete(id);
    setShowConfirmDelete(true);
  };

  const handleDeletePassenger = async () => {
    if (!passengerToDelete) return;

    const { error } = await supabase.from("passengers").delete().eq("id", passengerToDelete);

    if (error) {
      console.error("Erro ao excluir passageiro:", error.message);
    } else {
      setPassengers((prev) => prev.filter((passenger) => passenger.id !== passengerToDelete));
    }

    setShowConfirmDelete(false);
    setPassengerToDelete(null);
  };

  const handleEditPassenger = (passenger: Passenger) => {
    setEditingPassenger(passenger);
    setShowEditPopup(true);
  };

  const handleUpdatePassenger = (updatedPassenger: Passenger) => {
    setPassengers((prev) =>
      prev.map((passenger) =>
        passenger.id === updatedPassenger.id ? updatedPassenger : passenger
      )
    );
    setShowEditPopup(false);
  };

  useEffect(() => {
    fetchPassengers();
  }, []);

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold mb-4">Passageiros</h1>

      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => setShowPopup(true)}>
        Adicionar Passageiro
      </button>

      {showPopup && (
        <AddingPassengerPopup onPassengerSave={handlePassengerSave} setShowPopup={setShowPopup} tripId={tripId} />
      )}

      {showEditPopup && editingPassenger && (
        <EditPassengerPopup
          passenger={editingPassenger}
          onUpdatePassenger={handleUpdatePassenger}
          setShowEditPopup={setShowEditPopup}
        />
      )}

      <div className="mt-6 ">
        {passengers.length > 0 ? (
          <div className="mt-4">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 p-3 bg-blue-500 text-white font-bold rounded-t dark:bg-blue-600 dark:text-white">
              <div>Preço</div>
              <div>Nome</div>
              <div>Bairro</div>
              <div>Visualizar</div>
              <div>Excluir</div>
            </div>

            {passengers.map((passenger) => (
              <div key={passenger.id} className="grid grid-cols-3 sm:grid-cols-5 gap-3 p-4 border-b last:border-none bg-white hover:bg-[#f9f6fc] dark:bg-gray-800 dark:hover:bg-gray-700 shadow-md">
                <div>{passenger.price}</div>
                <div>{passenger.name}</div>
                <div>{passenger.neighborhood}</div>

                <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700" onClick={() => handleEditPassenger(passenger)}>
                  Ver mais
                </button>

                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => confirmDeletePassenger(passenger.id)}>
                  Excluir
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-2">Nenhum passageiro salvo ainda.</p>
        )}
      </div>

      {/* Modal de confirmação de exclusão */}
      {showConfirmDelete && passengerToDelete !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-center">Você tem certeza?</h2>
            <div className="flex justify-center space-x-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={handleDeletePassenger}>
                Excluir
              </button>
              <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-white" onClick={() => setShowConfirmDelete(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripPassengerList;
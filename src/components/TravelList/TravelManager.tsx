"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import AddingTravelPopup from "../../components/TravelList/AddingTravelPopup";
import { useRouter } from "next/navigation";

type Trip = { 
  id: number;
  origin: string;
  destination: string;
  time: string;
  date: string;
  userId: number;
};

type TravelManagerProps = {
  userId: number; // Recebendo o ID do usuário
};

const TravelManager: React.FC<TravelManagerProps> = ({ userId }) => {
  const [travels, setTravels] = useState<Trip[]>([]); // Estado para armazenar as viagens
  const [showPopup, setShowPopup] = useState(false); // Controla a visibilidade do popup
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); // Modal de confirmação de exclusão
  const [tripToDelete, setTripToDelete] = useState<Trip | null>(null); // Viagem a ser excluída
  const router = useRouter();
  // const [userId, setUserId] = useState<number | null>(null);

  // Busca viagens quando userId estiver definido
  useEffect(() => {
    if (userId !== null) {
      fetchTravels();
    }
  }, [userId]);

  // Busca viagens quando userId estiver definido
  useEffect(() => {
    if (userId !== null) {
      fetchTravels();
    }
  }, [userId]);

  // Função para buscar as viagens do Supabase
  const fetchTravels = async () => {

    if (!userId) {
      console.error("userId não definido");
      return;
    }

    const { data, error } = await supabase
    .from("travels")
    .select("*")
    .eq("userId", userId);
 // Busca as viagens associadas ao usuário;
  
    if (error) {
      console.error("Erro ao buscar viagens:", error.message);
    } else {
      console.log("Viagens recebidas:", data); // Log para verificar os dados
      if (Array.isArray(data)) {
        // Fazendo o cast explícito de data para o tipo Trip[]
        setTravels(data as Trip[]); // Agora o TypeScript sabe que 'data' é um array de 'Trip'
      }
    }
  };
  

  // Função chamada após salvar uma viagem
  const handleTripSave = (newTrip: Trip) => {
    console.log("Nova viagem recebida no pai:", newTrip);
    setTravels((prevTravels) => {
      console.log("Viagens anteriores:", prevTravels); // Log para verificar o estado anterior
      return [...prevTravels, newTrip]; // Adiciona a nova viagem ao estado
    });
    setShowPopup(false); // Fecha o popup
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Função para excluir a viagem
  const handleDeleteTrip = async (tripId: number) => {
    const { error } = await supabase
      .from("travels")
      .delete()
      .eq("id", tripId);

    if (error) {
      console.error("Erro ao excluir viagem:", error.message);
    } else {
      setTravels((prevTravels) =>
        prevTravels.filter((trip) => trip.id !== tripId)
      ); // Remove a viagem do estado
      setShowConfirmDelete(false); // Fecha a modal
    }
  };

  // Quando o botão Excluir for clicado, configura o estado da viagem a ser excluída
  const handleOpenDeleteConfirm = (trip: Trip) => {
    setTripToDelete(trip);
    setShowConfirmDelete(true); // Exibe a modal de confirmação
  };

  // // Carrega as viagens ao montar o componente
  // useEffect(() => {
  //   fetchTravels();
  // }, [userId]); // Recarrega quando o userId mudar

  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl font-bold mb-4">Gerenciamento de Viagens</h1>

        {/* Botão para abrir o popup */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={() => setShowPopup(true)}
        >
          Adicionar viagem
        </button>

        {/* Popup para adicionar viagem */}
        {showPopup && userId && (
          <AddingTravelPopup
            onTripSave={handleTripSave} // Passando a função para salvar a viagem
            setShowPopup={setShowPopup} // Passando a função para fechar o popup
            userId={userId} // Passando o ID do usuário para o componente filho
          />
        )}
      </div>

      {/* Lista de viagens */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Viagens Salvas:</h2>

        {travels.length > 0 ? (
          <div className="mt-4">
            {/* Cabeçalho */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 p-3 bg-blue-500 text-white font-bold rounded-t dark:bg-blue-600 dark:text-white">
              <div>Origem</div>
              <div>Destino</div>
              <div>Data</div>
              <div>Visualizar</div>
              <div>Excluir</div>
            </div>

            {/* Lista de viagens */}
            {travels.map((trip) => (
              <div
                key={trip.id}
                className="grid grid-cols-3 sm:grid-cols-5 gap-4 p-3 border-b last:border-none bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                {/* Colunas com dados */}
                <div>{trip.origin}</div>
                <div>{trip.destination}</div>
                <div>{formatDate(trip.date)}</div>

                {/* Botão Visualizar */}
                <div>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                    onClick={() => router.push(`/viagem/${trip.id}`)}
                  >
                    Visualizar
                  </button>
                </div>

                {/* Botão Excluir */}
                <div>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                    onClick={() => handleOpenDeleteConfirm(trip)} // Chama a função para abrir a modal
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-2">Nenhuma viagem salva ainda.</p>
        )}
      </div>

      {/* Modal de confirmação de exclusão */}
      {showConfirmDelete && tripToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-300 dark:bg-gray-800 p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Você tem certeza?
            </h2>
            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setShowConfirmDelete(false)} // Fecha a modal
              >
                Não
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => {
                  if (tripToDelete) handleDeleteTrip(tripToDelete.id); // Exclui a viagem
                }}
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelManager;

import { supabase } from "@/lib/supabaseClient";

export const addPassenger = async (tripId: number, name: string, destinationStreet: string, destinationNumber: string) => {
  const { data, error } = await supabase
    .from("passengers")
    .insert([
      {
        tripId,
        name,
        destinationStreet,
        destinationNumber,
      },
    ])
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;  // Retorna o passageiro recém-adicionado
};


// // api/passenger.js

// // api/passenger.ts

// import { supabase } from "@/lib/supabaseClient"; // Importando o cliente Supabase

// interface Passenger {
//   tripId: number;
//   name: string;
//   destinationStreet: string;
//   destinationNumber: string;
// }

// export async function addPassenger({
//   tripId,
//   name,
//   destinationStreet,
//   destinationNumber,
// }: Passenger) {
//   try {
//     const { data, error } = await supabase
//       .from('passengers') // A tabela dos passageiros
//       .insert([
//         {
//           tripId,
//           name,
//           destinationStreet,
//           destinationNumber,
//         },
//       ]);

//     if (error) throw error;

//     return data;
//   } catch (error) {
//     console.error("Erro ao adicionar passageiro:");
//     throw new Error("Não foi possível adicionar o passageiro.");
//   }
// }




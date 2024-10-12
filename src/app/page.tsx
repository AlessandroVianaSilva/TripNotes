// export default function Home() {
//   return <h1 className='text-4xl'>Home</h1>;
// } 

// import Navbar from "@/components/Navbar";
// import 
import Header from "@/components/Header";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      {/* <Navbar /> */}
      <Header/>
      <div>
        bem vindo
        {/* ja ta sendo usado o username, pode ser colocar na navbar pra aparecer o nome do usuário talvez? */}
        {session?.user.username}
      </div>
    </div>
  );
};

export default page;
// testDatabaseConnection.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; error?: unknown; }): void; new(): any; }; }; }) {
  try {
    // Tenta uma simples consulta SQL para testar a conexão
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log("Conexão com o banco de dados bem-sucedida!");
    res.status(200).json({ message: 'Conexão bem-sucedida' });
  } catch (error: unknown) {
    // Verifica se o erro é uma instância de Error
    if (error instanceof Error) {
      console.error("Erro ao conectar com o banco de dados:", error.message);
      res.status(500).json({ message: 'Erro ao conectar ao banco de dados', error: error.message });
    } else {
      // Caso o erro não seja um tipo conhecido
      console.error("Erro desconhecido:", error);
      res.status(500).json({ message: 'Erro desconhecido', error });
    }
  } finally {
    await prisma.$disconnect();
  }
}

"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z
  .object({
    email: z.string().min(1, "O e-mail é obrigatório").email("Email inválido"),
    password: z
      .string()
      .min(1, "Senha obrigatória")
      .min(8, "A senha deve ter mais de 8 caracteres"),
    confirmPassword: z.string().min(1, "A confirmação da senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Senha não confere",
  });

const Recoverpassword = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch("/api/recuperar-senha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      toast({
        title: "Sucesso",
        description: "Senha alterada com sucesso!",
        variant: "default",
      });
      router.push("/login");
    } else {
      // Mostrar erro baseado na resposta
      if (data.message === "Email não encontrado!") {
        form.setError("email", { message: "E-mail não encontrado!" });
      } else {
        toast({
          title: "Erro",
          description: "Algo deu errado! Tente novamente.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f6fc]">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-center">Recuperação de senha</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nova Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digite sua nova senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirme sua nova senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4">
              {" "}
              {/* Contêiner para os botões */}
              <Button
                className="w-full bg-blue-700 hover:bg-blue-600"
                type="submit"
              >
                Salvar
              </Button>
              <Button
                className="w-full bg-gray-500 hover:bg-gray-600"
                onClick={() => router.push("/login")}
              >
                Voltar
              </Button>
            </div>

            {/* <Button
              className="w-full mt-6 bg-blue-700 hover:bg-blue-600"
              type="submit"
            >
              Salvar
            </Button>
            <Button
              className="w-full mt-4"
              onClick={() => router.push("/login")}
            >
              Voltar
            </Button> */}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Recoverpassword;


'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"

const FormSchema = z
  .object({
    username: z.string().min(1, 'Nome de usuário é obrigatório').max(100),
    email: z.string().min(1, 'O e-mail é obrigatório').email('Email invalido'),
    password: z
      .string()
      .min(1, 'Senha obrigatória')
      .min(8, 'A senha deve ter mais de 8 caracteres'),
    confirmPassword: z.string().min(1, 'A confirmação da senha é obrigatória'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Senha não confere',
  });

const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log(process.env.NEXT_DATABASE_URL, 'front e back')
    const response = await fetch('/api/user', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });

    if(response.ok) {
      router.push('/login')
    } else {
      toast({
        title: "Erro",
        description: "Algo deu errado!",
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f6fc]"> {/* Cor de fundo para a tela inteira */}
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg"> {/* Fundo branco apenas para o formulário */}
      <h2 className="text-xl font-bold text-center">Cadastro</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Sua senha"
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
                    <FormLabel>Confirme sua senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirme sua senha"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full mt-6 bg-blue-700 hover:bg-blue-600" type="submit">
              Cadastre
            </Button>
          </form>
          
          <p className="text-center text-sm text-gray-600 mt-2">
            Se você tem uma conta, por favor{' '}
            <Link className="text-blue-500 hover:underline" href="/login">
              Login
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;

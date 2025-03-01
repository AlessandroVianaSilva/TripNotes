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
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  email: z.string().min(1, 'O e-mail é obrigatório').email('Email inválido'),
  password: z
    .string()
    .min(1, 'Senha obrigatória')
    .min(8, 'A senha deve ter mais de 8 caracteres'),
});

const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      // Se o login falhar, configuramos um erro manualmente no formulário
      form.setError('email', { message: 'E-mail ou senha incorretos.' });
      form.setError('password', { message: 'E-mail ou senha incorretos.' });
      toast({
        title: 'Erro de login',
        description: 'E-mail ou senha incorretos.',
        variant: 'destructive',
      });
    } else {
      router.refresh();
      router.push('/');
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#f9f6fc] overflow-hidden">
      <div className="relative z-10 w-full max-w-md p-6 bg-white shadow-md rounded-lg ">
        <h2 className="text-xl font-bold text-center">Bem-vindo ao TripNotes</h2>
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
                    {/* Aqui exibimos a mensagem de erro diretamente no campo de e-mail */}
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
                        placeholder="Entre com sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className="text-end text-sm text-gray-600 mt-2">
            Esqueceu sua senha?{' '}
            <Link className="text-blue-500 hover:underline" href="/recuperar-senha">
              Recuperar senha
            </Link>
          </p>
            <Button className="w-full mt-6 bg-blue-700 hover:bg-blue-600" type="submit">
              Entrar
            </Button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-2">
            Se você não tem uma conta, por favor{' '}
            <Link className="text-blue-500 hover:underline" href="/cadastro">
              Cadastre-se
            </Link>
          </p>
        </Form>
      </div>


      </div>
    // </div>
  );
};

export default SignInForm;

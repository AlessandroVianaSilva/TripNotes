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
import GoogleSignInButton from '../GoogleSignInButton';
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

      // Também podemos exibir um toast para informar o erro
      toast({
        title: 'Erro de login',
        description: 'E-mail ou senha incorretos.',
        variant: 'destructive',
      });
    } else {
      router.refresh();
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-500">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
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
                    {/* Aqui exibimos a mensagem de erro diretamente no campo de senha */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full mt-6" type="submit">
              Entrar
            </Button>
          </form>
          <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
            ou
          </div>
          <GoogleSignInButton>Login com o Google</GoogleSignInButton>
          <p className="text-center text-sm text-gray-600 mt-2">
            Se você não tem uma conta, por favor{' '}
            <Link className="text-blue-500 hover:underline" href="/cadastro">
              Cadastre-se
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;

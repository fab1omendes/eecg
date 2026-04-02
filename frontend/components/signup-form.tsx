"use client";
import * as React from "react";
import { useSearchParams } from 'next/navigation';
import { useSignup } from "@/hooks/use-signup";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const professions = [
  "Médico",
  "Enfermeiro",
  "Técnico de Enfermagem",
  "Gestor Saúde",
  "Estudante",
  "Nenhuma das opções anteriores",
] as const;


export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  // Hook de signup
  const { handleSubmit, loading } = useSignup();

  const searchParams = useSearchParams();
  const defaultName = searchParams.get('name');
  const defaultEmail = searchParams.get('email');
  const defaultImage = searchParams.get('image');

  // Criamos este wrapper local apenas para injetar o "date" (que é um state) pra dentro do helper do form
  const onSubmitWrapper = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, {
      date: date
    });
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Crie a sua conta</CardTitle>
        <CardDescription>
          Complete com as suas informações para criar uma conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmitWrapper}>
          <FieldGroup>

            {/* Imagem */}

            <Avatar className="mx-auto w-20 h-20">
              <AvatarImage src={defaultImage || undefined} />
              <AvatarFallback>{defaultName?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>

            {/* Nome */}
            <Field>
              <FieldLabel htmlFor="name">Nome</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Maria da Silva"
                defaultValue={defaultName || ""}
                required
              />
            </Field>

            {/* Birthday */}
            <Field>
              <FieldLabel htmlFor="date">Data de nascimento</FieldLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="justify-start font-normal"
                  >
                    {date ? date.toLocaleDateString() : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    defaultMonth={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="nome@gmail.com"
                defaultValue={defaultEmail || ""}
                required
              />
            </Field>
            {/* Senha */}
            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input id="password" name="password" type="password" required />
              <FieldDescription>
                Deve ter pelo menos 8 caracteres.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirme a Senha
              </FieldLabel>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="Por favor, confirme a sua senha."
                required
              />
            </Field>

            {/* Profissão */}
            <Field>
              <FieldLabel htmlFor="profession">Profissão</FieldLabel>
              <Combobox items={professions || []}>
                <ComboboxInput placeholder="Selecione uma profissão" />
                <ComboboxContent>
                  <ComboboxEmpty>Nenhum item encontrado.</ComboboxEmpty>
                  <ComboboxList>
                    {professions.map((item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>

            {/* Organização */}
            <Field>
              <FieldLabel htmlFor="organization">Organização</FieldLabel>
              <Input
                id="organization"
                placeholder="Nome da empresa ou organização"
                required
              />
            </Field>

            <FieldGroup>
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Criando Conta..." : "Criar Conta"}
                </Button>
                <FieldDescription className="px-6 text-center">
                  Você já tem uma conta? <a href="/login">Acesse aqui</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

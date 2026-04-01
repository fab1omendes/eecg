"use client";
import * as React from "react";
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

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Crie a sua conta</CardTitle>
        <CardDescription>
          Complete com as suas informações para criar uma conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            {/* Nome */}
            <Field>
              <FieldLabel htmlFor="name">Nome</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Maria da Silva"
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
                    {date ? date.toLocaleDateString() : "Select date"}
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
                type="email"
                placeholder="nome@gmail.com"
                required
              />
            </Field>
            {/* Senha */}
            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input id="password" type="password" required />
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
                type="password"
                placeholder="Por favor, confirme a sua senha."
                required
              />
            </Field>

            {/* Profissão */}
            <Field>
              <FieldLabel htmlFor="profession">Profissão</FieldLabel>
              <Combobox items={professions}>
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
                <Button type="submit">Criar Conta</Button>
                <FieldDescription className="px-6 text-center">
                  Você já tem uma conta? <a href="#">Acesse aqui</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

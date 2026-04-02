"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Activity, Loader2 } from "lucide-react";

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

    const userId = (session?.user as any)?.id;
    if (userId) {
      formData.append("frontend_user_id", String(userId));
    }

    // O NextAuth passa o token dentro da sessão, caso esteja configurado no callback JWT
    // Se o backend esperar na forma Bearer use o headers, se usar cookie basta manter credentials.
    // Utilização das duas abordagens por segurança.
    const headers: Record<string, string> = {};

    const userToken = (session?.user as any)?.token || (session as any)?.accessToken || (session as any)?.access_token;
    if (userToken) {
      headers["Authorization"] = `Bearer ${userToken}`;
    }

    try {
      const response = await fetch(`${API_URL}/ecg/`, {
        method: "POST",
        body: formData,
        headers,
      });

      if (!response.ok) {
        throw new Error("Erro ao analisar ECG");
      }

      const data = await response.json();

      // Salva os dados para exibir na tela de resultado
      sessionStorage.setItem("ecg_result", JSON.stringify(data));

      router.push("/sample/result");
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao enviar a análise.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Aplicação E-ECG</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Análise Simples</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min flex justify-center items-center">
            <div className="w-full max-w-md p-6">
              <form onSubmit={handleSubmit}>
                <FieldGroup>
                  <FieldSet>
                    <FieldLegend>Análise de Exame de ECG</FieldLegend>
                    <FieldDescription>
                      Para iniciar a análise preencha o formulário abaixo com os
                      dados solicitados e insira o cartão de exame ECG em pdf.
                    </FieldDescription>
                    <FieldGroup>
                      <Field>
                        <FieldLabel htmlFor="patient_name">
                          Nome do Paciente
                        </FieldLabel>
                        <Input
                          id="patient_name"
                          name="patient_name"
                          placeholder="Maria Aparecida"
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="exam_date">
                          Data do Exame
                        </FieldLabel>
                        <Input
                          id="exam_date"
                          name="exam_date"
                          type="datetime-local"
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="file">
                          Insira o exame em pdf
                        </FieldLabel>
                        <Input
                          id="file"
                          name="file"
                          type="file"
                          accept=".pdf"
                          required
                        />
                      </Field>
                    </FieldGroup>
                  </FieldSet>
                  <FieldSeparator />

                  <Field orientation="horizontal">
                    <Button type="submit" disabled={loading}>
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Activity className="w-4 h-4 mr-2" />
                      )}
                      Iniciar Análise
                    </Button>
                    <Button variant="outline" type="button" onClick={() => router.back()}>
                      Cancel
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

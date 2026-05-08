"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCardioFlux } from "@/hooks/useCardioFlux";

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
import { Activity, BotIcon, Loader2 } from "lucide-react";

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const { analyze, loading: analysisLoading } = useCardioFlux();
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // Append user ID if available
    const userId = (session?.user as any)?.id;
    if (userId) {
      formData.append("frontend_user_id", String(userId));
    }

    try {
      // Use the new hook for analysis (Port 8001)
      const data = await analyze(formData);

      // Salva no histórico do Backend (Port 8000)
      const BACKEND_API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      const historyData = {
        patient_name: formData.get("patient_name"),
        exam_date: formData.get("exam_date"),
        classification: data.classification,
        st_status: data.analysis?.st_segment?.status,
        st_elevation: data.analysis?.st_segment?.avg_elevation,
        sd1: data.analysis?.poincare?.sd1,
        sd2: data.analysis?.poincare?.sd2,
        ratio: data.analysis?.poincare?.ratio,
        score: data.analysis?.poincare?.score,
        result: data.result,
        frontend_user_id: userId,
      };

      const headers: Record<string, string> = {};
      const userToken = (session?.user as any)?.token || (session as any)?.accessToken || (session as any)?.access_token;
      if (userToken) {
        headers["Authorization"] = `Bearer ${userToken}`;
      }
      headers["Content-Type"] = "application/json";

      await fetch(`${BACKEND_API}/cardioflux-history/`, {
        method: "POST",
        headers,
        body: JSON.stringify(historyData),
      }).catch(err => console.error("Erro ao salvar histórico local:", err));


      // Salva os dados para exibir na tela de resultado
      sessionStorage.setItem("ecg_result", JSON.stringify(data));


      router.push("/cardioflux/result");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Ocorreu um erro ao enviar a análise.");
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
                  <BreadcrumbPage>Modelos</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>CardioFlux_Mark1</BreadcrumbPage>
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
                    <FieldLegend>
                      <BotIcon /> Análise de Exame de ECG com CardioFlux_Mark1
                      </FieldLegend>
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
                    <Button type="submit" disabled={loading || analysisLoading}>
                      {(loading || analysisLoading) ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Activity className="w-4 h-4 mr-2" />
                      )}
                      Iniciar Análise com CardioFlux_Mark1
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

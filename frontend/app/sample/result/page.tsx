"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AlertCircle, ArrowLeft, CheckCircle2, Printer } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ResultadoPage() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Carrega os dados recebidos pelo formulário na página anterior
    const storedData = sessionStorage.getItem("ecg_result");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  if (!data) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex items-center justify-center min-h-screen">
            <p className="text-muted-foreground animate-pulse">Carregando resultado...</p>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="print:hidden">
        <AppSidebar />
      </div>
      <SidebarInset>

        <header className="print:hidden flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">

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
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/sample">Análise Simples</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Resultado</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="max-w-3xl mx-auto w-full mt-6 space-y-6">
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Resultado da Análise</h1>
                <p className="text-muted-foreground">Status do processamento no modelo simples.</p>
              </div>
              <div className="flex gap-2 print:hidden">
                <Button variant="outline" onClick={() => window.print()}>
                  <Printer className="mr-2 h-4 w-4" /> Imprimir
                </Button>
                <Button variant="outline" onClick={() => router.push("/sample")}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Nova Análise
                </Button>
              </div>
            </div>

            <div className="bg-card text-card-foreground rounded-xl border p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase mb-1">Paciente</h3>
                  <p className="font-medium text-lg">{data.patient_name}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase mb-1">Data do Exame</h3>
                  <p className="font-medium text-lg">
                    {data.exam_date ? new Date(data.exam_date).toLocaleString("pt-BR") : "--"}
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="font-semibold text-lg flex items-center mb-4">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" /> 
                  Conclusão do E-ECG
                </h3>
                <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap text-sm leading-relaxed">
                  {data.result || "Nenhum resultado processado."}
                </div>
              </div>
            </div>

            <Alert variant="destructive" className="bg-red-50 text-red-900 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="font-bold text-red-800">ATENÇÃO - AVISO MÉDICO IMPORTANTÍSSIMO</AlertTitle>
              <AlertDescription className="text-red-700/90 mt-2">
                Este é apenas um resultado gerado de forma experimental e/ou com dados fictícios para fins de demonstração da aplicação.
                <br /><br />
                <strong>NÃO SE BASEIE NESTE TESTE PARA TOMAR DECISÕES MÉDICAS.</strong> Ele não substitui, sob nenhuma circunstância, a avaliação, o diagnóstico formal e a intervenção de um profissional de saúde capacitado.
              </AlertDescription>
            </Alert>

          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

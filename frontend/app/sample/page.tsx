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
import { Activity } from "lucide-react";

export default function Page() {
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
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {/* <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" /> */}
          </div>
          <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div className="w-full max-w-md">
              <form>
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
                          placeholder="16/05/2025"
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="file">
                          Insira o exame em pdf
                        </FieldLabel>
                        <Input
                          id="file"
                          type="file"
                          placeholder="selecione o pdf"
                          required
                        />
                      </Field>
                    </FieldGroup>
                  </FieldSet>
                  <FieldSeparator />

                  <Field orientation="horizontal">
                    <Button type="submit">
                      <Activity className="w-4 h-4" /> Iniciar Análise
                    </Button>
                    <Button variant="outline" type="button">
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

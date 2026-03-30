"use client";

import { LoginForm } from "@/components/login-form";
import { Heart } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* div-left */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Heart className="size-4" />
            </div>
            E-ECG.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* div-right */}
      <div className="relative hidden bg-muted lg:block">
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <div className="max-w-2xl w-full text-center space-y-4">
            <h2 className="text-xl font-semibold">⚠️ Aviso importante</h2>

            <p>
              Este software é fornecido apenas para fins educacionais e de apoio
              à decisão.
              <br />
              Foi feito para atender a disciplina Projeto Integrador Univesp.
              <br />
              Não substitui avaliação médica profissional.
            </p>

            <div>
              <h3 className="font-semibold mt-4">🔐 Licença</h3>
              <p>
                Este projeto está licenciado sob a MIT License.
                <br />
                Isso significa que:
              </p>

              <ul className="list-disc list-inside text-left inline-block mt-2">
                <li>Pode ser utilizado livremente</li>
                <li>Pode ser modificado</li>
                <li>Pode ser redistribuído</li>
                <li>Pode ser utilizado comercialmente</li>
                <li>Desde que mantidos os créditos ao autor original</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

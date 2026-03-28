import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type Dispositivo = {
  id: string;
  tipo: string;
};

// ─── Datos hardcodeados ───────────────────────────────────────────────────────

const DISPOSITIVOS: Dispositivo[] = [
  { id: "001", tipo: "Cámara" },
  { id: "002", tipo: "Sensor CO₂" },
  { id: "003", tipo: "Ventana" },
  { id: "004", tipo: "Llave de paso de gas" },
];

// ─── Íconos SVG inline ────────────────────────────────────────────────────────

const IconHA = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
    <path d="M3 12L12 3l9 9v9H3v-9z" strokeLinejoin="round" />
    <rect x="9" y="15" width="6" height="6" rx="0.5" />
  </svg>
);

const IconDevice = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="3" />
    <path d="M6.3 6.3a8 8 0 000 11.4M17.7 6.3a8 8 0 010 11.4" />
  </svg>
);

const IconDashboard = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.8}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2.5}>
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Componente principal ─────────────────────────────────────────────────────

interface ConexionesProps {
  onNavigateToDashboard?: () => void;
}

export default function Conexiones({ onNavigateToDashboard }: ConexionesProps) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [conectando, setConectando] = useState(false);
  const [conectado, setConectado] = useState(false);
  const [error, setError] = useState("");

  const handleConectar = () => {
    if (!usuario.trim() || !contrasena.trim()) {
      setError("Completá usuario y contraseña para continuar.");
      return;
    }
    setError("");
    setConectando(true);
    // Simula latencia de conexión
    setTimeout(() => {
      setConectando(false);
      setConectado(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* ── Header ── */}
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-teal-400">
            <IconHA />
          </span>
          <span className="font-semibold tracking-tight text-zinc-100">
            Conexiones
          </span>
        </div>

        <Button
          onClick={onNavigateToDashboard}
          variant="outline"
          size="sm"
          className="gap-2 border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
        >
          <IconDashboard />
          Ir al Dashboard
        </Button>
      </header>

      {/* ── Contenido ── */}
      <main className="flex-1 flex flex-col gap-6 px-6 py-8 max-w-xl mx-auto w-full">

        {/* ── Sección: Home Assistant ── */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-teal-400">
                <IconHA />
              </span>
              <CardTitle className="text-base text-zinc-100">
                Conectar con Home Assistant
              </CardTitle>
            </div>
            <CardDescription className="text-zinc-400 text-sm leading-relaxed">
              Seguí estos pasos para vincular tu instancia de Home Assistant:
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-5">
            {/* Instrucciones */}
            <ol className="flex flex-col gap-2 text-sm text-zinc-400">
              {[
                "Asegurate de que tu instancia de Home Assistant esté encendida y accesible en tu red local.",
                "Habilitá la opción de acceso por usuario en Configuración → Usuarios.",
                "Ingresá tus credenciales aquí abajo para autenticar la conexión.",
              ].map((paso, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-zinc-800 border border-zinc-700 text-teal-400 text-xs flex items-center justify-center font-medium">
                    {i + 1}
                  </span>
                  <span className="leading-snug pt-0.5">{paso}</span>
                </li>
              ))}
            </ol>

            <Separator className="bg-zinc-800" />

            {/* Formulario */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="usuario" className="text-zinc-300 text-sm">
                  Usuario
                </Label>
                <Input
                  id="usuario"
                  placeholder="tu-usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  disabled={conectado}
                  className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-teal-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contrasena" className="text-zinc-300 text-sm">
                  Contraseña
                </Label>
                <Input
                  id="contrasena"
                  type="password"
                  placeholder="••••••••"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  disabled={conectado}
                  className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-teal-500"
                />
              </div>

              {error && (
                <Alert variant="destructive" className="bg-red-950 border-red-800 text-red-300 py-3">
                  <AlertDescription className="text-sm">{error}</AlertDescription>
                </Alert>
              )}

              {conectado ? (
                <Alert className="bg-teal-950 border-teal-800 py-3">
                  <AlertTitle className="text-teal-300 text-sm font-medium flex items-center gap-1.5">
                    <IconCheck /> Conectado correctamente
                  </AlertTitle>
                  <AlertDescription className="text-teal-500 text-xs mt-0.5">
                    Home Assistant vinculado. Ya podés ir al Dashboard.
                  </AlertDescription>
                </Alert>
              ) : (
                <Button
                  onClick={handleConectar}
                  disabled={conectando}
                  className="bg-teal-600 hover:bg-teal-500 text-white w-full"
                >
                  {conectando ? "Conectando…" : "Conectar con Home Assistant"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ── Sección: Dispositivos conectados ── */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-teal-400">
                  <IconDevice />
                </span>
                <CardTitle className="text-base text-zinc-100">
                  Dispositivos conectados
                </CardTitle>
              </div>
              <Badge
                variant="secondary"
                className="bg-zinc-800 text-zinc-400 text-xs border border-zinc-700"
              >
                {DISPOSITIVOS.length}
              </Badge>
            </div>
            <CardDescription className="text-zinc-500 text-sm">
              Dispositivos detectados en tu red de Home Assistant.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul className="flex flex-col divide-y divide-zinc-800">
              {DISPOSITIVOS.map((d) => (
                <li
                  key={d.id}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                >
                  <span className="text-sm text-zinc-200 font-medium">
                    {d.tipo} #{d.id}
                  </span>
                  <Badge className="bg-teal-900/50 text-teal-400 border border-teal-800 text-xs font-normal">
                    Activo
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

      </main>
    </div>
  );
}
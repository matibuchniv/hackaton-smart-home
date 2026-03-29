import { useState, useEffect } from "react";
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
import { apiUrl } from "@/lib/api";

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

  // ── Estado de dispositivos ──────────────────────────────────────────────────
  const [dispositivos, setDispositivos] = useState<string[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(apiUrl("/dispositivos"))
      .then((res) => res.json())
      .then((data: string[]) => {
        setDispositivos(data);
      })
      .catch(() => {
        setDispositivos([]);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);
  // ───────────────────────────────────────────────────────────────────────────

  const handleConectar = () => {
    if (!usuario.trim() || !contrasena.trim()) {
      setError("Completá usuario y contraseña para continuar.");
      return;
    }
    setError("");
    setConectando(true);
    setTimeout(() => {
      setConectando(false);
      setConectado(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* ── Header ── */}
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-primary">
            <IconHA />
          </span>
          <span className="font-semibold tracking-tight text-foreground">
            Conexiones
          </span>
        </div>

        <Button
          onClick={() => { window.location.href = "/dashboard"; }}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <IconDashboard />
          Ir al Dashboard
        </Button>
      </header>

      {/* ── Contenido ── */}
      <main className="flex-1 flex flex-col gap-6 px-6 py-8 max-w-xl mx-auto w-full">

        {/* ── Sección: Home Assistant ── */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-primary">
                <IconHA />
              </span>
              <CardTitle className="text-base">
                Conectar con Home Assistant
              </CardTitle>
            </div>
            <CardDescription className="text-sm leading-relaxed">
              Seguí estos pasos para vincular tu instancia de Home Assistant:
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-5">
            <ol className="flex flex-col gap-2 text-sm text-muted-foreground">
              {[
                "Asegurate de que tu instancia de Home Assistant esté encendida y accesible en tu red local.",
                "Habilitá la opción de acceso por usuario en Configuración → Usuarios.",
                "Ingresá tus credenciales aquí abajo para autenticar la conexión.",
              ].map((paso, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted border text-primary text-xs flex items-center justify-center font-medium">
                    {i + 1}
                  </span>
                  <span className="leading-snug pt-0.5">{paso}</span>
                </li>
              ))}
            </ol>

            <Separator />

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="usuario" className="text-sm">
                  Usuario
                </Label>
                <Input
                  id="usuario"
                  placeholder="tu-usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  disabled={conectado}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contrasena" className="text-sm">
                  Contraseña
                </Label>
                <Input
                  id="contrasena"
                  type="password"
                  placeholder="••••••••"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  disabled={conectado}
                />
              </div>

              {error && (
                <Alert variant="destructive" className="py-3">
                  <AlertDescription className="text-sm">{error}</AlertDescription>
                </Alert>
              )}

              {conectado ? (
                <Alert className="py-3">
                  <AlertTitle className="text-sm font-medium flex items-center gap-1.5">
                    <IconCheck /> Conectado correctamente
                  </AlertTitle>
                  <AlertDescription className="text-xs mt-0.5 text-muted-foreground">
                    Home Assistant vinculado. Ya podés ir al Dashboard.
                  </AlertDescription>
                </Alert>
              ) : (
                <Button
                  onClick={handleConectar}
                  disabled={conectando}
                  className="w-full"
                >
                  {conectando ? "Conectando…" : "Conectar con Home Assistant"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ── Sección: Dispositivos conectados ── */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-primary">
                  <IconDevice />
                </span>
                <CardTitle className="text-base">
                  Dispositivos conectados
                </CardTitle>
              </div>
              <Badge variant="secondary" className="text-xs">
                {cargando ? "…" : dispositivos.length}
              </Badge>
            </div>
            <CardDescription className="text-sm">
              Dispositivos detectados en tu red de Home Assistant.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {cargando ? (
              <p className="text-sm text-muted-foreground">Cargando dispositivos…</p>
            ) : (
              <ul className="flex flex-col divide-y">
                {dispositivos.map((nombre, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                  >
                    <span className="text-sm font-medium">{nombre}</span>
                    <Badge variant="outline" className="text-xs font-normal">
                      Activo
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

      </main>
    </div>
  );
}

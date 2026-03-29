import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type NivelCO2 = "baja" | "moderada" | "alta";
type EstadoValvula = "abierta" | "cerrada";
type EstadoVentana = "abierta" | "cerrada";

type DatosHogar = {
  co2: { valor: number; nivel: NivelCO2 };
  valvulaGas: EstadoValvula;
  ventanas: { id: string; nombre: string; estado: EstadoVentana }[];
  personasEnCasa: boolean;
};

// ─── Datos hardcodeados ───────────────────────────────────────────────────────

const DATOS: DatosHogar = {
  co2: { valor: 842, nivel: "moderada" },
  valvulaGas: "cerrada",
  ventanas: [
    { id: "v1", nombre: "Ventana sala", estado: "abierta" },
    { id: "v2", nombre: "Ventana dormitorio", estado: "cerrada" },
    { id: "v3", nombre: "Ventana cocina", estado: "abierta" },
  ],
  personasEnCasa: true,
};

// ─── Helpers de color CO₂ ─────────────────────────────────────────────────────

const CO2_CONFIG: Record<NivelCO2, { label: string; color: string; bg: string; track: string }> = {
  baja:     { label: "Baja",     color: "#16a34a", bg: "#f0fdf4", track: "#dcfce7" },
  moderada: { label: "Moderada", color: "#ca8a04", bg: "#fefce8", track: "#fef9c3" },
  alta:     { label: "Alta",     color: "#dc2626", bg: "#fef2f2", track: "#fee2e2" },
};

const CO2_PORCENTAJE: Record<NivelCO2, number> = {
  baja: 25,
  moderada: 62,
  alta: 90,
};

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

const IconCO2 = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.8}>
    <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
    <path d="M8 12h.01M12 12h.01M16 12h.01" strokeLinecap="round" strokeWidth={2.5} />
  </svg>
);

const IconGas = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.8}>
    <path d="M12 2C8 2 5 5.5 5 9c0 5 7 13 7 13s7-8 7-13c0-3.5-3-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const IconWindow = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.8}>
    <rect x="3" y="3" width="18" height="18" rx="1.5" />
    <path d="M12 3v18M3 12h18" />
  </svg>
);

const IconPerson = ({ presente }: { presente: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-4 h-4"
    stroke={presente ? "#16a34a" : "currentColor"}
    strokeWidth={1.8}
  >
    <circle cx="12" cy="7" r="4" />
    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" strokeLinecap="round" />
  </svg>
);

// ─── Componente principal ─────────────────────────────────────────────────────

export default function Dashboard() {
  const { co2, valvulaGas, ventanas, personasEnCasa } = DATOS;
  const co2Cfg = CO2_CONFIG[co2.nivel];
  const co2Pct = CO2_PORCENTAJE[co2.nivel];

  const ventanasAbiertas = ventanas.filter((v) => v.estado === "abierta").length;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* ── Header ── */}
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-primary">
            <IconHA />
          </span>
          <span className="font-semibold tracking-tight text-foreground">
            Dashboard
          </span>
        </div>

        <Button
          onClick={() => { window.location.href = "/devices"; }}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <IconDevice />
          Ver Dispositivos
        </Button>
      </header>

      {/* ── Contenido ── */}
      <main className="flex-1 flex flex-col gap-6 px-6 py-8 max-w-xl mx-auto w-full">

        {/* ── Tarjetas resumen ── */}
        <div className="grid grid-cols-2 gap-4">
          {/* Personas en casa */}
          <Card>
            <CardContent className="pt-5 pb-4 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Personas
                </span>
                <IconPerson presente={personasEnCasa} />
              </div>
              <p className="text-2xl font-semibold leading-none">
                {personasEnCasa ? "En casa" : "Ausente"}
              </p>
              <Badge
                variant="outline"
                className="w-fit text-xs font-normal"
                style={
                  personasEnCasa
                    ? { borderColor: "#16a34a", color: "#16a34a" }
                    : {}
                }
              >
                {personasEnCasa ? "Detectado" : "Sin detectar"}
              </Badge>
            </CardContent>
          </Card>

          {/* Llave de gas */}
          <Card>
            <CardContent className="pt-5 pb-4 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Gas
                </span>
                <IconGas />
              </div>
              <p className="text-2xl font-semibold leading-none capitalize">
                {valvulaGas}
              </p>
              <Badge
                variant="outline"
                className="w-fit text-xs font-normal"
                style={
                  valvulaGas === "abierta"
                    ? { borderColor: "#dc2626", color: "#dc2626" }
                    : {}
                }
              >
                {valvulaGas === "abierta" ? "Activo" : "Seguro"}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* ── CO₂ ── */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <span className="text-primary">
                <IconCO2 />
              </span>
              <CardTitle className="text-base">Medición de CO₂</CardTitle>
            </div>
            <CardDescription className="text-sm">
              Nivel de dióxido de carbono en el ambiente.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            {/* Valor + badge */}
            <div className="flex items-end justify-between">
              <div>
                <span className="text-3xl font-semibold leading-none">{co2.valor}</span>
                <span className="text-sm text-muted-foreground ml-1.5">ppm</span>
              </div>
              <Badge
                className="text-xs font-medium"
                style={{
                  backgroundColor: co2Cfg.bg,
                  color: co2Cfg.color,
                  borderColor: co2Cfg.color + "55",
                  border: "1px solid",
                }}
              >
                {co2Cfg.label}
              </Badge>
            </div>

            {/* Barra de progreso manual */}
            <div
              className="w-full rounded-full h-2"
              style={{ backgroundColor: co2Cfg.track }}
            >
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{ width: `${co2Pct}%`, backgroundColor: co2Cfg.color }}
              />
            </div>

            <Separator />

            {/* Escala referencia */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-green-600" />
                Baja &lt;600 ppm
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-yellow-500" />
                Moderada 600–1000
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-red-600" />
                Alta &gt;1000
              </span>
            </div>
          </CardContent>
        </Card>

        {/* ── Ventanas ── */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-primary">
                  <IconWindow />
                </span>
                <CardTitle className="text-base">Ventanas</CardTitle>
              </div>
              <Badge variant="secondary" className="text-xs">
                {ventanasAbiertas}/{ventanas.length} abiertas
              </Badge>
            </div>
            <CardDescription className="text-sm">
              Estado actual de las ventanas de la vivienda.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul className="flex flex-col divide-y">
              {ventanas.map((v) => (
                <li
                  key={v.id}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                >
                  <span className="text-sm font-medium">{v.nombre}</span>
                  <Badge
                    variant="outline"
                    className="text-xs font-normal capitalize"
                    style={
                      v.estado === "abierta"
                        ? { borderColor: "#16a34a", color: "#16a34a" }
                        : {}
                    }
                  >
                    {v.estado}
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
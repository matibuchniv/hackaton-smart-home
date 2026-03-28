import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type FormState = {
  email: string
  password: string
  respiratoryOrCardiac: boolean
  olderThanThreshold: boolean
  youngerThanThreshold: boolean
  emergencyContact: string
}

const initialForm: FormState = {
  email: '',
  password: '',
  respiratoryOrCardiac: false,
  olderThanThreshold: false,
  youngerThanThreshold: false,
  emergencyContact: '',
}

export default function App() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(initialForm)

  const canContinueAuth = form.email.trim() !== '' && form.password.trim() !== ''
  const canFinish = form.emergencyContact.trim() !== ''

  const thresholdSummary = useMemo(() => {
    const flags = [
      form.respiratoryOrCardiac ? 'Resp/Cardíaco' : null,
      form.olderThanThreshold ? 'Mayor a umbral' : null,
      form.youngerThanThreshold ? 'Menor a umbral' : null,
    ].filter(Boolean) as string[]

    return flags.length ? flags : null
  }, [form])

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const next = () => setStep((s) => Math.min(s + 1, 4))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full gap-6 lg:grid-cols-[1.05fr_0.95fr]">

          {/* Left panel — info + profile status */}
          <Card className="flex flex-col justify-between overflow-hidden">
            <CardHeader className="space-y-4">
              <Badge variant="secondary" className="w-fit">SmartHome MVP</Badge>

              {step === 0 ? (
                <>
                  <CardTitle className="max-w-lg text-3xl font-black tracking-tight sm:text-4xl">
                    Prevención inteligente para el hogar.
                  </CardTitle>
                  <CardDescription className="max-w-xl text-base leading-7 sm:text-lg">
                    Detectamos señales de riesgo y activamos respuestas simples para reducir
                    problemas de salud en casa.
                  </CardDescription>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <Badge>Paso {step} de 4</Badge>
                    <span className="text-sm text-muted-foreground">Onboarding rápido</span>
                  </div>
                  <CardTitle className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {step === 1 && 'Creá tu cuenta'}
                    {step === 2 && 'Datos del hogar'}
                    {step === 3 && 'Contacto de emergencia'}
                    {step === 4 && 'Listo'}
                  </CardTitle>
                  <CardDescription className="max-w-xl text-sm leading-6 sm:text-base">
                    {step === 1 &&
                      'Usamos tus credenciales solo para identificar el perfil del usuario en memoria durante la demo.'}
                    {step === 2 &&
                      'Estos datos ajustan los thresholds de riesgo de manera simple para el MVP.'}
                    {step === 3 &&
                      'Guardamos un contacto para simular la escalada de alertas.'}
                    {step === 4 &&
                      'La vista final muestra el estado del onboarding en memoria para demostrar el flujo.'}
                  </CardDescription>
                </>
              )}
            </CardHeader>

            <CardContent>
              <Separator className="mb-4" />
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Estado del perfil
              </p>

              {thresholdSummary ? (
                <div className="mb-4 flex flex-wrap gap-2">
                  {thresholdSummary.map((flag) => (
                    <Badge key={flag} variant="outline">{flag}</Badge>
                  ))}
                </div>
              ) : (
                <p className="mb-4 text-sm text-muted-foreground">Sin riesgos declarados</p>
              )}

              <div className="grid grid-cols-3 gap-3">
                <StatCard
                  label="Salud"
                  value={form.respiratoryOrCardiac ? 'Alto' : 'Normal'}
                  highlight={form.respiratoryOrCardiac}
                />
                <StatCard
                  label="Edad"
                  value={form.olderThanThreshold || form.youngerThanThreshold ? 'Sensitivo' : 'Base'}
                  highlight={form.olderThanThreshold || form.youngerThanThreshold}
                />
                <StatCard
                  label="Contacto"
                  value={form.emergencyContact.trim() ? 'Cargado' : 'Pendiente'}
                  highlight={!!form.emergencyContact.trim()}
                />
              </div>
            </CardContent>
          </Card>

          {/* Right panel — step content */}
          <Card>
            <CardContent className="pt-6">
              {step === 0 && (
                <div className="flex min-h-[420px] flex-col items-center justify-center gap-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-2xl text-white">
                    ⌂
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-2xl sm:text-3xl">Protegé tu hogar</CardTitle>
                    <CardDescription className="mx-auto max-w-md text-sm leading-6 sm:text-base">
                      Una demo simple para cargar el perfil del hogar y mostrar cómo el sistema
                      puede adaptar sus acciones según el riesgo.
                    </CardDescription>
                  </div>
                  <Button className="w-full max-w-xs" size="lg" onClick={next}>
                    Comenzar
                  </Button>
                </div>
              )}

              {step === 1 && (
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (canContinueAuth) next()
                  }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tuemail@dominio.com"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => update('password', e.target.value)}
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button type="button" variant="outline" className="flex-1" onClick={back}>
                      Atrás
                    </Button>
                    <Button type="submit" className="flex-1" disabled={!canContinueAuth}>
                      Continuar
                    </Button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <ToggleRow
                    id="respiratoryOrCardiac"
                    title="¿Hay alguien con enfermedades respiratorias y/o cardíacas?"
                    description="Asma, EPOC, cardiopatías u otros cuadros sensibles."
                    checked={form.respiratoryOrCardiac}
                    onChange={(checked) => update('respiratoryOrCardiac', checked)}
                  />
                  <ToggleRow
                    id="olderThanThreshold"
                    title="¿Hay alguien en la casa mayor a x años?"
                    description="Marcá esta opción si el hogar tiene personas mayores."
                    checked={form.olderThanThreshold}
                    onChange={(checked) => update('olderThanThreshold', checked)}
                  />
                  <ToggleRow
                    id="youngerThanThreshold"
                    title="¿Hay alguien en la casa menor a x años?"
                    description="Marcá esta opción si el hogar tiene menores."
                    checked={form.youngerThanThreshold}
                    onChange={(checked) => update('youngerThanThreshold', checked)}
                  />

                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" className="flex-1" onClick={back}>
                      Atrás
                    </Button>
                    <Button className="flex-1" onClick={next}>
                      Continuar
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (canFinish) next()
                  }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Contacto de emergencia</Label>
                    <Input
                      id="emergencyContact"
                      type="text"
                      placeholder="Nombre y teléfono"
                      value={form.emergencyContact}
                      onChange={(e) => update('emergencyContact', e.target.value)}
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button type="button" variant="outline" className="flex-1" onClick={back}>
                      Atrás
                    </Button>
                    <Button type="submit" className="flex-1" disabled={!canFinish}>
                      Finalizar
                    </Button>
                  </div>
                </form>
              )}

              {step === 4 && (
                <div className="flex min-h-[420px] flex-col justify-between gap-6">
                  <div className="space-y-4 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-2xl text-emerald-700">
                      ✓
                    </div>
                    <CardTitle className="text-2xl sm:text-3xl">Sistema activado</CardTitle>
                    <CardDescription className="text-sm leading-6 sm:text-base">
                      Los datos quedaron cargados en memoria para la demo. Podés conectar después un
                      backend o persistencia real.
                    </CardDescription>
                  </div>

                  <div className="rounded-lg border bg-muted/40 p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Resumen
                    </p>
                    <pre className="overflow-auto whitespace-pre-wrap break-words text-xs leading-6 text-slate-700">
                      {JSON.stringify(form, null, 2)}
                    </pre>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setForm(initialForm)
                      setStep(0)
                    }}
                  >
                    Reiniciar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ToggleRow({
  id,
  title,
  description,
  checked,
  onChange,
}: {
  id: string
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <div
      className={`flex items-start justify-between gap-4 rounded-xl border p-4 transition-colors ${
        checked ? 'border-slate-900 bg-slate-50' : 'border-slate-200 bg-white hover:bg-slate-50'
      }`}
    >
      <div className="space-y-1">
        <Label htmlFor={id} className="cursor-pointer text-sm font-semibold leading-5">
          {title}
        </Label>
        <p className="text-sm leading-5 text-muted-foreground">{description}</p>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className="mt-0.5 shrink-0"
      />
    </div>
  )
}

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight: boolean
}) {
  return (
    <div className={`rounded-lg border p-3 transition-colors ${highlight ? 'border-slate-900 bg-slate-50' : 'border-slate-200 bg-white'}`}>
      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  )
}
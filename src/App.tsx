import { useMemo, useState } from 'react'

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
      form.respiratoryOrCardiac ? 'Resp/Cardiaco' : null,
      form.olderThanThreshold ? 'Mayor a umbral' : null,
      form.youngerThanThreshold ? 'Menor a umbral' : null,
    ].filter(Boolean) as string[]

    return flags.length ? flags.join(' • ') : 'Sin riesgos declarados'
  }, [form])

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const next = () => setStep((s) => Math.min(s + 1, 4))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const cardBase = 'w-full rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]'
  const inputBase =
    'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white'
  const buttonBase =
    'inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50'

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#eef2ff,_#f8fafc_40%,_#ffffff_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className={`${cardBase} overflow-hidden p-6 sm:p-8`}>
            <div className="flex h-full flex-col justify-between gap-8">
              <div className="space-y-4">
                <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  SmartHome MVP
                </div>

                {step === 0 && (
                  <>
                    <h1 className="max-w-lg text-3xl font-black tracking-tight sm:text-4xl">
                      Prevención inteligente para el hogar.
                    </h1>
                    <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                      Detectamos señales de riesgo y activamos respuestas simples para reducir
                      problemas de salud en casa.
                    </p>
                  </>
                )}

                {step > 0 && (
                  <>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <span className="rounded-full bg-slate-900 px-3 py-1 font-semibold text-white">
                        Paso {step} de 4
                      </span>
                      <span>Onboarding rápido</span>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                      {step === 1 && 'Creá tu cuenta'}
                      {step === 2 && 'Datos del hogar'}
                      {step === 3 && 'Contacto de emergencia'}
                      {step === 4 && 'Listo'}
                    </h2>
                    <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                      {step === 1 &&
                        'Usamos tus credenciales solo para identificar el perfil del usuario en memoria durante la demo.'}
                      {step === 2 &&
                        'Estos datos ajustan los thresholds de riesgo de manera simple para el MVP.'}
                      {step === 3 &&
                        'Guardamos un contacto para simular la escalada de alertas.'}
                      {step === 4 &&
                        'La vista final muestra el estado del onboarding en memoria para demostrar el flujo.'}
                    </p>
                  </>
                )}
              </div>

              <div className="rounded-3xl bg-slate-50 p-4 sm:p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Estado del perfil
                </div>
                <div className="mt-2 text-sm text-slate-700">{thresholdSummary}</div>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <Stat label="Salud" value={form.respiratoryOrCardiac ? 'Alto' : 'Normal'} />
                  <Stat label="Edad" value={form.olderThanThreshold || form.youngerThanThreshold ? 'Sensitivo' : 'Base'} />
                  <Stat label="Contacto" value={form.emergencyContact.trim() ? 'Cargado' : 'Pendiente'} />
                </div>
              </div>
            </div>
          </section>

          <section className={`${cardBase} p-6 sm:p-8`}>
            {step === 0 && (
              <div className="flex min-h-[420px] flex-col justify-center gap-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-2xl text-white">
                  ⌂
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold sm:text-3xl">Protegé tu hogar</h2>
                  <p className="mx-auto max-w-md text-sm leading-6 text-slate-600 sm:text-base">
                    Una demo simple para cargar el perfil del hogar y mostrar cómo el sistema
                    puede adaptar sus acciones según el riesgo.
                  </p>
                </div>
                <div className="pt-2">
                  <button className={`${buttonBase} w-full bg-slate-900 text-white hover:bg-slate-800`} onClick={next}>
                    Comenzar
                  </button>
                </div>
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
                <Field label="Email">
                  <input
                    className={inputBase}
                    type="email"
                    placeholder="tuemail@dominio.com"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                  />
                </Field>

                <Field label="Contraseña">
                  <input
                    className={inputBase}
                    type="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => update('password', e.target.value)}
                  />
                </Field>

                <div className="flex gap-3 pt-2">
                  <button className={`${buttonBase} flex-1 border border-slate-200 bg-white hover:bg-slate-50`} type="button" onClick={back}>
                    Atrás
                  </button>
                  <button className={`${buttonBase} flex-1 bg-slate-900 text-white hover:bg-slate-800`} type="submit" disabled={!canContinueAuth}>
                    Continuar
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <ToggleRow
                  title="¿Hay alguien en la casa con enfermedades respiratorias y/o cardíacas?"
                  description="Asma, EPOC, cardiopatías u otros cuadros sensibles."
                  checked={form.respiratoryOrCardiac}
                  onChange={(checked) => update('respiratoryOrCardiac', checked)}
                />
                <ToggleRow
                  title={`¿Hay alguien en la casa mayor a ${'x'} años?`}
                  description="Marcá esta opción si el hogar tiene personas mayores."
                  checked={form.olderThanThreshold}
                  onChange={(checked) => update('olderThanThreshold', checked)}
                />
                <ToggleRow
                  title={`¿Hay alguien en la casa menor a ${'x'} años?`}
                  description="Marcá esta opción si el hogar tiene menores."
                  checked={form.youngerThanThreshold}
                  onChange={(checked) => update('youngerThanThreshold', checked)}
                />

                <div className="flex gap-3 pt-2">
                  <button className={`${buttonBase} flex-1 border border-slate-200 bg-white hover:bg-slate-50`} type="button" onClick={back}>
                    Atrás
                  </button>
                  <button className={`${buttonBase} flex-1 bg-slate-900 text-white hover:bg-slate-800`} type="button" onClick={next}>
                    Continuar
                  </button>
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
                <Field label="Contacto de emergencia">
                  <input
                    className={inputBase}
                    type="text"
                    placeholder="Nombre y teléfono"
                    value={form.emergencyContact}
                    onChange={(e) => update('emergencyContact', e.target.value)}
                  />
                </Field>

                <div className="flex gap-3 pt-2">
                  <button className={`${buttonBase} flex-1 border border-slate-200 bg-white hover:bg-slate-50`} type="button" onClick={back}>
                    Atrás
                  </button>
                  <button className={`${buttonBase} flex-1 bg-slate-900 text-white hover:bg-slate-800`} type="submit" disabled={!canFinish}>
                    Finalizar
                  </button>
                </div>
              </form>
            )}

            {step === 4 && (
              <div className="flex min-h-[420px] flex-col justify-between gap-6">
                <div className="space-y-4 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-2xl text-emerald-700">
                    ✓
                  </div>
                  <h2 className="text-2xl font-bold sm:text-3xl">Sistema activado</h2>
                  <p className="text-sm leading-6 text-slate-600 sm:text-base">
                    Los datos quedaron cargados en memoria para la demo. Podés conectar después un
                    backend o persistencia real.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-50 p-4 text-left">
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Resumen
                  </div>
                  <pre className="overflow-auto whitespace-pre-wrap break-words text-xs leading-6 text-slate-700">
{JSON.stringify(form, null, 2)}
                  </pre>
                </div>

                <div className="flex gap-3">
                  <button className={`${buttonBase} flex-1 border border-slate-200 bg-white hover:bg-slate-50`} type="button" onClick={() => setStep(0)}>
                    Reiniciar
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  )
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-full rounded-3xl border p-4 text-left transition ${
        checked ? 'border-slate-900 bg-slate-50' : 'border-slate-200 bg-white hover:bg-slate-50'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="text-sm font-semibold leading-6 text-slate-900">{title}</div>
          <div className="text-sm leading-6 text-slate-600">{description}</div>
        </div>
        <div
          className={`mt-0.5 flex h-6 w-11 items-center rounded-full p-1 transition ${
            checked ? 'bg-slate-900' : 'bg-slate-300'
          }`}
          aria-hidden="true"
        >
          <div className={`h-4 w-4 rounded-full bg-white transition ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
        </div>
      </div>
    </button>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
      <div className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-semibold text-slate-900">{value}</div>
    </div>
  )
}

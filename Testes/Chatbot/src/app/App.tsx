import { useState } from 'react';
import ChatWidget from './components/ChatWidget';

const plans = [
  {
    name: 'Básico',
    price: '199',
    icon: '💼',
    color: 'border-gray-200',
    badge: null,
    features: [
      'Consultas ilimitadas',
      'Exames laboratoriais',
      'Raio-X e ultrassom',
      'Rede credenciada ampla',
      'Pronto-socorro 24h',
      'Agendamento online',
    ],
    unavailable: ['Internações', 'Cirurgias eletivas', 'Atendimento domiciliar'],
  },
  {
    name: 'Premium',
    price: '349',
    icon: '💎',
    color: 'border-teal-500',
    badge: 'Mais popular',
    features: [
      'Tudo do Plano Básico',
      'Internações e cirurgias',
      'Tomografia e ressonância',
      'Endoscopia',
      'UTI e emergências',
      'Acompanhante 24h',
    ],
    unavailable: ['Atendimento domiciliar', 'Rede internacional'],
  },
  {
    name: 'VIP',
    price: '549',
    icon: '⭐',
    color: 'border-amber-400',
    badge: 'Sem carência',
    features: [
      'Tudo do Plano Premium',
      'Atendimento domiciliar',
      'Rede internacional',
      'Sem carência',
      'Médico de família',
      'Check-up anual completo',
    ],
    unavailable: [],
  },
];

const benefits = [
  { icon: '🏥', title: '+300 Hospitais', desc: 'Rede credenciada em todo o Brasil' },
  { icon: '👨‍⚕️', title: '+2.000 Médicos', desc: 'Especialistas em todas as áreas' },
  { icon: '📱', title: 'App & Online', desc: 'Agendamento e resultados digitais' },
  { icon: '🚑', title: 'Emergência 24h', desc: 'Atendimento a qualquer hora' },
  { icon: '🧬', title: '+50 Especialidades', desc: 'Cobertura médica completa' },
  { icon: '💊', title: 'Descontos em Farmácias', desc: 'Até 40% em medicamentos' },
];

const testimonials = [
  {
    name: 'Ana Paula Silva',
    role: 'Beneficiária há 3 anos',
    text: 'O ConvênioSaúde+ mudou minha vida. Agendamento fácil, médicos excelentes e atendimento rápido. Recomendo para toda a família!',
    avatar: 'AP',
  },
  {
    name: 'Carlos Mendes',
    role: 'Plano Premium',
    text: 'Precisei de uma internação urgente e fui atendido em menos de 1 hora. A cobertura é completa e o suporte é incrível.',
    avatar: 'CM',
  },
  {
    name: 'Fernanda Costa',
    role: 'Plano VIP',
    text: 'O check-up anual completo é fantástico. Detectamos problemas cedo e hoje estou muito bem. Vale cada centavo!',
    avatar: 'FC',
  },
];

const navLinks = ['Planos', 'Cobertura', 'Rede Credenciada', 'Blog', 'Contato'];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Convênio<span className="text-teal-600">Saúde+</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors">
                Área do Beneficiário
              </a>
              <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
                Contratar Plano
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-100 mt-1 pt-3 space-y-2">
              {navLinks.map((link) => (
                <a key={link} href="#" className="block py-2 text-sm font-medium text-gray-700 hover:text-teal-600">
                  {link}
                </a>
              ))}
              <div className="pt-2 space-y-2">
                <a href="#" className="block py-2 text-sm font-medium text-gray-600">Área do Beneficiário</a>
                <button className="w-full py-2 bg-teal-600 text-white text-sm font-semibold rounded-lg">
                  Contratar Plano
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-emerald-50 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100 rounded-full opacity-40 blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-100 rounded-full opacity-50 blur-3xl translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold mb-6">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></span>
                Mais de 500 mil beneficiários satisfeitos
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Cuidamos da sua saúde,{' '}
                <span className="text-teal-600">você cuida do que ama</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Planos de saúde completos com ampla rede credenciada, atendimento 24h e
                agendamento digital. Sua saúde em boas mãos, onde você estiver.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-teal-200 hover:scale-[1.02] text-center">
                  Conhecer Planos
                </button>
                <button className="px-8 py-3.5 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-xl transition-all border border-gray-200 shadow-sm hover:scale-[1.02] text-center">
                  Falar com Especialista
                </button>
              </div>

              <div className="flex items-center gap-6 mt-10">
                <div className="flex -space-x-3">
                  {['MR', 'JS', 'KC', 'LP'].map((initials) => (
                    <div
                      key={initials}
                      className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-amber-400 text-sm">★★★★★</div>
                  <p className="text-xs text-gray-500 mt-0.5">+8.000 avaliações 5 estrelas</p>
                </div>
              </div>
            </div>

            {/* Hero illustration */}
            <div className="hidden lg:flex justify-center">
              <div className="relative w-96 h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl shadow-2xl opacity-10 rotate-6"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl shadow-2xl -rotate-3"></div>
                <div className="relative bg-white rounded-3xl shadow-xl p-8 flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center text-3xl">🏥</div>
                    <div>
                      <p className="font-bold text-gray-900">Consulta Agendada</p>
                      <p className="text-sm text-gray-500">Cardiologia · Amanhã, 10h</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl">🔬</div>
                    <div>
                      <p className="font-bold text-gray-900">Exames Prontos</p>
                      <p className="text-sm text-gray-500">Resultado disponível online</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl">💊</div>
                    <div>
                      <p className="font-bold text-gray-900">Desconto em Farmácia</p>
                      <p className="text-sm text-gray-500">Economia de R$ 48,00 hoje</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl">⭐</div>
                    <div>
                      <p className="font-bold text-gray-900">Check-up Anual</p>
                      <p className="text-sm text-gray-500">Próxima revisão em 30 dias</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-teal-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: '+500 mil', label: 'Beneficiários' },
              { value: '+2.000', label: 'Médicos credenciados' },
              { value: '+300', label: 'Hospitais parceiros' },
              { value: '24 anos', label: 'De experiência' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl lg:text-4xl font-bold">{value}</p>
                <p className="text-teal-200 mt-1 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLANS ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Planos para cada necessidade
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Escolha o plano ideal para você e sua família. Todos com carência reduzida e
              cobertura nacional.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl border-2 ${plan.color} p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-teal-600 text-white text-xs font-bold rounded-full shadow">
                    {plan.badge}
                  </span>
                )}
                <div className="text-4xl mb-4">{plan.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Plano {plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-sm text-gray-500">R$</span>
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-gray-400 text-sm">/mês</span>
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                  {plan.unavailable.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-400">
                      <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.badge
                      ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-md hover:shadow-teal-200'
                      : 'bg-gray-100 hover:bg-teal-50 text-gray-800 hover:text-teal-700 border border-gray-200 hover:border-teal-300'
                  }`}
                >
                  Contratar {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher o ConvênioSaúde+?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Oferecemos muito mais do que cobertura médica. Oferecemos tranquilidade para você
              e sua família.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {benefits.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-2xl bg-gray-50 hover:bg-teal-50 border border-transparent hover:border-teal-100 transition-all duration-200 group"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h4 className="font-bold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">{title}</h4>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              O que nossos beneficiários dizem
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(({ name, role, text, avatar }) => (
              <div key={name} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex text-amber-400 text-sm mb-4">★★★★★</div>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center text-white text-sm font-bold">
                    {avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{name}</p>
                    <p className="text-xs text-gray-500">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Cuide-se com quem entende de saúde
          </h2>
          <p className="text-teal-100 text-lg mb-10 max-w-xl mx-auto">
            Junte-se a mais de 500 mil brasileiros que confiam no ConvênioSaúde+. Sem burocracia,
            com muito cuidado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-white text-teal-700 font-bold rounded-xl hover:bg-teal-50 transition-all shadow-lg hover:scale-[1.02]">
              Ver Planos
            </button>
            <button className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/30 transition-all hover:scale-[1.02]">
              Falar com Consultor
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
                  </svg>
                </div>
                <span className="text-white font-bold">ConvênioSaúde+</span>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                Cuidando da saúde dos brasileiros há 24 anos com qualidade e dedicação.
              </p>
              <div className="flex gap-3">
                {['f', 'in', '▶'].map((s) => (
                  <a key={s} href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-teal-600 flex items-center justify-center text-xs transition-colors">
                    {s}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-4 text-sm">Planos</h5>
              <ul className="space-y-2 text-sm">
                {['Plano Básico', 'Plano Premium', 'Plano VIP', 'Planos Empresariais'].map((l) => (
                  <li key={l}><a href="#" className="hover:text-teal-400 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-4 text-sm">Serviços</h5>
              <ul className="space-y-2 text-sm">
                {['Agendar Consulta', 'Rede Credenciada', 'Resultados Online', 'Carteirinha Digital', 'App Mobile'].map((l) => (
                  <li key={l}><a href="#" className="hover:text-teal-400 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-4 text-sm">Contato</h5>
              <ul className="space-y-2 text-sm">
                <li>📞 0800-123-4567</li>
                <li>💬 WhatsApp: (11) 98765-4321</li>
                <li>📧 contato@conveniosaudemais.com.br</li>
                <li className="pt-1 text-xs">Seg-Sex: 8h às 20h<br />Sáb: 8h às 14h</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <p>© 2025 ConvênioSaúde+. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-teal-400 transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-teal-400 transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-teal-400 transition-colors">ANS</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── CHAT WIDGET ── */}
      <ChatWidget />
    </div>
  );
}

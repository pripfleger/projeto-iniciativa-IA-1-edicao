import { useState } from 'react';
import type { AppUser, UserRole } from '../App';
import { Eye, EyeOff, Accessibility, ArrowLeft, GraduationCap, Briefcase } from 'lucide-react';
import logoImg from '../../imports/mundo_unifecaf_1.png';

interface LoginProps {
  onLogin: (user: AppUser) => void;
}

type Portal = null | 'aluno' | 'staff';

const STAFF_ROLES: { id: UserRole; label: string; description: string; color: string; bg: string; user: AppUser }[] = [
  {
    id: 'colaborador',
    label: 'Colaborador',
    description: 'Secretaria, atendimento e financeiro',
    color: '#0369A1',
    bg: '#E0F2FE',
    user: {
      name: 'Carlos Eduardo Lima',
      email: 'carlos.lima@polo.unifecaf.edu.br',
      role: 'colaborador',
      polo: 'Polo Paulista — São Paulo/SP',
    },
  },
  {
    id: 'coordenador',
    label: 'Coordenador',
    description: 'Gestão do polo, equipe e relatórios',
    color: '#065F46',
    bg: '#D1FAE5',
    user: {
      name: 'Mariana Oliveira Costa',
      email: 'mariana.costa@polo.unifecaf.edu.br',
      role: 'coordenador',
      polo: 'Polo Paulista — São Paulo/SP',
    },
  },
  {
    id: 'admin',
    label: 'Administrador',
    description: 'Acesso total ao sistema',
    color: '#9D174D',
    bg: '#FCE7F3',
    user: {
      name: 'Roberto Ferreira Neto',
      email: 'roberto.ferreira@unifecaf.edu.br',
      role: 'admin',
      polo: 'Reitoria — Sede Central',
    },
  },
];

const STUDENT_USER: AppUser = {
  name: 'Ana Beatriz Santos',
  email: 'ana.santos@aluno.unifecaf.edu.br',
  role: 'aluno',
  polo: 'Polo Paulista — São Paulo/SP',
  ra: '2024001423',
  course: 'Análise e Desenvolvimento de Sistemas',
};

function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 32, md: 44, lg: 72 };
  const px = sizes[size];
  return (
    <img
      src={logoImg}
      alt="Mundo UniFECAF"
      style={{ width: px, height: px }}
      className="object-contain"
    />
  );
}

/* ─── Portal chooser ─── */
function PortalChooser({ onChoose, fontSize, setFontSize }: {
  onChoose: (p: 'aluno' | 'staff') => void;
  fontSize: number;
  setFontSize: (f: (n: number) => number) => void;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F5F4FB] relative overflow-hidden px-4" style={{ fontSize }}>
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-200/20 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-violet-200/20 blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Logo + brand */}
        <div className="flex flex-col items-center mb-10">
          <Logo size="lg" />
          <div className="mt-4 text-center">
            <h1 className="text-3xl font-bold text-[#0F4C75]" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Mundo UniFECAF
            </h1>
            <p className="text-gray-500 mt-1 text-sm">Seu portal educacional unificado</p>
          </div>
        </div>

        {/* Portal cards */}
        <p className="text-center text-sm text-gray-400 mb-5">Como você vai acessar hoje?</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Aluno */}
          <button
            onClick={() => onChoose('aluno')}
            className="group relative bg-white rounded-2xl p-7 shadow-sm border-2 border-transparent hover:border-violet-400 hover:shadow-lg transition-all text-left overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center mb-4 group-hover:bg-violet-600 transition-colors">
                <GraduationCap size={24} className="text-violet-600 group-hover:text-white transition-colors" />
              </div>
              <h2 className="font-bold text-gray-800 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>Sou Aluno</h2>
              <p className="text-xs text-gray-400 leading-relaxed">Acesse suas aulas, notas, boletos e suporte acadêmico</p>
            </div>
          </button>

          {/* Colaborador / Staff */}
          <button
            onClick={() => onChoose('staff')}
            className="group relative bg-white rounded-2xl p-7 shadow-sm border-2 border-transparent hover:border-[#0F4C75] hover:shadow-lg transition-all text-left overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-[#0F4C75] transition-colors">
                <Briefcase size={24} className="text-[#0F4C75] group-hover:text-white transition-colors" />
              </div>
              <h2 className="font-bold text-gray-800 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>Sou Colaborador</h2>
              <p className="text-xs text-gray-400 leading-relaxed">Colaboradores, coordenadores, gestores e administradores</p>
            </div>
          </button>
        </div>

        {/* Accessibility */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="flex items-center gap-1.5 text-gray-400 text-xs">
            <Accessibility size={12} />
            <span>Acessibilidade</span>
          </div>
          <div className="flex items-center gap-1">
            {[['A-', -2], ['A', 0], ['A+', 2]].map(([label, delta]) => (
              <button
                key={label}
                onClick={() => setFontSize(f => delta === 0 ? 16 : Math.min(24, Math.max(12, f + (delta as number))))}
                className="w-7 h-7 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-[11px] text-gray-300 mt-6">
          © 2025 UniFECAF · Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}

/* ─── Student login ─── */
function StudentLogin({ onLogin, onBack }: { onLogin: (u: AppUser) => void; onBack: () => void }) {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => onLogin(STUDENT_USER), 900);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F5F4FB] px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-violet-200/25 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-200/15 blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl shadow-violet-200/40">
        {/* Left panel */}
        <div className="bg-[#1E1B4B] p-10 flex-col justify-between hidden lg:flex">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <Logo size="md" />
              <div>
                <div className="text-white font-bold text-lg leading-tight" style={{ fontFamily: 'Nunito, sans-serif' }}>Mundo</div>
                <div className="text-violet-300 text-sm leading-tight">UniFECAF</div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white leading-snug mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Olá, aluno!<br />
              <span className="text-violet-300">Bem-vindo de volta.</span>
            </h2>
            <p className="text-violet-200/70 text-sm leading-relaxed">
              Acesse suas aulas, notas, boletos e suporte — tudo em um só lugar.
            </p>
          </div>
          <div className="space-y-3">
            {['Minhas disciplinas e conteúdo online', 'Biblioteca digital integrada', 'Financeiro e boletos', 'Chat de suporte acadêmico'].map(item => (
              <div key={item} className="flex items-center gap-2 text-violet-200/70 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <button onClick={onBack} className="flex items-center gap-1.5 text-violet-300/60 hover:text-violet-300 text-xs transition-colors">
            <ArrowLeft size={12} /> Voltar à tela inicial
          </button>
        </div>

        {/* Right panel */}
        <div className="bg-white p-8 lg:p-10 flex flex-col">
          <button onClick={onBack} className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 text-xs mb-6 lg:hidden transition-colors">
            <ArrowLeft size={12} /> Voltar
          </button>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-5 lg:hidden">
              <Logo size="sm" />
              <span className="font-bold text-[#0F4C75]" style={{ fontFamily: 'Nunito, sans-serif' }}>Mundo UniFECAF</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold mb-3">
              <GraduationCap size={12} /> Portal do Aluno
            </div>
            <h2 className="text-gray-800 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>Acesse sua conta</h2>
            <p className="text-sm text-gray-400">Use seu e-mail institucional (@aluno.unifecaf.edu.br)</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">E-mail institucional</label>
              <input
                type="email"
                defaultValue="ana.santos@aluno.unifecaf.edu.br"
                placeholder="seu.nome@aluno.unifecaf.edu.br"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Senha</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  defaultValue="••••••••"
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" aria-label="Mostrar senha">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="text-right mt-1">
                <a href="#" className="text-xs text-violet-600 hover:underline">Esqueci minha senha</a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 active:scale-95 transition-all disabled:opacity-60"
            >
              {loading ? 'Entrando...' : 'Entrar no portal'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
            Problema com acesso? <a href="#" className="text-violet-600 hover:underline">Fale com o suporte</a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Staff login ─── */
function StaffLogin({ onLogin, onBack }: { onLogin: (u: AppUser) => void; onBack: () => void }) {
  const [email, setEmail] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // Resolve role from email for prototype purposes
  const resolveUser = (email: string): AppUser => {
    const e = email.toLowerCase();
    if (e.includes('coord') || e.includes('mariana'))
      return STAFF_ROLES.find(r => r.id === 'coordenador')!.user;
    if (e.includes('admin') || e.includes('roberto') || e.includes('gestor'))
      return STAFF_ROLES.find(r => r.id === 'admin')!.user;
    return STAFF_ROLES.find(r => r.id === 'colaborador')!.user;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const resolved = resolveUser(email || 'colaborador@polo.unifecaf.edu.br');
    setTimeout(() => onLogin(resolved), 900);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F5F4FB] px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-200/20 blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-teal-100/30 blur-3xl -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl shadow-blue-200/40">
        {/* Left panel */}
        <div className="p-10 flex-col justify-between hidden lg:flex" style={{ background: '#0F4C75' }}>
          <div>
            <div className="flex items-center gap-3 mb-10">
              <Logo size="md" />
              <div>
                <div className="text-white font-bold text-lg leading-tight" style={{ fontFamily: 'Nunito, sans-serif' }}>Mundo</div>
                <div className="text-blue-200 text-sm leading-tight">UniFECAF</div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white leading-snug mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Portal da<br />
              <span className="text-blue-200">Equipe UniFECAF.</span>
            </h2>
            <p className="text-blue-100/70 text-sm leading-relaxed">
              Gerencie matrículas, financeiro, alunos e relatórios do seu polo em um único ambiente.
            </p>
          </div>
          <div className="space-y-3">
            {['Gestão de matrículas e alunos', 'Financeiro e geração de boletos', 'Relatórios e analytics', 'Configurações do polo'].map(item => (
              <div key={item} className="flex items-center gap-2 text-blue-100/70 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-300 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <button onClick={onBack} className="flex items-center gap-1.5 text-blue-300/60 hover:text-blue-200 text-xs transition-colors">
            <ArrowLeft size={12} /> Voltar à tela inicial
          </button>
        </div>

        {/* Right panel */}
        <div className="bg-white p-8 lg:p-10 flex flex-col">
          <button onClick={onBack} className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 text-xs mb-6 lg:hidden">
            <ArrowLeft size={12} /> Voltar
          </button>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-5 lg:hidden">
              <Logo size="sm" />
              <span className="font-bold text-[#0F4C75]" style={{ fontFamily: 'Nunito, sans-serif' }}>Mundo UniFECAF</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 text-[#0F4C75] text-xs font-semibold mb-3">
              <Briefcase size={12} /> Portal da Equipe
            </div>
            <h2 className="text-gray-800 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>Acesse sua conta</h2>
            <p className="text-sm text-gray-400">Use seu e-mail institucional para entrar</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">E-mail institucional</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="nome@polo.unifecaf.edu.br"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Senha</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  defaultValue="••••••••"
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" aria-label="Mostrar senha">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="text-right mt-1">
                <a href="#" className="text-xs text-blue-600 hover:underline">Esqueci minha senha</a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
              style={{ background: '#0F4C75' }}
            >
              {loading ? 'Verificando...' : 'Entrar'}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-[11px] text-gray-300 text-center leading-relaxed">
              Demonstração: use <span className="font-mono text-gray-400">coord.</span> ou <span className="font-mono text-gray-400">admin.</span> no início do e-mail para simular outros perfis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Root login ─── */
export default function Login({ onLogin }: LoginProps) {
  const [portal, setPortal] = useState<Portal>(null);
  const [fontSize, setFontSize] = useState(16);

  if (portal === 'aluno') return <StudentLogin onLogin={onLogin} onBack={() => setPortal(null)} />;
  if (portal === 'staff') return <StaffLogin onLogin={onLogin} onBack={() => setPortal(null)} />;

  return <PortalChooser onChoose={setPortal} fontSize={fontSize} setFontSize={setFontSize} />;
}

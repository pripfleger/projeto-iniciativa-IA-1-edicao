import { useState } from 'react';
import Layout, { NavItem } from '../Layout';
import type { AppUser } from '../../App';
import {
  Home, Users, UserPlus, DollarSign, FileText, BarChart3,
  Search, Filter, CheckCircle, AlertCircle, Clock, TrendingUp,
  Download, Plus, ChevronRight, Eye, Mail, Phone as PhoneIcon, X
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, ResponsiveContainer, Tooltip, Legend
} from 'recharts';

const navItems: NavItem[] = [
  { id: 'inicio', label: 'Início', icon: Home },
  { id: 'alunos', label: 'Alunos', icon: Users },
  { id: 'matriculas', label: 'Nova Matrícula', icon: UserPlus },
  { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
  { id: 'boletos', label: 'Boletos', icon: FileText },
  { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
];

const alunos = [
  { id: 1, ra: '2024001423', name: 'Ana Beatriz Santos', course: 'ADS', semester: '3º', status: 'ativo', financial: 'em dia', phone: '(11) 99876-5432', email: 'ana.santos@aluno.unifecaf.edu.br', enrolled: '01/02/2024' },
  { id: 2, ra: '2024001398', name: 'Pedro Henrique Alves', course: 'ADM', semester: '2º', status: 'ativo', financial: 'em dia', phone: '(11) 97654-3210', email: 'pedro.alves@aluno.unifecaf.edu.br', enrolled: '01/02/2024' },
  { id: 3, ra: '2023008754', name: 'Juliana Ferreira Dias', course: 'RH', semester: '5º', status: 'ativo', financial: 'inadimplente', phone: '(11) 98765-1234', email: 'juliana.dias@aluno.unifecaf.edu.br', enrolled: '01/08/2023' },
  { id: 4, ra: '2024002001', name: 'Matheus Costa Lima', course: 'LOG', semester: '1º', status: 'ativo', financial: 'em dia', phone: '(11) 95432-8765', email: 'matheus.lima@aluno.unifecaf.edu.br', enrolled: '01/08/2024' },
  { id: 5, ra: '2023006543', name: 'Carla Mendes Souza', course: 'MKT', semester: '4º', status: 'trancado', financial: 'em dia', phone: '(11) 96543-2109', email: 'carla.souza@aluno.unifecaf.edu.br', enrolled: '01/02/2023' },
  { id: 6, ra: '2022004312', name: 'Rafael Oliveira Nunes', course: 'ADS', semester: '6º', status: 'ativo', financial: 'inadimplente', phone: '(11) 94321-0987', email: 'rafael.nunes@aluno.unifecaf.edu.br', enrolled: '01/08/2022' },
  { id: 7, ra: '2024003122', name: 'Bianca Rocha Pereira', course: 'ADM', semester: '1º', status: 'ativo', financial: 'em dia', phone: '(11) 93210-9876', email: 'bianca.pereira@aluno.unifecaf.edu.br', enrolled: '01/08/2024' },
  { id: 8, ra: '2023007890', name: 'Lucas Martins Freitas', course: 'LOG', semester: '3º', status: 'ativo', financial: 'em dia', phone: '(11) 92109-8765', email: 'lucas.freitas@aluno.unifecaf.edu.br', enrolled: '01/02/2023' },
];

const monthlyData = [
  { mes: 'Jan', matriculas: 12, cancelamentos: 1 },
  { mes: 'Fev', matriculas: 34, cancelamentos: 2 },
  { mes: 'Mar', matriculas: 8, cancelamentos: 3 },
  { mes: 'Abr', matriculas: 15, cancelamentos: 1 },
  { mes: 'Mai', matriculas: 22, cancelamentos: 2 },
  { mes: 'Jun', matriculas: 41, cancelamentos: 4 },
];

const revenueData = [
  { mes: 'Jan', receita: 28400 },
  { mes: 'Fev', receita: 45200 },
  { mes: 'Mar', receita: 38700 },
  { mes: 'Abr', receita: 51300 },
  { mes: 'Mai', receita: 47800 },
  { mes: 'Jun', receita: 62100 },
];

const courseDistrib = [
  { name: 'ADS', value: 38, color: '#5B21B6' },
  { name: 'ADM', value: 27, color: '#0369A1' },
  { name: 'RH', value: 15, color: '#065F46' },
  { name: 'LOG', value: 12, color: '#D97706' },
  { name: 'MKT', value: 8, color: '#DB2777' },
];

const COURSE_NAMES: Record<string, string> = {
  ADS: 'Análise e Desenvolvimento de Sistemas',
  ADM: 'Administração',
  RH: 'Gestão de Recursos Humanos',
  LOG: 'Logística',
  MKT: 'Marketing',
};

function StaffHome() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-800 font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>Painel do Polo</h2>
        <p className="text-sm text-gray-500">Polo Paulista — São Paulo/SP · Atualizado agora</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Alunos Ativos', value: '287', delta: '+12 este mês', icon: Users, color: '#5B21B6', bg: '#EDE9FE' },
          { label: 'Matrículas (Jun)', value: '41', delta: '+87% vs Mai', icon: UserPlus, color: '#059669', bg: '#D1FAE5' },
          { label: 'Inadimplentes', value: '23', delta: '8% do total', icon: AlertCircle, color: '#DC2626', bg: '#FEE2E2' },
          { label: 'Cursos Ativos', value: '5', delta: 'funcionando', icon: CheckCircle, color: '#D97706', bg: '#FEF3C7' },
        ].map(item => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: item.bg }}>
                  <Icon size={17} style={{ color: item.color }} />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Nunito, sans-serif' }}>{item.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{item.label}</div>
              <div className="text-xs mt-1" style={{ color: item.color }}>{item.delta}</div>
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
        <h3 className="font-semibold text-gray-800 mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Nova Matrícula', icon: UserPlus, color: '#5B21B6', bg: '#EDE9FE' },
            { label: 'Gerar Boleto', icon: FileText, color: '#0369A1', bg: '#E0F2FE' },
            { label: 'Buscar Aluno', icon: Search, color: '#065F46', bg: '#D1FAE5' },
            { label: 'Ver Relatório', icon: BarChart3, color: '#D97706', bg: '#FEF3C7' },
          ].map(a => {
            const Icon = a.icon;
            return (
              <button key={a.label} className="flex flex-col items-center gap-2 p-4 rounded-xl hover:shadow-sm transition-shadow text-center" style={{ background: a.bg }}>
                <Icon size={22} style={{ color: a.color }} />
                <span className="text-xs font-semibold" style={{ color: a.color }}>{a.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent enrollments */}
      <div className="bg-white rounded-2xl shadow-sm border border-violet-50 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">Matrículas Recentes</h3>
          <span className="text-xs text-violet-600 font-medium">Últimas 24h</span>
        </div>
        <div className="divide-y divide-gray-100">
          {alunos.slice(0, 5).map(a => (
            <div key={a.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-700 flex-shrink-0">
                {a.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-800 truncate">{a.name}</div>
                <div className="text-xs text-gray-400">{COURSE_NAMES[a.course]} · {a.semester}</div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.financial === 'em dia' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                {a.financial}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StaffAlunos() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [selected, setSelected] = useState<typeof alunos[0] | null>(null);

  const filtered = alunos.filter(a =>
    (a.name.toLowerCase().includes(query.toLowerCase()) || a.ra.includes(query)) &&
    (statusFilter === 'todos' || a.status === statusFilter || a.financial === statusFilter)
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-800 font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>Gerenciar Alunos</h2>
        <span className="text-sm text-gray-500">{alunos.length} alunos cadastrados</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar por nome ou RA..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
        </div>
        <div className="flex gap-2">
          {[['todos', 'Todos'], ['ativo', 'Ativos'], ['inadimplente', 'Inadimplentes'], ['trancado', 'Trancados']].map(([val, lbl]) => (
            <button key={val} onClick={() => setStatusFilter(val)}
              className="px-3 py-2 rounded-xl text-xs font-medium transition-colors flex-shrink-0"
              style={{ background: statusFilter === val ? '#5B21B6' : '#EDE9FE', color: statusFilter === val ? '#fff' : '#6B7280' }}>
              {lbl}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-violet-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['Aluno', 'RA', 'Curso', 'Semestre', 'Status', 'Financeiro', 'Ações'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(a => (
                <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-700 flex-shrink-0">
                        {a.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div className="text-sm font-medium text-gray-800 whitespace-nowrap">{a.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-xs font-mono text-gray-500">{a.ra}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-600">{a.course}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-600">{a.semester}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.status === 'ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.financial === 'em dia' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {a.financial}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <button onClick={() => setSelected(a)} className="text-violet-600 hover:text-violet-800 flex items-center gap-1 text-xs font-medium">
                      <Eye size={12} /> Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center text-base font-bold text-violet-700">
                  {selected.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <div className="font-bold text-gray-800">{selected.name}</div>
                  <div className="text-xs text-gray-400">RA: {selected.ra}</div>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <div className="space-y-3 text-sm">
              {[
                ['Curso', COURSE_NAMES[selected.course]],
                ['Semestre', selected.semester],
                ['Status', selected.status],
                ['Financeiro', selected.financial],
                ['Matrícula em', selected.enrolled],
                ['E-mail', selected.email],
                ['Telefone', selected.phone],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-400">{k}</span>
                  <span className="font-medium text-gray-700 text-right">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-5">
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-violet-50 text-violet-700 text-sm font-medium hover:bg-violet-100">
                <Mail size={14} /> E-mail
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-700">
                <PhoneIcon size={14} /> Ligar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StaffMatriculas() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', cpf: '', email: '', phone: '', dob: '', course: '', polo: 'Polo Paulista', payment: 'boleto', discount: '' });
  const [done, setDone] = useState(false);

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const totalSteps = 4;

  if (done) return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <CheckCircle size={32} className="text-green-600" />
      </div>
      <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Nunito, sans-serif' }}>Matrícula Realizada!</h2>
      <p className="text-gray-500 text-sm text-center max-w-xs">A matrícula de <strong>{form.name || 'o aluno'}</strong> foi registrada com sucesso. O boleto foi enviado para o e-mail informado.</p>
      <div className="text-xs text-gray-400 font-mono bg-gray-100 px-3 py-2 rounded-lg">RA gerado: 2025{Math.floor(Math.random() * 90000 + 10000)}</div>
      <button onClick={() => { setDone(false); setStep(1); setForm({ name: '', cpf: '', email: '', phone: '', dob: '', course: '', polo: 'Polo Paulista', payment: 'boleto', discount: '' }); }}
        className="px-6 py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700">
        Nova Matrícula
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-gray-800 font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>Nova Matrícula</h2>

      {/* Steps */}
      <div className="flex items-center gap-0">
        {['Dados Pessoais', 'Curso', 'Financeiro', 'Confirmação'].map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className={`flex items-center gap-2 flex-1 ${i < totalSteps - 1 ? '' : ''}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${step === i + 1 ? 'text-violet-600' : 'text-gray-400'}`}>{s}</span>
            </div>
            {i < totalSteps - 1 && <div className={`h-0.5 flex-1 mx-2 ${step > i + 1 ? 'bg-green-400' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-violet-50">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 mb-4">Dados Pessoais</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm text-gray-600 mb-1.5">Nome Completo *</label>
                <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Ex: Maria da Silva Santos"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-violet-400" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">CPF *</label>
                <input value={form.cpf} onChange={e => update('cpf', e.target.value)} placeholder="000.000.000-00"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-violet-400" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Data de Nascimento *</label>
                <input type="date" value={form.dob} onChange={e => update('dob', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-violet-400" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">E-mail *</label>
                <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="email@exemplo.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-violet-400" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Telefone *</label>
                <input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="(11) 99999-9999"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-violet-400" />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 mb-4">Escolha do Curso</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(COURSE_NAMES).map(([code, name]) => (
                <button key={code} onClick={() => update('course', code)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${form.course === code ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-violet-200'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${form.course === code ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-500'}`}>{code}</div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">{name}</div>
                    <div className="text-xs text-gray-400">Tecnólogo · 3 anos · EAD/Semipresencial</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 mb-4">Configuração Financeira</h3>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Forma de Pagamento</label>
              <div className="grid grid-cols-3 gap-3">
                {['boleto', 'pix', 'cartao'].map(p => (
                  <button key={p} onClick={() => update('payment', p)}
                    className={`py-3 rounded-xl border-2 text-sm font-medium transition-all capitalize ${form.payment === p ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-gray-200 text-gray-500'}`}>
                    {p === 'cartao' ? 'Cartão' : p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Mensalidade base</span><span className="font-medium">R$ 649,00</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Desconto ProUni</span><span className="text-green-600">— R$ 0,00</span></div>
              <div className="flex justify-between pt-2 border-t border-gray-200 font-bold"><span>Total mensal</span><span className="text-violet-700">R$ 649,00</span></div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 mb-4">Confirmação dos Dados</h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
              {[
                ['Nome', form.name || '—'],
                ['Curso', form.course ? COURSE_NAMES[form.course] : '—'],
                ['E-mail', form.email || '—'],
                ['Telefone', form.phone || '—'],
                ['Pagamento', form.payment === 'cartao' ? 'Cartão' : form.payment.charAt(0).toUpperCase() + form.payment.slice(1)],
                ['Mensalidade', 'R$ 649,00'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-1.5 border-b border-gray-100 last:border-0">
                  <span className="text-gray-400">{k}</span>
                  <span className="font-medium text-gray-700">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" className="mt-1" />
              <label htmlFor="terms" className="text-xs text-gray-500">Confirmo que os dados acima estão corretos e que o aluno está ciente dos termos de matrícula e regulamento acadêmico da UniFECAF.</label>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1}
            className="px-5 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40"
          >
            Voltar
          </button>
          <button
            onClick={() => step < totalSteps ? setStep(s => s + 1) : setDone(true)}
            className="px-6 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 flex items-center gap-2"
          >
            {step < totalSteps ? <>Próximo <ChevronRight size={14} /></> : <><CheckCircle size={14} /> Confirmar Matrícula</>}
          </button>
        </div>
      </div>
    </div>
  );
}

function StaffFinanceiro() {
  return (
    <div className="space-y-6">
      <h2 className="text-gray-800 font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>Financeiro do Polo</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Receita Mensal', value: 'R$ 62.100', delta: '+30% vs Mai', color: '#059669', bg: '#D1FAE5' },
          { label: 'Inadimplentes', value: '23 alunos', delta: 'R$ 14.927 em aberto', color: '#DC2626', bg: '#FEE2E2' },
          { label: 'Recebido Hoje', value: 'R$ 3.245', delta: '5 pagamentos', color: '#5B21B6', bg: '#EDE9FE' },
          { label: 'A Vencer (7d)', value: 'R$ 8.437', delta: '13 boletos', color: '#D97706', bg: '#FEF3C7' },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
            <div className="text-2xl font-bold text-gray-800 mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>{item.value}</div>
            <div className="text-xs text-gray-500">{item.label}</div>
            <div className="text-xs mt-1" style={{ color: item.color }}>{item.delta}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
        <h3 className="font-semibold text-gray-800 mb-4">Receita Mensal — 2025</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={revenueData}>
            <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `R$${(v/1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} formatter={(v: number) => [`R$ ${v.toLocaleString('pt-BR')}`, 'Receita']} />
            <Line type="monotone" dataKey="receita" stroke="#7C3AED" strokeWidth={2.5} dot={{ fill: '#7C3AED', r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Inadimplentes */}
      <div className="bg-white rounded-2xl shadow-sm border border-violet-50 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">Alunos Inadimplentes</h3>
          <button className="text-xs text-violet-600 font-medium flex items-center gap-1"><Download size={12} /> Exportar</button>
        </div>
        <div className="divide-y divide-gray-100">
          {alunos.filter(a => a.financial === 'inadimplente').map(a => (
            <div key={a.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-xs font-bold text-red-600 flex-shrink-0">
                {a.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">{a.name}</div>
                <div className="text-xs text-gray-400">{a.email}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-red-600">R$ 649,00</div>
                <div className="text-xs text-gray-400">Em atraso</div>
              </div>
              <button className="px-3 py-1.5 bg-violet-50 text-violet-700 rounded-lg text-xs font-medium hover:bg-violet-100">Cobrar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StaffBoletos() {
  const [ra, setRa] = useState('');
  const [generated, setGenerated] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-gray-800 font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>Gerenciar Boletos</h2>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-violet-50">
        <h3 className="font-semibold text-gray-800 mb-4">Gerar Boleto Manual</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">RA do Aluno</label>
            <div className="flex gap-2">
              <input value={ra} onChange={e => setRa(e.target.value)} placeholder="Ex: 2024001423"
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-violet-400" />
              <button className="px-4 py-2.5 rounded-xl bg-violet-50 text-violet-700 text-sm font-medium hover:bg-violet-100"><Search size={16} /></button>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Referência</label>
            <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-violet-400">
              <option>Mensalidade Junho/2025</option>
              <option>Mensalidade Julho/2025</option>
              <option>Taxa de Rematrícula</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Valor (R$)</label>
            <input defaultValue="649,00" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-violet-400" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Vencimento</label>
            <input type="date" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-violet-400" />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={() => setGenerated(true)} className="px-6 py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700 flex items-center gap-2">
            <Plus size={15} /> Gerar Boleto
          </button>
          {generated && (
            <button className="px-6 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 flex items-center gap-2">
              <Download size={15} /> Download PDF
            </button>
          )}
        </div>
        {generated && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 flex items-center gap-2">
            <CheckCircle size={15} /> Boleto gerado! Código: <span className="font-mono font-bold">34191.09067 58000.023452</span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-violet-50 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">Boletos Emitidos Recentemente</h3>
          <button className="text-xs text-violet-600 font-medium flex items-center gap-1"><Filter size={12} /> Filtrar</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['Aluno', 'Referência', 'Valor', 'Vencimento', 'Status', 'Ação'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {alunos.slice(0, 6).map(a => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-700">{a.name.split(' ').slice(0, 2).join(' ')}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">Mensalidade Jun/2025</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-700">R$ 649,00</td>
                  <td className="px-4 py-3 text-xs text-gray-500">10/06/2025</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.financial === 'em dia' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {a.financial === 'em dia' ? 'Pago' : 'Pendente'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-violet-600 hover:underline text-xs flex items-center gap-1"><Download size={11} /> PDF</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StaffRelatorios() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-800 font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>Relatórios</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700">
          <Download size={14} /> Exportar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
          <h3 className="font-semibold text-gray-800 mb-4">Matrículas por Mês — 2025</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="matriculas" name="Matrículas" fill="#7C3AED" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cancelamentos" name="Cancelamentos" fill="#FCA5A5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
          <h3 className="font-semibold text-gray-800 mb-4">Distribuição por Curso</h3>
          <div className="flex items-center justify-between">
            <ResponsiveContainer width="60%" height={180}>
              <PieChart>
                <Pie data={courseDistrib} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3}>
                  {courseDistrib.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: 'none', fontSize: 11 }} formatter={(v: number) => [`${v}%`, 'Alunos']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {courseDistrib.map(c => (
                <div key={c.name} className="flex items-center gap-2 text-sm">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
                  <span className="text-gray-600 flex-1">{c.name}</span>
                  <span className="font-semibold text-gray-800">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-violet-50 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Resumo do Período</h3>
          <p className="text-xs text-gray-400 mt-0.5">Janeiro a Junho de 2025</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100">
          {[
            { label: 'Total Matrículas', value: '132', icon: UserPlus, color: '#5B21B6' },
            { label: 'Cancelamentos', value: '13', icon: X, color: '#DC2626' },
            { label: 'Receita Total', value: 'R$ 273.500', icon: TrendingUp, color: '#059669' },
            { label: 'Taxa de Retenção', value: '90,1%', icon: CheckCircle, color: '#D97706' },
          ].map(item => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="p-5 text-center">
                <Icon size={20} className="mx-auto mb-2" style={{ color: item.color }} />
                <div className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Nunito, sans-serif' }}>{item.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface StaffAppProps { user: AppUser; onLogout: () => void; }

export default function StaffApp({ user, onLogout }: StaffAppProps) {
  const [currentPage, setCurrentPage] = useState('inicio');

  const renderPage = () => {
    switch (currentPage) {
      case 'inicio': return <StaffHome />;
      case 'alunos': return <StaffAlunos />;
      case 'matriculas': return <StaffMatriculas />;
      case 'financeiro': return <StaffFinanceiro />;
      case 'boletos': return <StaffBoletos />;
      case 'relatorios': return <StaffRelatorios />;
      default: return <StaffHome />;
    }
  };

  return (
    <Layout user={user} navItems={navItems} currentPage={currentPage} onPageChange={setCurrentPage} onLogout={onLogout} roleLabel="Colaborador" roleBadgeColor="#0369A1">
      {renderPage()}
    </Layout>
  );
}

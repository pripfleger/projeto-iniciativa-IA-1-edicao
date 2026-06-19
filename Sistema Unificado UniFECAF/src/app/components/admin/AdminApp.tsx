import { useState } from 'react';
import Layout, { NavItem } from '../Layout';
import type { AppUser } from '../../App';
import {
  Home, Users, Building2, Settings, BarChart3,
  Shield, CheckCircle, AlertCircle, Globe, Database,
  TrendingUp, Download, Search, Plus, Trash2, Edit3,
  Lock, Activity, Server, Bell, Wifi
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, ResponsiveContainer, Tooltip, Legend
} from 'recharts';

const navItems: NavItem[] = [
  { id: 'inicio', label: 'Visão Geral', icon: Home },
  { id: 'usuarios', label: 'Usuários', icon: Users },
  { id: 'polo', label: 'Configurar Polo', icon: Building2 },
  { id: 'relatorios', label: 'Relatórios Globais', icon: BarChart3 },
  { id: 'configuracoes', label: 'Configurações', icon: Settings },
];

const allUsers = [
  { id: 1, name: 'Ana Beatriz Santos', email: 'ana.santos@aluno.unifecaf.edu.br', role: 'aluno', polo: 'Polo Paulista', status: 'ativo', lastLogin: 'Hoje 14:32' },
  { id: 2, name: 'Carlos Eduardo Lima', email: 'carlos.lima@polo.unifecaf.edu.br', role: 'colaborador', polo: 'Polo Paulista', status: 'ativo', lastLogin: 'Hoje 09:15' },
  { id: 3, name: 'Mariana Oliveira Costa', email: 'mariana.costa@polo.unifecaf.edu.br', role: 'coordenador', polo: 'Polo Paulista', status: 'ativo', lastLogin: 'Hoje 08:04' },
  { id: 4, name: 'Pedro Henrique Alves', email: 'pedro.alves@aluno.unifecaf.edu.br', role: 'aluno', polo: 'Polo Paulista', status: 'ativo', lastLogin: 'Ontem 22:10' },
  { id: 5, name: 'Fernanda Aparecida Gomes', email: 'fernanda.gomes@polo.unifecaf.edu.br', role: 'colaborador', polo: 'Polo Paulista', status: 'ativo', lastLogin: 'Ontem 17:50' },
  { id: 6, name: 'Juliana Ferreira Dias', email: 'juliana.dias@aluno.unifecaf.edu.br', role: 'aluno', polo: 'Polo Norte', status: 'inativo', lastLogin: '10/06/2025' },
  { id: 7, name: 'Diego Correia Santos', email: 'diego.santos@polo.unifecaf.edu.br', role: 'colaborador', polo: 'Polo Norte', status: 'ativo', lastLogin: 'Hoje 11:22' },
  { id: 8, name: 'Bianca Rocha Pereira', email: 'bianca.pereira@aluno.unifecaf.edu.br', role: 'aluno', polo: 'Polo Sul', status: 'ativo', lastLogin: 'Hoje 16:05' },
];

const polosData = [
  { name: 'Polo Paulista', city: 'São Paulo/SP', students: 287, staff: 4, status: 'ativo', revenue: 'R$ 186.3k' },
  { name: 'Polo Norte', city: 'Guarulhos/SP', students: 198, staff: 3, status: 'ativo', revenue: 'R$ 128.7k' },
  { name: 'Polo Sul', city: 'Santo André/SP', students: 154, staff: 3, status: 'ativo', revenue: 'R$ 100.1k' },
  { name: 'Polo Leste', city: 'São Bernardo/SP', students: 87, staff: 2, status: 'implantação', revenue: 'R$ 56.5k' },
];

const globalRevenueData = [
  { mes: 'Jan', poloP: 28400, poloN: 19200, poloS: 14100 },
  { mes: 'Fev', poloP: 45200, poloN: 31000, poloS: 22300 },
  { mes: 'Mar', poloP: 38700, poloN: 26400, poloS: 18800 },
  { mes: 'Abr', poloP: 51300, poloN: 35100, poloS: 25700 },
  { mes: 'Mai', poloP: 47800, poloN: 32900, poloS: 23400 },
  { mes: 'Jun', poloP: 62100, poloN: 43200, poloS: 30800 },
];

const systemLogs = [
  { time: '16:42', level: 'info', msg: 'Login: mariana.costa@polo.unifecaf.edu.br (Polo Paulista)' },
  { time: '16:38', level: 'success', msg: 'Matrícula #2025006 confirmada — Rafael Nascimento' },
  { time: '16:21', level: 'warning', msg: 'Tentativa de login com senha incorreta — admin@teste.com (3x)' },
  { time: '16:10', level: 'info', msg: 'Boleto BOL-2025-06-0289 gerado por carlos.lima' },
  { time: '15:55', level: 'success', msg: 'Pagamento confirmado — Ana Beatriz Santos · R$ 649,00' },
  { time: '15:30', level: 'error', msg: 'Erro ao sincronizar integração LMS — timeout após 30s' },
  { time: '15:12', level: 'info', msg: 'Relatório financeiro exportado por roberto.ferreira' },
];

const ROLE_LABELS: Record<string, string> = { aluno: 'Aluno', colaborador: 'Colaborador', coordenador: 'Coordenador', admin: 'Admin' };
const ROLE_COLORS: Record<string, string> = { aluno: '#5B21B6', colaborador: '#0369A1', coordenador: '#065F46', admin: '#9D174D' };

function AdminHome({ user }: { user: AppUser }) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #9D174D 100%)' }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-pink-200 text-sm mb-1">Painel Administrativo — Sede Central</p>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>{user.name.split(' ').slice(0, 2).join(' ')}</h1>
            <p className="text-pink-200 text-sm mt-1">Administrador do Sistema · {user.polo}</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl">
            <Activity size={15} className="text-green-400" />
            <span className="text-sm font-medium">Sistema Online</span>
          </div>
        </div>
      </div>

      {/* Global KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total de Alunos', value: '726', delta: '4 polos ativos', icon: Users, color: '#5B21B6', bg: '#EDE9FE' },
          { label: 'Receita Global/Mês', value: 'R$ 471k', delta: '+24% vs Jun/24', icon: TrendingUp, color: '#059669', bg: '#D1FAE5' },
          { label: 'Usuários do Sistema', value: '754', delta: 'Ativos hoje: 312', icon: Globe, color: '#0369A1', bg: '#E0F2FE' },
          { label: 'Uptime do Sistema', value: '99.8%', delta: 'Últimos 30 dias', icon: Server, color: '#D97706', bg: '#FEF3C7' },
        ].map(item => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: item.bg }}>
                <Icon size={17} style={{ color: item.color }} />
              </div>
              <div className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Nunito, sans-serif' }}>{item.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{item.label}</div>
              <div className="text-xs mt-1" style={{ color: item.color }}>{item.delta}</div>
            </div>
          );
        })}
      </div>

      {/* Polos overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-violet-50 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">Visão por Polo</h3>
          <span className="text-xs text-gray-400">{polosData.length} polos cadastrados</span>
        </div>
        <div className="divide-y divide-gray-100">
          {polosData.map(polo => (
            <div key={polo.name} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-pink-100 flex items-center justify-center">
                <Building2 size={16} className="text-pink-700" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-800">{polo.name}</div>
                <div className="text-xs text-gray-400">{polo.city} · {polo.staff} colaboradores</div>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-gray-800">{polo.students} alunos</div>
                <div className="text-xs text-violet-600">{polo.revenue}/mês</div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${polo.status === 'ativo' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {polo.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* System log */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
        <h3 className="font-semibold text-gray-800 mb-4">Log do Sistema — Hoje</h3>
        <div className="space-y-2">
          {systemLogs.map((log, i) => (
            <div key={i} className="flex items-start gap-3 text-xs font-mono">
              <span className="text-gray-300 flex-shrink-0 mt-0.5">{log.time}</span>
              <span className={`flex-shrink-0 mt-0.5 ${log.level === 'error' ? 'text-red-500' : log.level === 'warning' ? 'text-yellow-500' : log.level === 'success' ? 'text-green-500' : 'text-blue-400'}`}>
                [{log.level.toUpperCase().padEnd(7)}]
              </span>
              <span className="text-gray-600">{log.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminUsuarios() {
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('todos');

  const filtered = allUsers.filter(u =>
    (u.name.toLowerCase().includes(query.toLowerCase()) || u.email.includes(query)) &&
    (roleFilter === 'todos' || u.role === roleFilter)
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-800 font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>Gerenciar Usuários</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-pink-700 text-white text-sm font-semibold rounded-xl hover:bg-pink-800">
          <Plus size={14} /> Novo Usuário
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar usuários..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-pink-400" />
        </div>
        <div className="flex gap-2">
          {['todos', 'aluno', 'colaborador', 'coordenador'].map(r => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className="px-3 py-2 rounded-xl text-xs font-medium capitalize transition-colors flex-shrink-0"
              style={{ background: roleFilter === r ? '#9D174D' : '#FCE7F3', color: roleFilter === r ? '#fff' : '#9D174D' }}>
              {r === 'todos' ? 'Todos' : ROLE_LABELS[r]}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-violet-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['Usuário', 'E-mail', 'Perfil', 'Polo', 'Status', 'Último Login', 'Ações'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: ROLE_COLORS[u.role] }}>
                        {u.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <span className="text-sm font-medium text-gray-800 whitespace-nowrap">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-500">{u.email}</td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: ROLE_COLORS[u.role] + '20', color: ROLE_COLORS[u.role] }}>
                      {ROLE_LABELS[u.role]}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-500">{u.polo}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.status === 'ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-400">{u.lastLogin}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button className="text-violet-600 hover:text-violet-800" title="Editar"><Edit3 size={13} /></button>
                      <button className="text-gray-400 hover:text-red-500" title="Excluir"><Trash2 size={13} /></button>
                    </div>
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

function AdminPolo() {
  return (
    <div className="space-y-6">
      <h2 className="text-gray-800 font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>Gerenciar Polos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {polosData.map(polo => (
          <div key={polo.name} className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                  <Building2 size={18} className="text-pink-700" />
                </div>
                <div>
                  <div className="font-bold text-gray-800">{polo.name}</div>
                  <div className="text-xs text-gray-400">{polo.city}</div>
                </div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${polo.status === 'ativo' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {polo.status}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4 text-center">
              {[
                { label: 'Alunos', value: polo.students },
                { label: 'Equipe', value: polo.staff },
                { label: 'Receita', value: polo.revenue },
              ].map(item => (
                <div key={item.label} className="bg-gray-50 rounded-xl p-2">
                  <div className="text-sm font-bold text-gray-800">{item.value}</div>
                  <div className="text-xs text-gray-400">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-xl bg-violet-50 text-violet-700 text-xs font-medium hover:bg-violet-100 flex items-center justify-center gap-1">
                <Edit3 size={12} /> Editar
              </button>
              <button className="flex-1 py-2 rounded-xl bg-gray-50 text-gray-600 text-xs font-medium hover:bg-gray-100 flex items-center justify-center gap-1">
                <Settings size={12} /> Configurar
              </button>
            </div>
          </div>
        ))}

        <button className="bg-white rounded-2xl p-5 shadow-sm border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 hover:border-violet-300 hover:bg-violet-50/30 transition-colors min-h-[180px]">
          <Plus size={24} className="text-gray-300" />
          <span className="text-sm text-gray-400 font-medium">Adicionar Novo Polo</span>
        </button>
      </div>
    </div>
  );
}

function AdminRelatorios() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-800 font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>Relatórios Globais</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-pink-700 text-white text-sm font-semibold rounded-xl hover:bg-pink-800">
          <Download size={14} /> Exportar Completo
        </button>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
        <h3 className="font-semibold text-gray-800 mb-4">Receita por Polo — 2025</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={globalRevenueData}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0369A1" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#0369A1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 11 }} formatter={(v: number) => [`R$ ${v.toLocaleString('pt-BR')}`, '']} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            <Area type="monotone" dataKey="poloP" name="Polo Paulista" stroke="#7C3AED" fill="url(#g1)" strokeWidth={2} />
            <Area type="monotone" dataKey="poloN" name="Polo Norte" stroke="#059669" fill="url(#g2)" strokeWidth={2} />
            <Area type="monotone" dataKey="poloS" name="Polo Sul" stroke="#0369A1" fill="url(#g3)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Total de Matrículas (2025)', value: '389', color: '#5B21B6' },
          { label: 'Receita Total Jan–Jun', value: 'R$ 1,47M', color: '#059669' },
          { label: 'Taxa de Retenção Global', value: '91%', color: '#0369A1' },
          { label: 'NPS Médio dos Polos', value: '79', color: '#D97706' },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50 text-center">
            <div className="text-2xl font-bold mb-1" style={{ color: item.color, fontFamily: 'Nunito, sans-serif' }}>{item.value}</div>
            <div className="text-xs text-gray-500">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {['Relatório Consolidado', 'Comparativo de Polos', 'Relatório Regulatório (MEC)'].map(name => (
          <button key={name} className="bg-white rounded-2xl p-4 shadow-sm border border-violet-50 hover:shadow-md transition-shadow text-left flex items-start gap-3">
            <Download size={16} className="text-pink-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-gray-800">{name}</div>
              <div className="text-xs text-gray-400 mt-0.5">Baixar em PDF · Excel</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function AdminConfiguracoes() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-gray-800 font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>Configurações do Sistema</h2>

      {/* Integrations */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
        <h3 className="font-semibold text-gray-800 mb-4">Integrações e Sistemas</h3>
        <div className="space-y-4">
          {[
            { name: 'Brightspace (LMS)', desc: 'Ambiente Virtual de Aprendizagem', status: 'conectado', icon: Wifi },
            { name: 'Gateway de Pagamentos', desc: 'Boletos e PIX automatizados', status: 'conectado', icon: CheckCircle },
            { name: 'TOTVS / ERP', desc: 'Integração com sistema financeiro legado', status: 'desconectado', icon: Database },
            { name: 'MEC — e-MEC', desc: 'Envio automático de dados regulatórios', status: 'conectado', icon: Shield },
            { name: 'Biblioteca Minha Biblioteca', desc: 'Acervo digital para alunos', status: 'conectado', icon: Globe },
          ].map(item => {
            const Icon = item.icon;
            return (
              <div key={item.name} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.status === 'conectado' ? 'bg-green-100' : 'bg-red-100'}`}>
                  <Icon size={15} className={item.status === 'conectado' ? 'text-green-600' : 'text-red-500'} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800">{item.name}</div>
                  <div className="text-xs text-gray-400">{item.desc}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.status === 'conectado' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                    {item.status}
                  </span>
                  <button className="text-xs text-violet-600 hover:underline">{item.status === 'conectado' ? 'Config.' : 'Conectar'}</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* System settings */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
        <h3 className="font-semibold text-gray-800 mb-4">Parâmetros do Sistema</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">E-mail do Suporte</label>
            <input defaultValue="suporte@polo.unifecaf.edu.br"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-violet-400" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Telefone do Polo</label>
            <input defaultValue="(11) 3000-9000"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-violet-400" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Dia de Vencimento Padrão</label>
            <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-violet-400">
              <option>Dia 5</option>
              <option>Dia 10</option>
              <option>Dia 15</option>
              <option>Dia 20</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Multa por Atraso (%)</label>
            <input defaultValue="2" type="number"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-violet-400" />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {[
            { label: 'Envio automático de boletos por e-mail', enabled: true },
            { label: 'Notificações de atraso por WhatsApp', enabled: true },
            { label: 'Relatórios automáticos semanais para coordenadores', enabled: false },
            { label: 'Acesso do aluno liberado após matrícula confirmada', enabled: true },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">{item.label}</span>
              <div className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors ${item.enabled ? 'bg-violet-600' : 'bg-gray-200'}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${item.enabled ? 'left-5' : 'left-0.5'}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex gap-2">
          <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
            className="px-6 py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700">
            {saved ? '✓ Salvo!' : 'Salvar Configurações'}
          </button>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
        <h3 className="font-semibold text-gray-800 mb-4">Segurança</h3>
        <div className="space-y-3">
          {[
            { label: 'Autenticação em dois fatores (2FA)', desc: 'Requerido para admin e coordenadores', icon: Shield, status: 'ativo' },
            { label: 'Sessão automática expira em 8h', desc: 'Por inatividade do usuário', icon: Lock, status: 'ativo' },
            { label: 'Log de auditoria completo', desc: 'Todas as ações registradas', icon: Activity, status: 'ativo' },
            { label: 'Notificação de logins suspeitos', desc: 'Alerta ao admin em tempo real', icon: Bell, status: 'ativo' },
          ].map(item => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-green-50">
                <Icon size={15} className="text-green-600 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800">{item.label}</div>
                  <div className="text-xs text-gray-400">{item.desc}</div>
                </div>
                <span className="text-xs text-green-600 font-medium">✓ {item.status}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface AdminAppProps { user: AppUser; onLogout: () => void; }

export default function AdminApp({ user, onLogout }: AdminAppProps) {
  const [currentPage, setCurrentPage] = useState('inicio');

  const renderPage = () => {
    switch (currentPage) {
      case 'inicio': return <AdminHome user={user} />;
      case 'usuarios': return <AdminUsuarios />;
      case 'polo': return <AdminPolo />;
      case 'relatorios': return <AdminRelatorios />;
      case 'configuracoes': return <AdminConfiguracoes />;
      default: return <AdminHome user={user} />;
    }
  };

  return (
    <Layout user={user} navItems={navItems} currentPage={currentPage} onPageChange={setCurrentPage} onLogout={onLogout} roleLabel="Administrador" roleBadgeColor="#9D174D">
      {renderPage()}
    </Layout>
  );
}

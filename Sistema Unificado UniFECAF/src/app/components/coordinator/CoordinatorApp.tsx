import { useState } from 'react';
import Layout, { NavItem } from '../Layout';
import type { AppUser } from '../../App';
import {
  Home, Users, GraduationCap, UserPlus, DollarSign, BarChart3,
  TrendingUp, TrendingDown, AlertCircle, CheckCircle, Star, Award,
  Download, Search, Calendar, Target, Briefcase
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, PieChart, Pie, Cell
} from 'recharts';

const navItems: NavItem[] = [
  { id: 'inicio', label: 'Início', icon: Home },
  { id: 'equipe', label: 'Minha Equipe', icon: Briefcase },
  { id: 'alunos', label: 'Alunos', icon: GraduationCap },
  { id: 'matriculas', label: 'Matrículas', icon: UserPlus },
  { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
  { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
];

const team = [
  { id: 1, name: 'Carlos Eduardo Lima', role: 'Colaborador', area: 'Secretaria Acadêmica', email: 'carlos.lima@polo.unifecaf.edu.br', since: 'Mar/2022', rating: 4.8, active: true },
  { id: 2, name: 'Fernanda Aparecida Gomes', role: 'Colaborador', area: 'Financeiro', email: 'fernanda.gomes@polo.unifecaf.edu.br', since: 'Jun/2023', rating: 4.6, active: true },
  { id: 3, name: 'Diego Correia Santos', role: 'Colaborador', area: 'Atendimento', email: 'diego.santos@polo.unifecaf.edu.br', since: 'Jan/2024', rating: 4.2, active: true },
  { id: 4, name: 'Patricia Lima Rodrigues', role: 'Colaborador', area: 'TI / Suporte', email: 'patricia.rodrigues@polo.unifecaf.edu.br', since: 'Ago/2021', rating: 4.9, active: false },
];

const semesterData = [
  { sem: '2023/1', matriculas: 87, formados: 23, cancelamentos: 8 },
  { sem: '2023/2', matriculas: 103, formados: 19, cancelamentos: 11 },
  { sem: '2024/1', matriculas: 129, formados: 31, cancelamentos: 14 },
  { sem: '2024/2', matriculas: 118, formados: 28, cancelamentos: 9 },
  { sem: '2025/1', matriculas: 141, formados: 0, cancelamentos: 13 },
];

const areaData = [
  { name: 'ADS', value: 38, color: '#5B21B6' },
  { name: 'ADM', value: 27, color: '#0369A1' },
  { name: 'RH', value: 15, color: '#065F46' },
  { name: 'LOG', value: 12, color: '#D97706' },
  { name: 'MKT', value: 8, color: '#DB2777' },
];

const performanceData = [
  { mes: 'Jan', nps: 72, retenção: 91 },
  { mes: 'Fev', nps: 74, retenção: 90 },
  { mes: 'Mar', nps: 78, retenção: 92 },
  { mes: 'Abr', nps: 76, retenção: 89 },
  { mes: 'Mai', nps: 81, retenção: 93 },
  { mes: 'Jun', nps: 83, retenção: 94 },
];

const enrollmentsList = [
  { ra: '2025001', name: 'Isabela Martins', course: 'ADS', date: '12/06/2025', status: 'ativa' },
  { ra: '2025002', name: 'Rodrigo Fernandes', course: 'ADM', date: '11/06/2025', status: 'ativa' },
  { ra: '2025003', name: 'Lorena Carvalho', course: 'MKT', date: '10/06/2025', status: 'pendente' },
  { ra: '2025004', name: 'Thiago Barbosa', course: 'LOG', date: '09/06/2025', status: 'ativa' },
  { ra: '2025005', name: 'Amanda Silva', course: 'RH', date: '08/06/2025', status: 'ativa' },
  { ra: '2025006', name: 'Felipe Nascimento', course: 'ADS', date: '07/06/2025', status: 'cancelada' },
];

function CoordHome({ user }: { user: AppUser }) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #065F46 100%)' }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-emerald-200 text-sm mb-1">Painel da Coordenação</p>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>{user.name.split(' ').slice(0, 2).join(' ')}</h1>
            <p className="text-emerald-200 text-sm mt-1">{user.polo}</p>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-emerald-200 text-xs">NPS do Polo</div>
            <div className="text-4xl font-bold">83</div>
            <div className="text-emerald-200 text-xs">+11 vs ano anterior</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Alunos Ativos', value: '287', delta: '+12 jun', icon: GraduationCap, color: '#5B21B6', bg: '#EDE9FE' },
          { label: 'Taxa de Retenção', value: '94%', delta: 'melhor mês', icon: Target, color: '#059669', bg: '#D1FAE5' },
          { label: 'Matrículas/Mês', value: '41', delta: 'Jun/2025', icon: UserPlus, color: '#0369A1', bg: '#E0F2FE' },
          { label: 'Equipe', value: '4', delta: '3 ativos', icon: Users, color: '#D97706', bg: '#FEF3C7' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
          <h3 className="font-semibold text-gray-800 mb-4">NPS & Retenção — 2025</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={performanceData}>
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 11 }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="nps" name="NPS" stroke="#065F46" strokeWidth={2.5} dot={{ r: 3, fill: '#065F46' }} />
              <Line type="monotone" dataKey="retenção" name="Retenção %" stroke="#7C3AED" strokeWidth={2.5} dot={{ r: 3, fill: '#7C3AED' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
          <h3 className="font-semibold text-gray-800 mb-3">Alertas do Polo</h3>
          <div className="space-y-3">
            {[
              { type: 'warning', msg: '3 alunos com 2 meses de inadimplência — ação necessária', time: 'Hoje' },
              { type: 'info', msg: 'Matrículas do 2º semestre abertas em 01/07', time: '3 dias' },
              { type: 'success', msg: 'Meta de retenção de Junho atingida: 94%', time: '5 dias' },
              { type: 'warning', msg: 'Colaboradora Patricia em férias até 30/06', time: '1 semana' },
            ].map((a, i) => (
              <div key={i} className={`flex gap-3 p-3 rounded-xl text-sm ${a.type === 'warning' ? 'bg-yellow-50' : a.type === 'success' ? 'bg-green-50' : 'bg-blue-50'}`}>
                {a.type === 'warning' ? <AlertCircle size={15} className="text-yellow-600 flex-shrink-0 mt-0.5" /> :
                 a.type === 'success' ? <CheckCircle size={15} className="text-green-600 flex-shrink-0 mt-0.5" /> :
                 <Star size={15} className="text-blue-600 flex-shrink-0 mt-0.5" />}
                <div className="flex-1">
                  <span className="text-gray-700">{a.msg}</span>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CoordEquipe() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-800 font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>Minha Equipe</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700">
          + Adicionar Colaborador
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {team.map(member => (
          <div key={member.id} className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-700">
                  {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{member.name}</div>
                  <div className="text-xs text-gray-400">{member.role}</div>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${member.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {member.active ? 'Ativo' : 'Férias'}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Área</span>
                <span className="text-gray-700 font-medium">{member.area}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Desde</span>
                <span className="text-gray-700 font-medium">{member.since}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Avaliação</span>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-gray-800">{member.rating}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-violet-600 truncate">{member.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CoordAlunos() {
  const [query, setQuery] = useState('');
  const allStudents = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    ra: `202${Math.floor(i / 4)}00${String(i + 1).padStart(4, '0')}`,
    name: ['Ana Beatriz Santos', 'Pedro Henrique Alves', 'Juliana Ferreira Dias', 'Matheus Costa Lima', 'Carla Mendes Souza', 'Rafael Oliveira Nunes', 'Bianca Rocha Pereira', 'Lucas Martins Freitas', 'Isabela Martins', 'Rodrigo Fernandes', 'Lorena Carvalho', 'Thiago Barbosa'][i],
    course: ['ADS', 'ADM', 'RH', 'LOG', 'MKT', 'ADS', 'ADM', 'LOG', 'ADS', 'ADM', 'MKT', 'LOG'][i],
    semester: ['3º', '2º', '5º', '1º', '4º', '6º', '1º', '3º', '1º', '2º', '1º', '1º'][i],
    gpa: [8.4, 7.9, 9.1, 7.2, 9.5, 7.8, 8.2, 8.6, 7.5, 8.9, 8.1, 7.7][i],
    financial: i % 4 === 2 || i % 7 === 0 ? 'inadimplente' : 'em dia',
    status: i === 4 ? 'trancado' : 'ativo',
  }));

  const filtered = allStudents.filter(a => a.name.toLowerCase().includes(query.toLowerCase()) || a.ra.includes(query));

  return (
    <div className="space-y-5">
      <h2 className="text-gray-800 font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>Gestão de Alunos</h2>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total', value: '287', color: '#5B21B6' },
          { label: 'Inadimplentes', value: '23', color: '#DC2626' },
          { label: 'Trancamentos', value: '8', color: '#D97706' },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-2xl p-4 shadow-sm border border-violet-50 text-center">
            <div className="text-2xl font-bold" style={{ color: item.color, fontFamily: 'Nunito, sans-serif' }}>{item.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar aluno..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-violet-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['Aluno', 'RA', 'Curso', 'Sem.', 'Média', 'Status', 'Financeiro'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(a => (
                <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{a.name}</td>
                  <td className="px-4 py-3 text-xs font-mono text-gray-400">{a.ra}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{a.course}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{a.semester}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold ${a.gpa >= 9 ? 'text-green-600' : a.gpa >= 7 ? 'text-gray-700' : 'text-red-500'}`}>{a.gpa.toFixed(1)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${a.status === 'ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{a.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${a.financial === 'em dia' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{a.financial}</span>
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

function CoordMatriculas() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-800 font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>Gestão de Matrículas</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700">
          <Download size={14} /> Exportar
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Novas (Jun)', value: '41', color: '#059669' },
          { label: 'Pendentes', value: '7', color: '#D97706' },
          { label: 'Canceladas', value: '4', color: '#DC2626' },
          { label: 'Total Ativo', value: '287', color: '#5B21B6' },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50 text-center">
            <div className="text-2xl font-bold mb-1" style={{ color: item.color, fontFamily: 'Nunito, sans-serif' }}>{item.value}</div>
            <div className="text-xs text-gray-500">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-violet-50 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">Matrículas Recentes — Junho 2025</h3>
          <span className="text-xs bg-violet-100 text-violet-700 px-2.5 py-1 rounded-full font-medium">{enrollmentsList.length} registros</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['RA', 'Nome', 'Curso', 'Data', 'Status', 'Ação'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {enrollmentsList.map(e => (
                <tr key={e.ra} className="hover:bg-gray-50">
                  <td className="px-5 py-3.5 text-xs font-mono text-gray-400">{e.ra}</td>
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-800">{e.name}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-600">{e.course}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-500">{e.date}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      e.status === 'ativa' ? 'bg-green-100 text-green-700' :
                      e.status === 'pendente' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-600'
                    }`}>{e.status}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="text-emerald-600 hover:underline text-xs font-medium">Ver</button>
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

function CoordFinanceiro() {
  const quarterlyData = [
    { q: 'Q1/24', meta: 120000, realizado: 112300 },
    { q: 'Q2/24', meta: 135000, realizado: 141200 },
    { q: 'Q3/24', meta: 140000, realizado: 138900 },
    { q: 'Q4/24', meta: 155000, realizado: 162400 },
    { q: 'Q1/25', meta: 160000, realizado: 155800 },
    { q: 'Q2/25', meta: 175000, realizado: 140800 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-gray-800 font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>Visão Financeira</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Receita Anual (proj.)', value: 'R$ 671k', delta: '+18% vs 2024', color: '#059669', icon: TrendingUp },
          { label: 'Receita Junho', value: 'R$ 62.1k', delta: '+30% vs Mai', color: '#5B21B6', icon: TrendingUp },
          { label: 'Inadimplência', value: '8%', delta: 'meta: <5%', color: '#DC2626', icon: TrendingDown },
          { label: 'Ticket Médio', value: 'R$ 649', delta: 'estável', color: '#D97706', icon: Award },
        ].map(item => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
              <Icon size={18} className="mb-2" style={{ color: item.color }} />
              <div className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Nunito, sans-serif' }}>{item.value}</div>
              <div className="text-xs text-gray-500">{item.label}</div>
              <div className="text-xs mt-1" style={{ color: item.color }}>{item.delta}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
        <h3 className="font-semibold text-gray-800 mb-4">Meta vs Realizado por Trimestre</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={quarterlyData}>
            <XAxis dataKey="q" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 11 }} formatter={(v: number) => [`R$ ${v.toLocaleString('pt-BR')}`, '']} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="meta" name="Meta" fill="#DDD6FE" radius={[4, 4, 0, 0]} />
            <Bar dataKey="realizado" name="Realizado" fill="#7C3AED" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function CoordRelatorios() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-800 font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>Relatórios Avançados</h2>
        <div className="flex gap-2">
          <select className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-emerald-400">
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700">
            <Download size={14} /> Exportar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
        <h3 className="font-semibold text-gray-800 mb-4">Matrículas por Semestre</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={semesterData}>
            <defs>
              <linearGradient id="gradMat" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="sem" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 11 }} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            <Area type="monotone" dataKey="matriculas" name="Matrículas" stroke="#7C3AED" fill="url(#gradMat)" strokeWidth={2.5} />
            <Area type="monotone" dataKey="formados" name="Formados" stroke="#059669" fill="none" strokeWidth={2} strokeDasharray="4 2" />
            <Area type="monotone" dataKey="cancelamentos" name="Cancelamentos" stroke="#FCA5A5" fill="none" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
          <h3 className="font-semibold text-gray-800 mb-3">Distribuição de Cursos</h3>
          <div className="flex items-center">
            <ResponsiveContainer width="55%" height={160}>
              <PieChart>
                <Pie data={areaData} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={68} paddingAngle={3}>
                  {areaData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: 'none', fontSize: 11 }} formatter={(v: number) => [`${v}%`, '']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {areaData.map(c => (
                <div key={c.name} className="flex items-center gap-2 text-sm">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                  <span className="text-gray-600 flex-1">{c.name}</span>
                  <span className="font-semibold text-gray-800">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
          <h3 className="font-semibold text-gray-800 mb-4">Indicadores de Performance</h3>
          <div className="space-y-4">
            {[
              { label: 'Taxa de Aprovação', value: 87, color: '#059669' },
              { label: 'Engajamento LMS', value: 73, color: '#5B21B6' },
              { label: 'Satisfação NPS', value: 83, color: '#0369A1' },
              { label: 'Retenção Semestral', value: 94, color: '#D97706' },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-semibold" style={{ color: item.color }}>{item.value}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${item.value}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { title: 'Relatório Acadêmico', desc: 'Notas, aprovações e reprovações por disciplina', icon: GraduationCap, color: '#5B21B6' },
          { title: 'Relatório Financeiro', desc: 'Receita, inadimplência e projeções mensais', icon: DollarSign, color: '#059669' },
          { title: 'Relatório de Equipe', desc: 'Desempenho e atendimentos da equipe do polo', icon: Users, color: '#0369A1' },
        ].map(item => {
          const Icon = item.icon;
          return (
            <button key={item.title} className="bg-white rounded-2xl p-4 shadow-sm border border-violet-50 hover:shadow-md transition-shadow text-left">
              <Icon size={20} className="mb-3" style={{ color: item.color }} />
              <div className="font-semibold text-gray-800 text-sm">{item.title}</div>
              <div className="text-xs text-gray-400 mt-1">{item.desc}</div>
              <div className="flex items-center gap-1 text-xs mt-3" style={{ color: item.color }}>
                <Download size={11} /> Baixar PDF
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface CoordinatorAppProps { user: AppUser; onLogout: () => void; }

export default function CoordinatorApp({ user, onLogout }: CoordinatorAppProps) {
  const [currentPage, setCurrentPage] = useState('inicio');

  const renderPage = () => {
    switch (currentPage) {
      case 'inicio': return <CoordHome user={user} />;
      case 'equipe': return <CoordEquipe />;
      case 'alunos': return <CoordAlunos />;
      case 'matriculas': return <CoordMatriculas />;
      case 'financeiro': return <CoordFinanceiro />;
      case 'relatorios': return <CoordRelatorios />;
      default: return <CoordHome user={user} />;
    }
  };

  return (
    <Layout user={user} navItems={navItems} currentPage={currentPage} onPageChange={setCurrentPage} onLogout={onLogout} roleLabel="Coordenador" roleBadgeColor="#065F46">
      {renderPage()}
    </Layout>
  );
}

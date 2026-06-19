import { useState } from 'react';
import Layout, { NavItem } from '../Layout';
import type { AppUser } from '../../App';
import {
  Home, BookOpen, Monitor, Library, DollarSign, FileText, HelpCircle,
  TrendingUp, Clock, CheckCircle, AlertCircle, Play, Download, Search,
  ChevronRight, Star, Calendar, BookMarked, ExternalLink, MessageSquare, Phone
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const navItems: NavItem[] = [
  { id: 'inicio', label: 'Início', icon: Home },
  { id: 'disciplinas', label: 'Disciplinas', icon: BookOpen },
  { id: 'conteudo', label: 'Conteúdo Online', icon: Monitor },
  { id: 'biblioteca', label: 'Biblioteca', icon: Library },
  { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
  { id: 'boletos', label: 'Meus Boletos', icon: FileText, badge: 1 },
  { id: 'suporte', label: 'Suporte', icon: HelpCircle },
];

const disciplines = [
  { id: 1, code: 'ADS301', name: 'Estrutura de Dados', professor: 'Prof. Dr. Marcus Vinicius', progress: 72, grade: 8.4, nextClass: 'Seg, 16 Jun — 19h', color: '#5B21B6', status: 'Em andamento' },
  { id: 2, code: 'ADS302', name: 'Banco de Dados II', professor: 'Profa. Dra. Letícia Moura', progress: 65, grade: 7.9, nextClass: 'Ter, 17 Jun — 19h', color: '#0369A1', status: 'Em andamento' },
  { id: 3, code: 'ADS303', name: 'Engenharia de Software', professor: 'Prof. Me. Rafael Duarte', progress: 80, grade: 9.1, nextClass: 'Qua, 18 Jun — 20h', color: '#065F46', status: 'Em andamento' },
  { id: 4, code: 'ADS304', name: 'Redes de Computadores', professor: 'Prof. Dr. Henrique Prado', progress: 55, grade: 7.2, nextClass: 'Qui, 19 Jun — 19h', color: '#9D174D', status: 'Em andamento' },
  { id: 5, code: 'ADS305', name: 'Programação Web', professor: 'Profa. Me. Camila Rocha', progress: 90, grade: 9.5, nextClass: 'Sex, 20 Jun — 18h', color: '#D97706', status: 'Em andamento' },
  { id: 6, code: 'ADS306', name: 'Inteligência Artificial', professor: 'Prof. Dr. Eduardo Santana', progress: 40, grade: null, nextClass: 'Seg, 16 Jun — 21h', color: '#7C3AED', status: 'Em andamento' },
];

const gradeData = [
  { name: 'ADS301', nota: 8.4 },
  { name: 'ADS302', nota: 7.9 },
  { name: 'ADS303', nota: 9.1 },
  { name: 'ADS304', nota: 7.2 },
  { name: 'ADS305', nota: 9.5 },
];

const mensalidades = [
  { mes: 'Fevereiro/2025', valor: 'R$ 649,00', vencimento: '10/02/2025', status: 'paga' },
  { mes: 'Março/2025', valor: 'R$ 649,00', vencimento: '10/03/2025', status: 'paga' },
  { mes: 'Abril/2025', valor: 'R$ 649,00', vencimento: '10/04/2025', status: 'paga' },
  { mes: 'Maio/2025', valor: 'R$ 649,00', vencimento: '10/05/2025', status: 'paga' },
  { mes: 'Junho/2025', valor: 'R$ 649,00', vencimento: '10/06/2025', status: 'pendente' },
  { mes: 'Julho/2025', valor: 'R$ 649,00', vencimento: '10/07/2025', status: 'futura' },
];

const boletos = [
  { id: 'BOL-2025-06', ref: 'Mensalidade Junho/2025', valor: 'R$ 649,00', vencimento: '10/06/2025', status: 'pendente' },
];

const books = [
  { id: 1, title: 'Algoritmos: Teoria e Prática', author: 'Thomas H. Cormen', type: 'E-book', available: true, cover: '📘' },
  { id: 2, title: 'Engenharia de Software', author: 'Roger S. Pressman', type: 'E-book', available: true, cover: '📗' },
  { id: 3, title: 'Clean Code', author: 'Robert C. Martin', type: 'E-book', available: true, cover: '📕' },
  { id: 4, title: 'Banco de Dados: Projeto e Implementação', author: 'Felipe Neri', type: 'E-book', available: false, cover: '📙' },
  { id: 5, title: 'Redes de Computadores', author: 'Andrew Tanenbaum', type: 'E-book', available: true, cover: '📒' },
  { id: 6, title: 'Inteligência Artificial: Uma Abordagem Moderna', author: 'Russell & Norvig', type: 'E-book', available: true, cover: '📓' },
];

const faqs = [
  { q: 'Como acesso minha nota de uma disciplina?', a: 'Acesse o menu "Disciplinas" e clique na matéria desejada. Suas notas estarão disponíveis na aba "Desempenho".' },
  { q: 'Como emito um boleto de mensalidade?', a: 'Acesse "Meus Boletos" no menu lateral. Você verá todos os boletos disponíveis para download ou pagamento via PIX.' },
  { q: 'Como acesso as aulas gravadas?', a: 'Em "Conteúdo Online" você encontra todos os materiais organizados por disciplina, incluindo vídeos, slides e exercícios.' },
  { q: 'Preciso de declaração de matrícula?', a: 'Entre em contato conosco pelo chat de suporte ou pelo e-mail da secretaria. O prazo de emissão é de 1 a 3 dias úteis.' },
];

function StudentHome({ user }: { user: AppUser }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #5B21B6 100%)' }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-violet-200 text-sm mb-1">{greeting}, 👋</p>
            <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>{user.name.split(' ')[0]}</h1>
            <p className="text-violet-200 text-sm">RA: {user.ra} · {user.course}</p>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-violet-200 text-xs mb-1">Progresso geral</div>
            <div className="text-3xl font-bold">68%</div>
            <div className="text-violet-200 text-xs">do semestre</div>
          </div>
        </div>
        <div className="mt-4 bg-white/10 rounded-full h-2">
          <div className="bg-violet-300 rounded-full h-2 transition-all" style={{ width: '68%' }} />
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Disciplinas', value: '6', sub: 'cursando', icon: BookOpen, color: '#5B21B6', bg: '#EDE9FE' },
          { label: 'Média Geral', value: '8,4', sub: 'excelente', icon: TrendingUp, color: '#059669', bg: '#D1FAE5' },
          { label: 'Próxima Aula', value: '19h00', sub: 'hoje', icon: Clock, color: '#0369A1', bg: '#E0F2FE' },
          { label: 'Situação', value: 'Em dia', sub: 'financeiro', icon: CheckCircle, color: '#D97706', bg: '#FEF3C7' },
        ].map(item => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="bg-white rounded-2xl p-4 shadow-sm border border-violet-50">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: item.bg }}>
                  <Icon size={17} style={{ color: item.color }} />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Nunito, sans-serif' }}>{item.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{item.label} · {item.sub}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximas aulas */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Próximas Aulas</h3>
            <span className="text-xs text-violet-600 font-medium">Esta semana</span>
          </div>
          <div className="space-y-3">
            {disciplines.slice(0, 4).map(d => (
              <div key={d.id} className="flex items-center gap-3">
                <div className="w-2 h-10 rounded-full flex-shrink-0" style={{ background: d.color }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800 truncate">{d.name}</div>
                  <div className="text-xs text-gray-400">{d.professor.split(' ').slice(0, 3).join(' ')}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-gray-700">{d.nextClass.split('—')[1]?.trim()}</div>
                  <div className="text-[10px] text-gray-400">{d.nextClass.split('—')[0]?.trim()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gráfico de notas */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
          <h3 className="font-semibold text-gray-800 mb-4">Desempenho por Disciplina</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={gradeData} barSize={28}>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }}
                formatter={(v: number) => [v.toFixed(1), 'Nota']}
              />
              <Bar dataKey="nota" fill="#7C3AED" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Avisos */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
        <h3 className="font-semibold text-gray-800 mb-4">Avisos Recentes</h3>
        <div className="space-y-3">
          {[
            { title: 'Prova de Banco de Dados II', desc: 'A avaliação P2 ocorrerá em 25/06 às 19h. Conteúdo: Cap. 7 ao 12.', type: 'alert', date: 'Hoje' },
            { title: 'Material de Engenharia de Software disponível', desc: 'O prof. Rafael disponibilizou os slides da aula 14 no portal.', type: 'info', date: 'Ontem' },
            { title: 'Boleto de Junho vencendo', desc: 'Seu boleto de Junho/2025 vence em 10/06. Pague pelo portal.', type: 'warning', date: '2 dias atrás' },
          ].map(item => (
            <div key={item.title} className="flex gap-3 p-3 rounded-xl bg-gray-50">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${item.type === 'alert' ? 'bg-red-400' : item.type === 'warning' ? 'bg-yellow-400' : 'bg-violet-400'}`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-800">{item.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
              </div>
              <span className="text-[10px] text-gray-400 whitespace-nowrap">{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StudentDisciplinas() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-800 font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>Minhas Disciplinas</h2>
          <p className="text-sm text-gray-500">6 disciplinas · 3º Semestre — 2025/1</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {disciplines.map(d => (
          <div key={d.id} className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xs font-mono text-gray-400 mb-1">{d.code}</div>
                <h3 className="font-bold text-gray-800 leading-tight">{d.name}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{d.professor}</p>
              </div>
              <span
                className="text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ml-2"
                style={{ background: d.color + '20', color: d.color }}
              >
                {d.status}
              </span>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                <span>Progresso do semestre</span>
                <span className="font-semibold">{d.progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${d.progress}%`, background: d.color }} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="text-gray-400 text-xs">Nota</span>
                  <div className="font-bold" style={{ color: d.color }}>{d.grade ?? '—'}</div>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">Próxima aula</span>
                  <div className="text-gray-700 font-medium text-xs">{d.nextClass}</div>
                </div>
              </div>
              <button
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors hover:opacity-80"
                style={{ background: d.color + '15', color: d.color }}
              >
                Ver conteúdo <ChevronRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentConteudo() {
  const [activeDisc, setActiveDisc] = useState(disciplines[0].id);
  const disc = disciplines.find(d => d.id === activeDisc)!;

  return (
    <div className="space-y-6">
      <h2 className="text-gray-800 font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>Conteúdo Online</h2>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {disciplines.map(d => (
          <button
            key={d.id}
            onClick={() => setActiveDisc(d.id)}
            className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: activeDisc === d.id ? d.color : '#EDE9FE',
              color: activeDisc === d.id ? '#fff' : '#6B7280',
            }}
          >
            {d.code}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
        <h3 className="font-bold text-gray-800 mb-1">{disc.name}</h3>
        <p className="text-sm text-gray-500 mb-5">{disc.professor}</p>

        <div className="space-y-3">
          {[
            { title: 'Aula 01 — Introdução e Conceitos Básicos', type: 'video', duration: '1h 12min', done: true },
            { title: 'Aula 02 — Estruturas Lineares', type: 'video', duration: '58min', done: true },
            { title: 'Slides Aula 02 — Material Complementar', type: 'pdf', duration: '18 slides', done: true },
            { title: 'Aula 03 — Árvores Binárias', type: 'video', duration: '1h 05min', done: true },
            { title: 'Exercícios — Lista 01', type: 'exercicio', duration: '10 questões', done: false },
            { title: 'Aula 04 — Grafos e Algoritmos de Busca', type: 'video', duration: '1h 25min', done: false },
            { title: 'Slides Aula 04', type: 'pdf', duration: '24 slides', done: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-green-100' : 'bg-violet-50'}`}>
                {item.type === 'video' ? (
                  <Play size={15} className={item.done ? 'text-green-600' : 'text-violet-600'} />
                ) : item.type === 'pdf' ? (
                  <FileText size={15} className={item.done ? 'text-green-600' : 'text-violet-600'} />
                ) : (
                  <BookMarked size={15} className={item.done ? 'text-green-600' : 'text-violet-600'} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium ${item.done ? 'text-gray-500 line-through' : 'text-gray-800'}`}>{item.title}</div>
                <div className="text-xs text-gray-400">{item.duration}</div>
              </div>
              {item.done
                ? <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                : <button className="flex items-center gap-1 text-xs text-violet-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Acessar <ExternalLink size={11} />
                  </button>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StudentBiblioteca() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Todos');
  const filters = ['Todos', 'E-books', 'Artigos', 'Periódicos'];
  const filtered = books.filter(b => b.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-6">
      <h2 className="text-gray-800 font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>Biblioteca Digital</h2>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar livros, artigos, periódicos..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          />
        </div>
        <div className="flex gap-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-2 rounded-xl text-sm font-medium transition-colors"
              style={{ background: filter === f ? '#5B21B6' : '#EDE9FE', color: filter === f ? '#fff' : '#6B7280' }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(book => (
          <div key={book.id} className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-3">{book.cover}</div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-gray-800 text-sm leading-snug">{book.title}</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 flex-shrink-0">{book.type}</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">{book.author}</p>
            <button
              className={`w-full py-2 rounded-xl text-xs font-semibold transition-colors ${book.available ? 'bg-violet-600 text-white hover:bg-violet-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              disabled={!book.available}
            >
              {book.available ? 'Acessar' : 'Indisponível'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentFinanceiro() {
  return (
    <div className="space-y-6">
      <h2 className="text-gray-800 font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>Meu Financeiro</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
          <div className="text-xs text-gray-400 mb-1">Situação</div>
          <div className="text-lg font-bold text-green-600 flex items-center gap-2"><CheckCircle size={18} /> Em dia</div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
          <div className="text-xs text-gray-400 mb-1">Próximo Vencimento</div>
          <div className="text-lg font-bold text-gray-800">10/06/2025</div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
          <div className="text-xs text-gray-400 mb-1">Valor Mensalidade</div>
          <div className="text-lg font-bold text-gray-800">R$ 649,00</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-violet-50 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Histórico de Mensalidades — 2025</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['Referência', 'Valor', 'Vencimento', 'Situação', 'Ação'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mensalidades.map(m => (
                <tr key={m.mes} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-700">{m.mes}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-700">{m.valor}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">{m.vencimento}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      m.status === 'paga' ? 'bg-green-100 text-green-700' :
                      m.status === 'pendente' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {m.status === 'paga' ? 'Paga' : m.status === 'pendente' ? 'Pendente' : 'A vencer'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    {m.status === 'paga'
                      ? <button className="text-xs text-violet-600 hover:underline flex items-center gap-1"><Download size={12} /> Comprovante</button>
                      : m.status === 'pendente'
                      ? <button className="text-xs bg-violet-600 text-white px-3 py-1.5 rounded-lg hover:bg-violet-700 flex items-center gap-1"><FileText size={12} /> Ver Boleto</button>
                      : <span className="text-xs text-gray-400">—</span>
                    }
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

function StudentBoletos() {
  return (
    <div className="space-y-6">
      <h2 className="text-gray-800 font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>Meus Boletos</h2>

      {boletos.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex gap-3">
          <AlertCircle size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-yellow-800">Boleto pendente</div>
            <div className="text-xs text-yellow-600">Você tem 1 boleto com vencimento próximo. Evite juros e pague até a data.</div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {boletos.map(b => (
          <div key={b.id} className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-gray-400 mb-1">{b.id}</div>
                <h3 className="font-bold text-gray-800">{b.ref}</h3>
                <div className="text-2xl font-bold text-gray-900 mt-2" style={{ fontFamily: 'Nunito, sans-serif' }}>{b.valor}</div>
                <div className="text-sm text-gray-500 mt-1">Vencimento: {b.vencimento}</div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">Pendente</span>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors">
                <Download size={15} /> Baixar Boleto (PDF)
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors">
                Pagar via PIX
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentSuporte() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [msg, setMsg] = useState('');

  return (
    <div className="space-y-6">
      <h2 className="text-gray-800 font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>Suporte & Ajuda</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: MessageSquare, label: 'Chat Online', desc: 'Atendimento em tempo real', color: '#5B21B6', bg: '#EDE9FE', available: true },
          { icon: Phone, label: 'Telefone', desc: '(11) 3000-9000 · Seg–Sex 8h–20h', color: '#0369A1', bg: '#E0F2FE', available: true },
          { icon: FileText, label: 'Abrir Chamado', desc: 'Resposta em até 48h', color: '#065F46', bg: '#D1FAE5', available: true },
        ].map(item => {
          const Icon = item.icon;
          return (
            <button key={item.label} className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50 hover:shadow-md transition-shadow text-left">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: item.bg }}>
                <Icon size={19} style={{ color: item.color }} />
              </div>
              <div className="font-semibold text-gray-800">{item.label}</div>
              <div className="text-xs text-gray-400 mt-1">{item.desc}</div>
            </button>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
        <h3 className="font-semibold text-gray-800 mb-4">Perguntas Frequentes</h3>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700">{faq.q}</span>
                <ChevronRight size={15} className={`text-gray-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-90' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 text-sm text-gray-500 leading-relaxed">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact form */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-violet-50">
        <h3 className="font-semibold text-gray-800 mb-4">Enviar Mensagem</h3>
        <div className="space-y-3">
          <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:border-violet-400">
            <option>Selecione o assunto</option>
            <option>Dúvida Acadêmica</option>
            <option>Questão Financeira</option>
            <option>Declaração / Documento</option>
            <option>Problema no Sistema</option>
            <option>Outro</option>
          </select>
          <textarea
            value={msg}
            onChange={e => setMsg(e.target.value)}
            placeholder="Descreva sua dúvida ou problema..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:border-violet-400 resize-none"
          />
          <button className="px-6 py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700 transition-colors">
            Enviar Mensagem
          </button>
        </div>
      </div>
    </div>
  );
}

interface StudentAppProps {
  user: AppUser;
  onLogout: () => void;
}

export default function StudentApp({ user, onLogout }: StudentAppProps) {
  const [currentPage, setCurrentPage] = useState('inicio');

  const renderPage = () => {
    switch (currentPage) {
      case 'inicio': return <StudentHome user={user} />;
      case 'disciplinas': return <StudentDisciplinas />;
      case 'conteudo': return <StudentConteudo />;
      case 'biblioteca': return <StudentBiblioteca />;
      case 'financeiro': return <StudentFinanceiro />;
      case 'boletos': return <StudentBoletos />;
      case 'suporte': return <StudentSuporte />;
      default: return <StudentHome user={user} />;
    }
  };

  return (
    <Layout
      user={user}
      navItems={navItems}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      onLogout={onLogout}
      roleLabel="Aluno"
      roleBadgeColor="#7C3AED"
    >
      {renderPage()}
    </Layout>
  );
}

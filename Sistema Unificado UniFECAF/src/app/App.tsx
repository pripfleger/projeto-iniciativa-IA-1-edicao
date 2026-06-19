import { useState } from 'react';
import Login from './components/Login';
import StudentApp from './components/student/StudentApp';
import StaffApp from './components/staff/StaffApp';
import CoordinatorApp from './components/coordinator/CoordinatorApp';
import AdminApp from './components/admin/AdminApp';

export type UserRole = 'aluno' | 'colaborador' | 'coordenador' | 'admin';

export interface AppUser {
  name: string;
  email: string;
  role: UserRole;
  polo: string;
  ra?: string;
  course?: string;
  avatar?: string;
}

export default function App() {
  const [user, setUser] = useState<AppUser | null>(null);

  if (!user) return <Login onLogin={setUser} />;

  const props = { user, onLogout: () => setUser(null) };

  switch (user.role) {
    case 'aluno': return <StudentApp {...props} />;
    case 'colaborador': return <StaffApp {...props} />;
    case 'coordenador': return <CoordinatorApp {...props} />;
    case 'admin': return <AdminApp {...props} />;
  }
}

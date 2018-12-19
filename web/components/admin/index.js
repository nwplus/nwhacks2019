import React from 'react';
import { AdminNavbar } from './Navbar';
import AdminTasks from './Tasks';
import AdminGate from './AdminGate';
import AssessmentPageContainer from '../../containers/admin/AssessmentPage';

const adminPages = [
  {
    label: 'Assessment',
    component: AssessmentPageContainer,
    route: '/admin/assessment',
  },
  {
    label: 'Tasks (Dev only)',
    component: AdminTasks,
    route: '/admin/tasks',
  },
];

const adminRoutes = adminPages.map(({ route }) => route);

const Admin = ({ location: { pathname } }) => {
  const activeIndex = adminRoutes.indexOf(pathname);

  return (
    <AdminGate>
      <AdminNavbar
        pages={adminPages}
        activeIndex={activeIndex}
        />
    </AdminGate>
  );
}

export {
  Admin,
  adminPages,
  adminRoutes,
};

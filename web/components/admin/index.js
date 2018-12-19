import React from 'react';
import { AdminNavbar } from './Navbar';
import AdminTasks from './Tasks';
import AdminGate from './AdminGate';
import AssessmentPageContainer from '../../containers/admin/AssessmentPage';

const Admin = () => (
  <AdminGate>
    <AdminNavbar
      pages={[
        {
          label: 'Assessment',
          component: AssessmentPageContainer,
        },
        {
          label: 'Tasks (Dev only)',
          component: AdminTasks,
        },
      ]}
      />
  </AdminGate>
);

export {
  Admin,
};

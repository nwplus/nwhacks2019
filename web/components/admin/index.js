import React from 'react';
import PropTypes from 'prop-types';

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
};

Admin.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

export {
  Admin,
  adminPages,
  adminRoutes,
};

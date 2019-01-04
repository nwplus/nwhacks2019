import React from 'react';
import PropTypes from 'prop-types';

import { AdminNavbar } from './Navbar';
import AdminTasks from './Tasks';
import AdminGate from './AdminGate';
import GenericApplicantContainer from '../../containers/admin/GenericApplicantContainer';

const adminPages = [
  {
    label: 'Assessment',
    component: () => <GenericApplicantContainer pageType="assessment" />,
    route: '/admin/assessment',
  },
  {
    label: 'Applicants',
    component: () => <GenericApplicantContainer pageType="applicants" />,
    route: '/admin/applicants',
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

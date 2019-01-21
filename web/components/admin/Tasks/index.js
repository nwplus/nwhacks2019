import React from 'react';
import BackfillShortInfo from './BackfillShortInfo';
import BackfillLongInfo from './BackfillLongInfo';
import ImportMentors from './ImportMentors';

const AdminTasks = () => (
  <div
    className="pad-ends-xxl margin-sides-xxl"
    >
    <BackfillShortInfo />
    <BackfillLongInfo />
    <ImportMentors />
  </div>
);

export default AdminTasks;

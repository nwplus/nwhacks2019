import React from 'react';
import { PrimaryButton } from '../../input/buttons';

const AdminTasks = () => {
  return (
    <div
      className="pad-ends-xxl margin-sides-xxl"
      >
      <PrimaryButton
        text="Backfill short info"
        onClick={() => console.log("click")}
        />
    </div>
  );
};

export default AdminTasks;

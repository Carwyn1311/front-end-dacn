import React from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { BsFillFileEarmarkArrowUpFill } from 'react-icons/bs';
import '../.css/Titlebar.css';

const Titlebar: React.FC = () => {
  return (
    <div className="title-bar">
      <div className="title">
        <a className="logo-app"href="#">
          <img alt="logo" height="32" src="../images/Timesheet.png" width="32" />
        </a>
        <span className="title-text">Timesheet</span>
      </div>
      <div className="title-icon-right">
        <BsFillFileEarmarkArrowUpFill style={{ fontSize: '25px' }} />
        <FaFileAlt style={{ fontSize: '25px' }} />
      </div>
    </div>
  );
};

export default Titlebar;

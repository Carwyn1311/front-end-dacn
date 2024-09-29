import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClockCircle } from 'react-icons/ai';
import { FaUserCircle, FaCogs, FaUsers, FaTasks, FaBuilding, FaIdBadge, FaToolbox, FaAddressBook, FaChartBar, FaRegChartBar, FaRegCalendarTimes, FaUserClock } from 'react-icons/fa';
import { BsFillTagFill } from 'react-icons/bs';
import { RiCalendarTodoFill, RiCalendar2Fill, RiCalendarEventFill } from 'react-icons/ri';
import { MdSupervisedUserCircle, MdChecklistRtl, MdSettingsAccessibility } from 'react-icons/md';
import { HiUserGroup } from 'react-icons/hi';
import { BiBarChartSquare, BiMessageAltEdit } from 'react-icons/bi';
import { CgFileDocument } from 'react-icons/cg';
import '../.css/Sidebar.css';

interface SidebarMenuProps {
  isAdminOpen: boolean
  toggleAdminMenu: () => void
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isAdminOpen, toggleAdminMenu }) => {
  return (
    <nav className="sidebar-function" style={{ padding: '10px' }}>
      <ul className="sidebar-menu">
        <li><NavLink to="/profile"><FaUserCircle /> My profile</NavLink></li>
        <li onClick={toggleAdminMenu} className="admin-toggle">
          <FaCogs className="icon-admin"/> <h2 className="text-admin"> Admin </h2>
          {isAdminOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </li>
        {isAdminOpen && (
          <ul className="admin-menu">
            <li><NavLink to="/users" ><FaUsers /> Users</NavLink></li>
            <li><NavLink to="/roles"><BsFillTagFill /> Roles</NavLink></li>
            <li><NavLink to="/configuration"><FaToolbox /> Configuration</NavLink></li>
            <li><NavLink to="/clients"><FaAddressBook /> Clients</NavLink></li>
            <li><NavLink to="/tasks"><FaTasks /> Tasks</NavLink></li>
            <li><NavLink to="/leave-types"><FaChartBar /> Leave types</NavLink></li>
            <li><NavLink to="/branches"><FaBuilding /> Branches</NavLink></li>
            <li><NavLink to="/position"><FaIdBadge /> Position</NavLink></li>
            <li><NavLink to="/capability"><FaRegChartBar /> Capability</NavLink></li>
            <li><NavLink to="/capability-settings"><MdSettingsAccessibility /> Capability Setting</NavLink></li>
            <li><NavLink to="/calendar-settings"><RiCalendar2Fill /> Calendar Settings</NavLink></li>
            <li><NavLink to="/clock"><AiOutlineClockCircle /> Clock</NavLink></li>
          </ul>
        )}
        <li><NavLink to="/projects" className="text-sidebar" ><BiBarChartSquare className="icon-sidebar"/> Projects</NavLink></li>
        <li><NavLink to="/timesheets" className="text-sidebar"><FaUserClock className="icon-sidebar"/> My timesheets</NavLink></li>
        <li><NavLink to="/requests" className="text-sidebar"><FaRegCalendarTimes className="icon-sidebar"/> My request off/remote/onsite</NavLink></li>
        <li><NavLink to="/working-time" className="text-sidebar"><RiCalendarEventFill className="icon-sidebar"/> My Working time</NavLink></li>
        <li><NavLink to="/manage-timesheet" className="text-sidebar"><RiCalendar2Fill className="icon-sidebar"/> Manage timesheet</NavLink></li>
        <li><NavLink to="/manage-requests"className="text-sidebar"><MdChecklistRtl className="icon-sidebar"/> Manage request off/remote/onsite</NavLink></li>
        <li><NavLink to="/manage-working-times"className="text-sidebar"><AiOutlineClockCircle className="icon-sidebar"/> Manage working times</NavLink></li>
        <li><NavLink to="/manage-working"className="text-sidebar"><HiUserGroup className="icon-sidebar"/> Manage working times</NavLink></li>
        <li><NavLink to="/manage-supervised"className="text-sidebar"><MdSupervisedUserCircle className="icon-sidebar"/> Manage working times</NavLink></li>
        <li><NavLink to="/manage-todo"className="text-sidebar"><RiCalendarTodoFill className="icon-sidebar"/> Manage working times</NavLink></li>
        <li><NavLink to="/manage-messages"className="text-sidebar"><BiMessageAltEdit className="icon-sidebar"/> Manage messages</NavLink></li>
        <li><NavLink to="/manage-documents"className="text-sidebar"><CgFileDocument className="icon-sidebar"/> Manage documents</NavLink></li>
      </ul>
    </nav>
  );
};

export default SidebarMenu;

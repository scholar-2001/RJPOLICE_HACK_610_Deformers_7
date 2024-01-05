import React from 'react'
import './sidebar.css';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AssignmentLateRoundedIcon from '@mui/icons-material/AssignmentLateRounded';
import SsidChartRoundedIcon from '@mui/icons-material/SsidChartRounded';
import { NavLink } from 'react-router-dom';

const routes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: <HomeRoundedIcon />,
    },
    {
        path: "/consumer_data",
        name: "Consumer Data",
        icon: <SearchRoundedIcon />,
    },
    {
        path: "/fraud_alert",
        name: "Fraud Alerts",
        icon: <AssignmentLateRoundedIcon />,
    },
    {
        path: "/real_time_logs",
        name: "Real-Time Logs",
        icon: <SsidChartRoundedIcon />,
    },
]
const Sidebar = ({ children }) => {
  return (
  <div className="maincontainer">
      <div className='sidebar'>
        <h3>CRM Portal</h3>
        <section className="routes">
            {routes.map((route) =>
            (
              <NavLink to={route.path} key={route.name} className='link' exact>
                <div className="icon">{route.icon}</div>
                <div className="link_name">{route.name}</div>
              </NavLink>
            ))
            }
        </section>
    </div>
    <main>{children}</main>
  </div>
  )
}

export default Sidebar
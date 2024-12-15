import React from 'react';
import '../resources/layout.css';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

function DefaultLayout({children}) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);
  const {user} = useSelector(state => state.users);
  const userMenu = [
    {name: 'Home', path: '/User/UserHome', icon: 'ri-home-line'},
    {name: 'Bookings', path: '/User/UserBookings',icon:'ri-stack-fill'},
    {name: 'Payments', path: '/User/UserPayments',icon:'ri-bank-card-2-fill'},
    {name: 'Profile', path: '/User/UserProfile',icon:'ri-user-3-fill'},
    {name: 'Logout', path: '/logout',icon:'ri-logout-box-r-line'},
  ]
  const adminMenu = [
    {
      name: "Home",
      path: "/Admin/AdminHome",
      icon: "ri-home-line",
    },
    {
      name: "Manage Slots",
      path: "/Admin/ManageSlot",
      icon: "ri-layout-grid-2-fill",
    },
    {
      name: "Prices",
      path: "/Admin/Prices",
      icon: "ri-currency-line",
    },
    {
      name: "Users",
      path: "/Admin/Users",
      icon: "ri-user-line",
    },
    {
      name: "Bookings",
      path: "/Admin/Bookings",
      icon: "ri-book-line",
    },
    {
      name: "Transactions",
      path: "/Admin/Transactions",
      icon: "ri-paypal-line",
    },
    {
      name: "Reports",
      path: "/Admin/Reports",
      icon: "ri-folder-open-fill",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ]
  const menuToBeRendered = user?.isAdmin === true ? adminMenu : userMenu;
    const activeRoute = window.location.pathname;
    return (
      <div className='layout-parent'>
        <div className='sidebar'>
          <div className="sidebar-header">
            {/* <hi>Heading</hi> */}
          </div>
          <div className='d-flex flex-column gap-3'>
          {menuToBeRendered.map((item, index) => {
              return(
              <div className={`${activeRoute === item.path && 'active-menu-item'} menu-item `}>
              <i className={item.icon}></i>
                {!collapsed && (
                  <span onClick={()=>{
                    if(item.path === "/logout"){
                      localStorage.removeItem("token");
                      navigate("/login")
                    }else{
                      navigate(item.path)
                    }
                    
                    }}>{item.name}
                  </span>
                
                )}
            </div>
            );})}
        </div>
      </div>
      <div className="body">
        <div className="header">
          {collapsed ? (<i class="ri-menu-2-fill"
            onClick={()=> setCollapsed(!collapsed)}
          
          ></i>):(<i class="ri-close-line"
            onClick={()=> setCollapsed(!collapsed)}
          ></i>)}
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
    );
}

export default DefaultLayout
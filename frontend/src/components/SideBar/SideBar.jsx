import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { File, LayoutDashboard, ShoppingCart, Package, Users, Boxes, Truck, BadgeDollarSignIcon, FileText, User, Menu } from 'lucide-react';
import './SideBar.css';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsCollapsed(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };


    const menuItems = [
        {
            title: 'Sales',
            icon: <ShoppingCart size={20} />,
            path: '/sales',
            submenus: [
                { title: 'New Sale', path: '/sales/new' },
                { title: 'Sales History', path: '/sales/history' },
            ]
        },
        {
            title: 'Customer',
            icon: <Users size={20} />,
            path: '/customer',
            submenus: [
                { title: 'Customer List', path: '/customer/customer-list' },
                { title: 'Job Due Payment', path: '/customer/jobDue-payment' },
                { title: 'Sale Due Payment', path: '/customer/sale-due-payment' },
            ]
        },
        {
            title: 'Product',
            icon: <Package size={20} />,
            path: '/product',
            submenus: [
                { title: 'Create Product', path: '/product/create' },
                { title: 'Product Category', path: '/product/category' },
                { title: 'Create Product Lable', path: '/product/product-lable' },
                { title: 'Product List', path: '/product/product-list' }
            ]
        },
        {
            title: 'GRN',
            icon: <File size={20} />,
            path: '/grn',
            submenus: [
                { title: 'Create GRN', path: '/grn/create-grn' },
                { title: 'GRN List', path: '/grn/list-grn' },
                { title: 'GRN Search', path: '/grn/search-grn' }
            ]
        },
        {
            title: 'Stock',
            icon: <Boxes size={20} />,
            path: '/stock',
            submenus: [
                { title: 'Daily Summary', path: '/stock/daily-sum' },
                { title: 'Financial stock', path: '/stock/financial' },
                { title: 'Product Performance', path: '/stock/product' }
            ]
        },
        {
            title: 'Supplier',
            icon: <Truck size={20} />,
            path: '/Supplier',
            submenus: [
                { title: 'User Management', path: '/Supplier/users' },
                { title: 'Store Information', path: '/Supplier/store' },
                { title: 'System Preferences', path: '/Supplier/system' }
            ]
        },
        {
            title: 'Finance',
            icon: <BadgeDollarSignIcon size={20} />,
            path: '/finance',
            submenus: [
                { title: 'Daily Summary', path: '/finance/daily' },
                { title: 'Financial finance', path: '/finance/financial' },
                { title: 'Product Performance', path: '/finance/product' }
            ]
        }, {
            title: 'Sales Reports',
            icon: <FileText size={20} />,
            path: '/sales-reports',
            submenus: [
                { title: 'Daily Summary', path: '/sales-reports/daily' },
                { title: 'Financial sales-reports', path: '/sales-reports/financial' },
                { title: 'Product Performance', path: '/sales-reports/product' }
            ]
        }, {
            title: 'Stock Reports',
            icon: <FileText size={20} />,
            path: '/stock-reports',
            submenus: [
                { title: 'Daily Summary', path: '/stock-reports/daily' },
                { title: 'Financial stock-reports', path: '/stock-reports/financial' },
                { title: 'Product Performance', path: '/stock-reports/product' }
            ]
        },
    ];

    return (
      <>
                <button 
                    className="toggle-btn d-md-none" 
                    onClick={toggleSidebar}
                    style={{
                        position: 'fixed',
                        top: '10px',
                        left: '10px',
                        zIndex: 1030,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <Menu size={24} />
                </button>
                <nav className={`col-md-3 col-lg-2 d-md-block bg-color sidebar ${isCollapsed ? 'collapsed' : ''}`}
                     style={{
                         transform: isCollapsed ? 'translateX(-100%)' : 'translateX(0)',
                         transition: 'transform 0.3s ease-in-out'
                     }}
                >
                    <div className="text-center mt-5 p-3">
                        <h1>Logo</h1>
                    </div>
                    <div className="position-sticky pt-3">
                        <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to={'/'} className="nav-link d-flex align-items-center ">
                            <span className="me-2"><LayoutDashboard size={20} /></span>
                            <span className="fs-8 p-2 menu-link d-md-inline">Dashboard</span>
                        </Link>
                    </li>
                    {menuItems.map((item, index) => (
                        <li key={index} className="nav-item">
                            <Link to={item.path} className="nav-link d-flex align-items-center" data-bs-toggle={item.submenus && item.submenus.length > 0 ? "collapse" : ""} data-bs-target={`#submenu-${index}`}>
                                <span className="me-2">{item.icon}</span>
                                <span className="fs-8 p-2 menu-link d-md-inline">{item.title}</span>
                            </Link>
                            {item.submenus && item.submenus.length > 0 && (
                                <div className="collapse" id={`submenu-${index}`}>
                                    <ul className="nav flex-column ms-3">
                                        {item.submenus.map((submenu, subIndex) => (
                                            <li key={subIndex} className="nav-item">
                                                <Link to={submenu.path} className="nav-link">{submenu.title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                    <li className="nav-item">
                        <Link to={'/staff'} className="nav-link d-flex align-items-center ">
                            <span className="me-2"><User size={20} /></span>
                            <span className="fs-8 p-2 menu-link d-md-inline">Staff</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
        </>
    );
};

export default Sidebar;

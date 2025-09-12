import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = () => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: '🏠' },
    { name: 'My Medicines', href: '/medicines', icon: '💊' },
    { name: 'Add Medicine', href: '/add-medicine', icon: '➕' },
    { name: 'Reminders', href: '/reminders', icon: '⏰' },
    { name: 'Profile', href: '/profile', icon: '👤' },
  ];

  return (
    <nav className="bg-white shadow-sm border-r border-gray-200 w-64 min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">
          💊 MediCare
        </h1>
        <div className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link flex items-center space-x-3 ${
                  isActive ? 'active' : ''
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
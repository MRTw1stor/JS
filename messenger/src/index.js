import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css'
import HomePanel from './components/Home/HomePanel';
import ChatPanel from './components/Chat/ChatPanel'
import ContactsPanel from './components/Contacts/ContactsPanel'
import NotificationPanel from './components/Notification/NotificationPanel'
import CalendarPanel from './components/Calendar/CalendarPanel'
import SettingsPanel from './components/Settings/SettingsPanel'
import NavbarPanel from './components/Navbar/NavbarPanel';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavbarPanel />
      <Routes>
        <Route path="/home" element={<HomePanel />} />
        <Route path="/chat" element={<ChatPanel />} />
        <Route path="/contacts" element={<ContactsPanel />} />
        <Route path="/notification" element={<NotificationPanel />} />
        <Route path="/calendar" element={<CalendarPanel />} />
        <Route path="/settings" element={<SettingsPanel />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
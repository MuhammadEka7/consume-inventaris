import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Stuff from "./pages/Stuff/Index";
import StuffCreate from "./pages/Stuff/Create";
import StuffEdit from "./pages/Stuff/Edit";
import Dashboard from "./pages/Dashboard";
import Inbound from "./pages/Inbound/Index";
import InboundCreate from "./pages/Inbound/Create";
import StuffTrash from "./pages/Stuff/Trash";
import User from "./pages/User/Index";
import UserCreate from "./pages/User/Create";
import UserEdit from "./pages/User/Edit";
import TrashUser from "./pages/User/Trash";
import TrashInbound from "./pages/Inbound/Trash";
import Lending from "./pages/Lending/Index";
import LendingCreate from "./pages/Lending/Create";

export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile /> },
    { path: '/stuff', element: <Stuff /> },
    { path: '/stuff/create', element: <StuffCreate /> },
    { path: '/stuff/edit/:id', element: <StuffEdit /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/inbound', element: <Inbound /> },
    { path: '/inbound/create', element: <InboundCreate /> },
    { path: '/stuff/trash', element: <StuffTrash /> },
    { path: '/user', element: <User /> },
    { path: '/user/create', element: <UserCreate /> },
    { path: '/user/trash', element: <TrashUser /> },
    { path: '/inbound/trash', element: <TrashInbound /> },
    { path: '/lendings', element: <Lending /> },
    { path: '/lendings/store', element: <LendingCreate /> },
    { path: '/user/edit/:id', element: <UserEdit /> }
])
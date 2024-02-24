"use strict";
exports.__esModule = true;
exports.SidebarMenuMain = void 0;
var react_1 = require("react");
var react_intl_1 = require("react-intl");
var SidebarMenuItem_1 = require("./SidebarMenuItem");
var SidebarMenuMain = function () {
    var intl = react_intl_1.useIntl();
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(SidebarMenuItem_1.SidebarMenuItem, { to: '/dashboard', icon: 'element-11', title: intl.formatMessage({ id: 'MENU.DASHBOARD' }), fontIcon: 'bi-app-indicator' }),
        react_1["default"].createElement(SidebarMenuItem_1.SidebarMenuItem, { to: '/organization-setup', icon: 'element-11', title: 'Organization setup', fontIcon: 'bi-app-indicator' }),
        react_1["default"].createElement(SidebarMenuItem_1.SidebarMenuItem, { to: '/account/overview', icon: 'element-11', title: 'Overview', fontIcon: 'bi-app-indicator' }),
        react_1["default"].createElement(SidebarMenuItem_1.SidebarMenuItem, { to: '/hr-dashboard', icon: 'element-11', title: 'HR Dashboard', fontIcon: 'bi-app-indicator' }),
        react_1["default"].createElement(SidebarMenuItem_1.SidebarMenuItem, { to: 'employee-dashboard', icon: 'element-11', title: 'Emp Dashboard', fontIcon: 'bi-app-indicator' }),
        react_1["default"].createElement(SidebarMenuItem_1.SidebarMenuItem, { to: '/user-management', icon: 'element-11', title: 'Employee Management', fontIcon: 'bi-app-indicator' }),
        react_1["default"].createElement(SidebarMenuItem_1.SidebarMenuItem, { to: '/roles-management', icon: 'element-11', title: 'Role Management', fontIcon: 'bi-app-indicator' }),
        react_1["default"].createElement(SidebarMenuItem_1.SidebarMenuItem, { to: '/view-roles', icon: 'element-11', title: 'View Role', fontIcon: 'bi-app-indicator' }),
        react_1["default"].createElement(SidebarMenuItem_1.SidebarMenuItem, { to: '/permissions', icon: 'element-11', title: 'Module Permissions', fontIcon: 'bi-app-indicator' }),
        react_1["default"].createElement(SidebarMenuItem_1.SidebarMenuItem, { to: '/timesheet', icon: 'element-11', title: 'Timesheet', fontIcon: 'bi-app-indicator' }),
        react_1["default"].createElement(SidebarMenuItem_1.SidebarMenuItem, { to: '/resignation', icon: 'element-11', title: 'Resignation', fontIcon: 'bi-app-indicator' }),
        react_1["default"].createElement(SidebarMenuItem_1.SidebarMenuItem, { to: '/view-resignation', icon: 'element-11', title: 'View Resignation', fontIcon: 'bi-app-indicator' }),
        react_1["default"].createElement(SidebarMenuItem_1.SidebarMenuItem, { to: '/support-ticket', icon: 'element-11', title: 'Support Ticket', fontIcon: 'bi-app-indicator' })));
};
exports.SidebarMenuMain = SidebarMenuMain;

"use strict";
exports.__esModule = true;
exports.PrivateRoutes = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var MasterLayout_1 = require("../../_metronic/layout/MasterLayout");
var react_topbar_progress_indicator_1 = require("react-topbar-progress-indicator");
var DashboardWrapper_1 = require("../pages/dashboard/DashboardWrapper");
var MenuTestPage_1 = require("../pages/MenuTestPage");
var _utils_1 = require("../../_metronic/assets/ts/_utils");
var Vertical_1 = require("../pages/organization/components/Vertical");
var Overview_1 = require("../pages/accounts/components/Overview");
var Settings_1 = require("../pages/accounts/components/settings/Settings");
var Businessform_1 = require("../pages/accounts/components/settings/cards/editform/Businessform");
var Organizationform_1 = require("../pages/accounts/components/settings/cards/editform/Organizationform");
var AccountHeader_1 = require("../pages/accounts/AccountHeader");
var Resignation_1 = require("../pages/accounts/Resignation");
var ViewResignation_1 = require("../pages/accounts/ViewResignation");
var UsersList_1 = require("../modules/apps/user-management/users-list/UsersList");
var RolesManagement_1 = require("../modules/roles_management/RolesManagement");
var ViewRole_1 = require("../modules/roles_management/view_role/ViewRole");
var PermissionList_1 = require("../modules/roles_management/permissions/PermissionList");
var Timesheet_1 = require("../modules/timesheet_management/Timesheet");
var HRDashboard_1 = require("../modules/dashboard/hr_dashboard/HRDashboard");
var EmployeeDashboard_1 = require("../modules/dashboard/employee_dashboard/EmployeeDashboard");
var SupportTicket_1 = require("../modules/support_ticket/SupportTicket");
//import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
var PrivateRoutes = function () {
    var ProfilePage = react_1.lazy(function () { return Promise.resolve().then(function () { return require('../modules/profile/ProfilePage'); }); });
    // const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
    var AccountPage = react_1.lazy(function () { return Promise.resolve().then(function () { return require('../pages/accounts/AccountPage'); }); });
    //const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
    // const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
    var UsersPage = react_1.lazy(function () { return Promise.resolve().then(function () { return require('../modules/apps/user-management/UsersPage'); }); });
    return (React.createElement(react_router_dom_1.Routes, null,
        React.createElement(react_router_dom_1.Route, { element: React.createElement(MasterLayout_1.MasterLayout, null) },
            React.createElement(react_router_dom_1.Route, { path: 'auth/*', element: React.createElement(react_router_dom_1.Navigate, { to: '/dashboard' }) }),
            React.createElement(react_router_dom_1.Route, { path: 'dashboard', element: React.createElement(DashboardWrapper_1.DashboardWrapper, null) }),
            React.createElement(react_router_dom_1.Route, { path: 'menu-test', element: React.createElement(MenuTestPage_1.MenuTestPage, null) }),
            React.createElement(react_router_dom_1.Route, { path: '/organization-setup', element: React.createElement(Vertical_1.Vertical, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/account", element: React.createElement(AccountPage, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/account/settings", element: React.createElement(React.Fragment, null,
                    React.createElement(AccountHeader_1.AccountHeader, null),
                    " ",
                    React.createElement(Settings_1.Settings, null)) }),
            React.createElement(react_router_dom_1.Route, { path: "/account/overview", element: React.createElement(React.Fragment, null,
                    React.createElement(AccountHeader_1.AccountHeader, null),
                    React.createElement(Overview_1.Overview, null)) }),
            React.createElement(react_router_dom_1.Route, { path: "/account/business", element: React.createElement(React.Fragment, null,
                    React.createElement(Businessform_1.Businessform, null)) }),
            React.createElement(react_router_dom_1.Route, { path: "/account/organization", element: React.createElement(React.Fragment, null,
                    React.createElement(Organizationform_1.Organizationform, null)) }),
            React.createElement(react_router_dom_1.Route, { path: '/user-management', element: React.createElement(UsersList_1.UsersListWrapper, null) }),
            React.createElement(react_router_dom_1.Route, { path: 'roles-management', element: React.createElement(RolesManagement_1.RolesManagement, null) }),
            React.createElement(react_router_dom_1.Route, { path: 'view-roles', element: React.createElement(ViewRole_1.ViewRole, null) }),
            React.createElement(react_router_dom_1.Route, { path: 'permissions', element: React.createElement(PermissionList_1.PermissionList, null) }),
            React.createElement(react_router_dom_1.Route, { path: 'timesheet', element: React.createElement(Timesheet_1.Timesheet, null) }),
            React.createElement(react_router_dom_1.Route, { path: 'hr-dashboard', element: React.createElement(HRDashboard_1.HRDashboard, null) }),
            React.createElement(react_router_dom_1.Route, { path: '/resignation', element: React.createElement(Resignation_1.Resignation, null) }),
            React.createElement(react_router_dom_1.Route, { path: '/view-resignation', element: React.createElement(ViewResignation_1.ViewResignation, null) }),
            React.createElement(react_router_dom_1.Route, { path: 'employee-dashboard', element: React.createElement(EmployeeDashboard_1.EmployeeDashboard, null) }),
            React.createElement(react_router_dom_1.Route, { path: 'support-ticket', element: React.createElement(SupportTicket_1.SupportTicket, null) }),
            React.createElement(react_router_dom_1.Route, { path: "view-profile/*", element: ViewProfile })),
        React.createElement(react_router_dom_1.Route, { path: "/business", element: React.createElement(Businessform_1.Businessform, null) }),
        React.createElement(react_router_dom_1.Route, { path: '*', element: React.createElement(react_router_dom_1.Navigate, { to: '/error/404' }) })));
};
exports.PrivateRoutes = PrivateRoutes;
var SuspensedView = function (_a) {
    var children = _a.children;
    var baseColor = _utils_1.getCSSVariableValue('--bs-primary');
    react_topbar_progress_indicator_1["default"].config({
        barColors: {
            '0': baseColor
        },
        barThickness: 1,
        shadowBlur: 5
    });
    return React.createElement(react_1.Suspense, { fallback: React.createElement(react_topbar_progress_indicator_1["default"], null) }, children);
};

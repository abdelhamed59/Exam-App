import type { RouteObject } from "react-router";
import AuditLogsPage from "./pages/AuditLogsPage";
import AuditLogPage from "./pages/AuditLogPage";

export const auditLogRoutes: RouteObject[] = [
  {
    path: "auditLogs",
    element: <AuditLogsPage />,
  },{
    path: "auditLogs/:id",
    element: <AuditLogPage />,
  }
];
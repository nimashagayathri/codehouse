import { Navigate } from 'react-router-dom';

/**
 * Wraps a page and blocks access unless the user is logged in
 * (has a token in localStorage). Optionally restricts access to
 * a specific list of backend role strings, e.g. ['Admin'].
 *
 * Usage:
 *   <Route path="/admin" element={
 *     <PrivateRoute allowedRoles={['Admin']}><AdminDashboard /></PrivateRoute>
 *   } />
 */
function PrivateRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Logged in, but wrong role for this page — send them to their own dashboard.
    const fallback = {
      Candidate: '/jobseeker',
      Recruiter: '/recruiter',
      HiringManager: '/hiring-manager',
      Admin: '/admin',
    }[role] || '/login';

    return <Navigate to={fallback} replace />;
  }

  return children;
}

export default PrivateRoute;
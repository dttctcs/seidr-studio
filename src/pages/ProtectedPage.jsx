import React from 'react';
import { Navigate } from 'react-router';
import { useSeidrAuth } from 'seidrui';

function ProtectedPage({ children }) {
  const { user } = useSeidrAuth();
  return user ? children : <Navigate to="/login" />;
}

export default ProtectedPage;

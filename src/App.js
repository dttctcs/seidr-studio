import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { useSeidrAuth, useSeidrInfo } from 'seidrui';

import ProtectedPage from './pages/ProtectedPage.jsx';
import Login from './pages/Login';
import Profile from './pages/Profile.jsx';
import { Frame, ApiWrapper } from './features/frame';

function App() {
  const { apis } = useSeidrInfo();
  const { user, getUser } = useSeidrAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      getUser().then(() => setLoading(false));
    }
  }, [user]);

  if (loading) {
    return null;
  }

  return (
    <Routes>
      <Route exact={true} path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedPage>
            <Frame />
          </ProtectedPage>
        }
      >
        {apis &&
          apis.map((api, index) => {
            return <Route key={index} path={api.path} element={<ApiWrapper {...api} />} />;
          })}

        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;

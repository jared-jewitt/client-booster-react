import React from 'react';

import { useAuth } from '@/hooks';

export default () => {
  const { clearAuthState } = useAuth();
  return (
    <div className="home">
      <h1 className="home__title">Home</h1>
      <button
        className="home__logout-btn"
        onClick={clearAuthState}
      >
        Simulate logout
      </button>
    </div>
  );
};

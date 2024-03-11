import React, { useCallback, useEffect, useState } from 'react'

function useIsTabOpen() {
  const [isTabOpen, setIsTabOpen] = useState(!document.hidden);

  const handleVisiblity = useCallback(() => setIsTabOpen(!document.hidden),[]);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisiblity);

    return () => {
      document.removeEventListener('visibilitychange', handleVisiblity);
    }
  },[handleVisiblity]);

  return isTabOpen;
}

export default useIsTabOpen;

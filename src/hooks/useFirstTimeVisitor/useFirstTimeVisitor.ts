import { useEffect, useState } from 'react';

const useFirstTimeVisitor = (key: string) => {
  const [isFirstTimeVisitor, setIsFirstTimeVisitor] = useState<boolean>(false);

  useEffect(() => {
    const isFirstTime = localStorage.getItem(key) === null;
    if (isFirstTime) {
      localStorage.setItem(key, 'visited');
      setIsFirstTimeVisitor(true);
    } else {
      setIsFirstTimeVisitor(false);
    }
  }, [key]);

  return isFirstTimeVisitor;
}

export default useFirstTimeVisitor;

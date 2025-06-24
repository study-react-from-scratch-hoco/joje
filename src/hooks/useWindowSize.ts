import { useState, useEffect } from 'react';
import { isServer } from '../utils/isClient';

interface WindowSize {
  width: number;
  height: number;
}

export const useWindowSize = (): WindowSize => {
  // 서버 사이드에서는 기본값 반환
  if (isServer) {
    return { width: 0, height: 0 };
  }

  const [size, setSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const updateSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', updateSize);
    updateSize(); // 초기값 설정

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}; 
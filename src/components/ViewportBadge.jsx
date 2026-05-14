import { useEffect, useState } from 'react';

export default function ViewportBadge() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 10,
      right: 10,
      zIndex: 9999,
      padding: '6px 8px',
      borderRadius: 8,
      border: '1px solid rgba(255,255,255,0.25)',
      background: 'rgba(0,0,0,0.75)',
      color: '#fff',
      fontSize: 12,
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace'
    }}>
      {size.w} x {size.h}
    </div>
  );
}

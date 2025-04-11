import { Button as AntdButton } from 'antd';
import { useEffect, useState } from 'react';

const Button = ({ children, onClick, type, size, className, htmlType, disabled }: any) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  return (
    <AntdButton
      type={type || 'primary'}
      size={size || 'middle'}
      className={`ripple-button sketch-button ${className || ''}`}
      onClick={(e: any) => {
        const rect = e.target.getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        onClick && onClick(e);
      }}
      onMouseDown={(e: any) => e.preventDefault()}
      htmlType={htmlType}
      disabled={disabled}
    >
      {isRippling ? (
        <span
          className='ripple'
          style={{
            left: coords.x,
            top: coords.y,
          }}
        />
      ) : (
        ''
      )}
      <span className='btn-content'>{children}</span>
      <div className='sketch-button-lines'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </AntdButton>
  );
};

export { Button };

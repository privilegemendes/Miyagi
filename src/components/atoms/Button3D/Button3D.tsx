import * as React from 'react';
import {FC} from 'react';
import styles from './Button3D.module.css'

type Props = {
  text?: string;
  onClick?: (e: React.MouseEvent) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  size?: 'default' | 'small';
}
export const Button3D:FC<Props> =
  (
      {
        text,
        onClick,
        disabled,
        onMouseLeave,
        onMouseDown,
        onMouseUp,
        type,
      }
  ) => {

  return <button
      className={styles.pushable}
      onClick={onClick}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
      type={type}

  >
    <span className={styles.shadow}/>
    <span className={styles.edge}/>
	 <span className={styles.front}>
			{text || 'OK'}
   		</span>
  </button>;
}

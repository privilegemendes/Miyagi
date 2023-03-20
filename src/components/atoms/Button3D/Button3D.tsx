import * as React from 'react';
import {FC} from "react";
import styles from './Button3D.module.css'
import clsx from "clsx";

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

        className,
        text,
        onClick,
        disabled,
        onMouseLeave,
        onMouseDown,
        onMouseUp,
        type,
	  	size = 'default',
      }
  ) => {

  return <button
      className={clsx(className, styles.pushable)}
      onClick={onClick}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
      type={type}

  >
    <span className={styles.shadow}/>
    <span className={styles.edge}/>
	  {size === 'small' ?
		  <span className={styles.frontSmall}>
			  {text || 'OK'}
		  </span>
		  : <span className={styles.front}>
			{text || 'OK'}
		   </span>
	  }
  </button>;
}

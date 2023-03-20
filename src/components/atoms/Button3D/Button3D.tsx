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
    <span className={styles.front}>
      {text || 'OK'}
    </span>
  </button>;
}

/* Understanding the spread operator {{...delegated}}
* By using the spread operator ({...delegated}), any other props that are passed
* to the component will be spread onto the button element.
* This makes the component more flexible, as any additional props can be used
* to customize the button as needed.
* */

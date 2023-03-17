import * as React from 'react';
import {FC} from "react";
import styles from './Button3D.module.css'

type Props = {
  text: string;
  onClick?: (e: React.MouseEvent) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  disabled?: boolean;
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
      }
  ) => {

  return <button
      className={styles.pushable}
      onClick={onClick}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      disabled={disabled}

  >
    <span className={styles.shadow}/>
    <span className={styles.edge}/>
    <span className={styles.front}>
      {text}
    </span>
  </button>;
}

/* Understanding the spread operator {{...delegated}}
* By using the spread operator ({...delegated}), any other props that are passed
* to the component will be spread onto the button element.
* This makes the component more flexible, as any additional props can be used
* to customize the button as needed.
* */

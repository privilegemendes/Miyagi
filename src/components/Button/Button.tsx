import * as React from 'react';
import {FC} from "react";
import styles from './Button.module.css'

type Props = {
  text: string;
}
export const Button:FC<Props> =
  (
      {
        text,
          ...delegated
      }
  ) => {

  return <button className={styles.pushable}  {...delegated}>
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
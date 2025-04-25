import React from 'react'
import classNames from 'classnames';
import styles from './Button.module.css'

const Button = ({
  name,
  onClick,
  variant = 'dark',
}) => {
  const buttonClass = classNames(
    styles.buttonBase,
    {
      [styles.buttonLight]: variant === 'light',
      [styles.buttonDark]: variant === 'dark',
      [styles.buttonOutline]: variant === 'outline',
    }
  );

  return (
    <button className={buttonClass} onClick={onClick}>
      <b>{name}</b>
    </button>
  );
};


export default Button
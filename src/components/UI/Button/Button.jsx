import React from 'react'
import classNames from 'classnames';
import styles from './Button.module.css'

const Button = ({
  name,
  onClick,
  variant = 'dark', // 'light' или 'dark
}) => {
  const buttonClass = classNames(
    styles.buttonBase,
    {
      [styles.buttonLight]: variant === 'light',
      [styles.buttonDark]: variant === 'dark',
    }
  );
  return (
    <button className={buttonClass} onClick={onClick}>{name}</button>
  )
}

export default Button
import React from 'react'
import styles from './Button.module.css'

const Button = ({
  ganer,
}) => {
  return (
    <button className={styles.custom_button}>{ganer}</button>
  )
}

export default Button
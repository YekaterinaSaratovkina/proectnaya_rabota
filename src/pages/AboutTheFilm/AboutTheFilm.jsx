import React from 'react'
import styles from './AboutTheFilm.module.css'
import { ChevronLeft } from 'lucide-react'

const AboutTheFilm = () => {
  return (
    <div>
      <ChevronLeft
        className={styles.backIcon}
      />
    </div>
  )
}

export default AboutTheFilm
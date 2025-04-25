import React from 'react'
import styles from './PageLayout.module.css'
import Header from '../components/Header/Header'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'

const PageLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.item}/>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.item2}/>
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default PageLayout
import React from 'react'
import { styles } from '../css/homepage.js'

const HomePage = () => {
  return (
    <div className={styles.container1}>
      <div className={styles.gradientTop}></div>
      <div className={styles.gradientBottom}></div>


      <div className={styles.contentSection}>
        <h1 className={styles.mainTitle}>
          Bring People Together. Create Moments That Matter ✨
        </h1>

        <p className={styles.mainSubtitle}>
          Discover, host, and join amazing events all in one place. Whether you're building
          a community or exploring new experiences, this is where connections turn into memories.
        </p>

        <div className={styles.taglineRow} >
          <div className={styles.line}></div>
          <span className={styles.tagline} >
            Discover • Connect • Celebrate
          </span>
        </div>
      </div>





      <div className={styles.imageWrapper}>
        <img
          src="image.png"
          className={styles.image}
        />

        <div className={styles.overlay}></div>
      </div>
    </div>

  )
}

export default HomePage
import React from 'react';

import styles from './styles.module.scss'

function Header(){
    return(
        <header className={styles.header}>
            <img src="./spacex.png" alt="logo" className={styles.logo}/>
        </header>
    )
}

export default Header;
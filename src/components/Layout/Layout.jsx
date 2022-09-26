import { Outlet } from 'react-router-dom';
import styles from './style.module.css';
import TheHeader from '../TheHeader/TheHeader.jsx';

const Layout = () => {
  return (
    <div>
      <header>
        <TheHeader></TheHeader>
      </header>
      <main className={styles.layout}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

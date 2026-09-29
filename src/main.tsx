import ReactDOM from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import { Layout } from './app/Layout';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MotionConfig reducedMotion="user">
    <Layout />
  </MotionConfig>,
);

import { useEffect, useState } from 'react';
import Fade from '@mui/material/Fade';
import LoadingScreen from './components/common/LoadingScreen';
import HomePage from './pages/HomePage';

const LOADING_DURATION_MS = 1200;

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), LOADING_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Fade in timeout={500}>
      <div>
        <HomePage />
      </div>
    </Fade>
  );
}

export default App;

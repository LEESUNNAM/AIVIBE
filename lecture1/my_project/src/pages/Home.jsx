import Header from '../components/common/Header';
import Hero from '../components/landing/Hero';
import Profile from '../components/landing/Profile';
import PortfolioGrid from '../components/landing/PortfolioGrid';
import Footer from '../components/common/Footer';

/**
 * Home 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <Home />
 */
function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Profile />
      <PortfolioGrid />
      <Footer />
    </>
  );
}

export default Home;

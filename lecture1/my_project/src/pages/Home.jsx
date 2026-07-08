import Header from '../components/common/Header';
import Hero from '../components/landing/Hero';
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
      <PortfolioGrid />
      <Footer />
    </>
  );
}

export default Home;

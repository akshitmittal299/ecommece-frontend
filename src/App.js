import logo from './logo.svg';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import './App.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProductCard 
          image="https://via.placeholder.com/400x300" 
          title="Product 1" 
          price="29.99" 
        />
        <ProductCard 
          image="https://via.placeholder.com/400x300" 
          title="Product 2" 
          price="39.99" 
        />
        <ProductCard 
          image="https://via.placeholder.com/400x300" 
          title="Product 3" 
          price="49.99" 
        />
        <ProductCard 
          image="https://via.placeholder.com/400x300" 
          title="Product 3" 
          price="49.99" 
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;

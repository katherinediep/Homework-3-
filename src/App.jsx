import React, { useState } from 'react';
import "./index.css"; 

const MENU_ITEMS = [
  { 
    id: 1, 
    name: "Salmon Nigiri", 
    price: 3.00, 
    image: "https://images.unsplash.com/photo-1760903124403-9d0d36867720?q=80&w=870&auto=format&fit=crop", 
    desc: "Fresh salmon on rice." 
  },
  { 
    id: 2, 
    name: "Eel Roll", 
    price: 15.00, 
    image: "https://images.unsplash.com/photo-1582450871972-ab5ca641643d?q=80&w=774&auto=format&fit=crop", 
    desc: "Eel and shrimp tempura roll." 
  },
  { 
    id: 3, 
    name: "Sashimi Platter", 
    price: 35.00, 
    image: "https://images.unsplash.com/photo-1743653258526-84f0245660c5?q=80&w=1476&auto=format&fit=crop", 
    desc: "Fresh salmon, tuna, yellow tail, and snapper." 
  },
  { 
    id: 4, 
    name: "Miso Soup", 
    price: 8.00, 
    image: "https://images.unsplash.com/photo-1763470260582-894ae15f43bb?q=80&w=1371&auto=format&fit=crop", 
    desc: "Warm miso soup with seaweed and tofu." 
  },
];

const App = () => {
  const [cart, setCart] = useState([]);

  // add items or increment amt
  const addToCart = (item) => {
    const existing = cart.find((c) => c.id === item.id);
    if (existing) {
      setCart(cart.map((c) => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // remove specific item
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // reset cart
  const clearCart = () => {
    setCart([]);
  };

  // cart total
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#222831] text-white font-sans">
      <nav className="flex justify-between items-center px-[8%] py-6 bg-[#222831]">
        <h1 className="text-3xl italic font-serif text-[#ffbe33]">Good Sushi</h1>
        <ul className="hidden md:flex gap-8 uppercase text-xs tracking-widest font-bold">
          <li className="text-[#ffbe33] cursor-pointer hover:opacity-80 transition">Home</li>
          <li className="cursor-pointer hover:text-[#ffbe33] transition">Menu</li>
          <li className="cursor-pointer hover:text-[#ffbe33] transition">Gallery</li>
          <li className="cursor-pointer hover:text-[#ffbe33] transition">Contact</li>
        </ul>
      </nav>

      <header 
        className="h-[45vh] flex items-center justify-center bg-gradient-to-b from-black/60 to-black/60 bg-cover bg-center" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1681270496598-13c5365730c8?q=80&w=1290&auto=format&fit=crop')` 
        }}
      >
        <h2 className="text-5xl md:text-7xl font-serif text-[#ffbe33] drop-shadow-2xl">Good Sushi NYC</h2>
      </header>

      <main className="max-w-7xl mx-auto px-[8%] py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* menu */}
        <div className="lg:col-span-2">
          <h2 className="text-4xl font-serif text-[#ffbe33] mb-10 border-l-4 border-[#ffbe33] pl-4">Our Menu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {MENU_ITEMS.map((item) => (
              <div key={item.id} className="bg-white text-[#333] p-0 rounded-2xl overflow-hidden shadow-xl flex flex-col hover:scale-[1.02] transition-transform duration-300">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-500 text-sm mt-2 mb-4 flex-grow">{item.desc}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-black text-[#222831]">${item.price.toFixed(2)}</span>
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-[#222831] text-white px-6 py-2 rounded-lg hover:bg-[#ffbe33] hover:text-[#222831] transition-colors font-bold"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* cart */}
        <aside className="bg-white text-[#333] p-8 rounded-3xl shadow-2xl h-fit">
          <h2 className="text-2xl font-serif font-bold mb-8 border-b-2 border-gray-100 pb-4 text-[#222831]">Your Order</h2>
          
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 italic">Your cart is currently empty.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="max-h-[40vh] overflow-y-auto pr-2 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start animate-fadeIn">
                    <div>
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-1">{item.quantity} x ${item.price.toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 text-[10px] font-black uppercase tracking-widest transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="border-t-2 border-gray-100 pt-6 mt-2">
                <div className="flex justify-between text-2xl font-black text-[#222831] tracking-tight">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex flex-col gap-4 mt-8">
                  <button 
                    onClick={clearCart} 
                    className="text-gray-400 hover:text-red-500 text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    Clear All Items
                  </button>
                  <button className="bg-[#ffbe33] text-[#222831] py-4 rounded-xl font-black text-lg hover:bg-[#e6ab2e] transition-all shadow-lg active:scale-95">
                    Confirm Order
                  </button>
                </div>
              </div>
            </div>
          )}
        </aside>
      </main>

      {/* footer */}
      <footer className="bg-[#1a1a1a] py-12 text-center text-gray-500 text-sm border-t border-gray-800 mt-20">
        <p className="uppercase tracking-[0.2em]">© 2026 Good Sushi NYC</p>
      </footer>
    </div>
  );
};

export default App;
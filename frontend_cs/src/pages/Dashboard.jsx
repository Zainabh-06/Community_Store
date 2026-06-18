import {
  Search,
  Home,
  Users,
  Package,
  User,
  ShoppingCart
} from "lucide-react";

import { useState, useEffect } from "react";
import { getProducts } from "../services/api";


function Dashboard() {
  const [cartCount, setCartCount] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("All");
const filteredProducts =
  selectedCategory === "All"
    ? products
    : products.filter(
        (product) => product.category === selectedCategory
      );
 useEffect(() => {
  fetchProducts();
}, []);
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      console.log("Products:", data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 pb-24">

      {/* TOP NAVIGATION */}
      <div className="flex items-center justify-between px-6 py-6 bg-white shadow-md">
        <div>
          <h1 className="text-5xl font-bold text-slate-900 font-serif leading-tight">
            Community<br />
            <span className="block text-5xl">Store</span>
          </h1>
          <p className="mt-2 text-base text-slate-500">Fresh groceries for your neighborhood</p>
        </div>

        <div className="flex items-center gap-4">
          <div
            onClick={() => setShowCart(true)}
            className="relative bg-white rounded-full p-3 shadow-lg cursor-pointer"
          >
            <ShoppingCart size={22} className="text-green-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <img
            src="https://i.pinimg.com/236x/1d/27/4f/1d274fb2067ef14c6ba0dd4031120cf8.jpg"
            alt="Profile"
            className="w-12 h-12 rounded-full border-2 border-white shadow-md"
          />
        </div>
      </div>

     {/* HERO */}
<div className="mx-4 mt-4">

  <div
    className="rounded-[32px] p-0 text-white shadow-xl relative overflow-hidden bg-cover bg-center"
    style={{
      backgroundImage:
        "url('https://png.pngtree.com/thumb_back/fh260/background/20240720/pngtree-a-vibrant-mix-of-fresh-produce-including-colorful-vegetables-and-fruits-image_16017533.jpg')",
      minHeight: "480px",
    }}
  >

    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20"></div>

    <div className="absolute left-6 bottom-6 max-w-lg z-20">
      <h2 className="text-4xl font-bold leading-tight text-white drop-shadow-2xl">
        Stock up on daily essentials
      </h2>
      <p className="mt-3 text-lg text-green-100 max-w-xl drop-shadow-lg">
        Get farm-fresh goodness & a range of exotic fruits, vegetables, eggs & more
      </p>
    </div>

  </div>

</div>


      {/* SEARCH */}
      <div className="px-4 mt-6">

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 flex items-center px-4 py-4">

          <Search size={20} />

          <input
            type="text"
            placeholder="Search products..."
            className="ml-3 w-full outline-none text-gray-700 placeholder-gray-400"
          />

        </div>

      </div>
<div id="fresh">
  <h2>🥛 Fresh</h2>
  {/* Fresh Products */}
</div>

<div id="home">
  <h2>🏠 Home</h2>
  {/* Home Products */}
</div>

<div id="beauty">
  <h2>💄 Beauty</h2>
  {/* Beauty Products */}
</div>

<div id="toys">
  <h2>🧸 Toys</h2>
  {/* Toys Products */}
</div>
      {/* CATEGORIES */}
      <div className="flex gap-6 overflow-x-auto px-4 mt-6 pb-2">

 <div
  onClick={() => setSelectedCategory("Fresh")}
  <div
  onClick={() =>
    document
      .getElementById("fresh")
      .scrollIntoView({ behavior: "smooth" })
  }
  className="flex flex-col items-center min-w-[70px] cursor-pointer"
>
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">
      🥛
    </div>
    <span className="mt-2 text-sm font-medium">
      Fresh
    </span>
  </div>

   <div
  onClick={() =>
    document
      .getElementById("home")
      .scrollIntoView({ behavior: "smooth" })
  }
  className="flex flex-col items-center min-w-[70px] cursor-pointer"
>
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">
      🏠
    </div>
    <span className="mt-2 text-sm font-medium">
      Home
    </span>
  </div>

    <div
  onClick={() =>
    document
      .getElementById("beauty")
      .scrollIntoView({ behavior: "smooth" })
  }
  className="flex flex-col items-center min-w-[70px] cursor-pointer"
>
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">
      💄
    </div>
    <span className="mt-2 text-sm font-medium">
      Beauty
    </span>
  </div>

    <div
  onClick={() =>
    document
      .getElementById("toys")
      .scrollIntoView({ behavior: "smooth" })
  }
  className="flex flex-col items-center min-w-[70px] cursor-pointer"
>
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">
      🧸
    </div>
    <span className="mt-2 text-sm font-medium">
      Toys
    </span>
  </div>

</div>

      {/* PRODUCTS */}
<div className="px-4 mt-8">

  <div className="flex justify-between items-center mb-5">

    <h2 className="text-2xl font-bold">
      Popular In Your Community
    </h2>

    <button className="text-green-600 font-semibold">
      See All
    </button>

  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

    {filteredProducts.map((product) => (
      <div
       key={product._id}
        className="
bg-white
rounded-3xl
overflow-hidden
border
border-gray-100
shadow-sm
hover:shadow-xl
hover:-translate-y-1
transition
duration-300
"
      >

        <div className="relative bg-gray-50">

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-44 object-cover"
          />

          <button onClick={() => setCartCount(cartCount + 1)}
           className="
absolute
bottom-3
right-3
bg-green-600
text-white
font-bold
px-4
py-1
rounded-xl
shadow-md
"
          >
            ADD
          </button>

        </div>

        <div className="p-3">

          <div className="flex items-center gap-2">

            <span className="bg-green-600 text-white px-2 py-1 rounded-lg font-bold">
              {product.price}
            </span>

            <span className="line-through text-gray-400 text-sm">
              {product.oldPrice}
            </span>

          </div>

         

          <h3 className="font-semibold mt-3 leading-6">
            {product.name}
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            1 Pack (2kg)
          </p>

          <span className="inline-block mt-2 bg-green-50 text-green-700 px-2 py-1 rounded-lg text-sm">
            Fresh & Fragrant
          </span>

          

        </div>

      </div>
    ))}

  </div>

</div>

      
      

      {/* UPDATES */}
      <div className="px-4 mt-8 pb-8">

        <div className="bg-white rounded-3xl p-6 shadow">

          <h2 className="text-2xl font-bold mb-4">
            📢 Community Updates
          </h2>

          <ul className="space-y-4 text-gray-700">

            <li className="bg-green-50 p-3 rounded-xl">🥬 Fresh vegetables arrived today</li>
            <li className="bg-green-50 p-3 rounded-xl">🥛 Milk stock replenished</li>
            <li className="bg-green-50 p-3 rounded-xl">🎉 Weekend sale activated</li>

          </ul>

        </div>

      </div>

      

    {showCart && (
  <div className="fixed inset-0 bg-black/40 flex justify-end z-50">

    <div className="w-[350px] h-full bg-white shadow-2xl p-5">

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-green-700">
          🛒 My Cart
        </h2>

        <button
          onClick={() => setShowCart(false)}
          className="text-xl"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3">

        <div className="border rounded-xl p-3">
          Fresh Milk - ₹30
        </div>

        <div className="border rounded-xl p-3">
          Apples - ₹80
        </div>

      </div>

      <div className="mt-6 border-t pt-4">

        <p className="font-bold text-lg">
          Total Items: {cartCount}
        </p>

        <button
          className="
          w-full
          mt-4
          bg-green-600
          text-white
          py-3
          rounded-xl
          font-semibold
          "
        >
          Proceed to Checkout
        </button>

      </div>

    </div>

  </div>
)}
    
  </div>
  );
}


export default Dashboard;
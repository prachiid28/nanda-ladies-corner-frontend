import {useEffect,useState} from "react";

import api from "../api/api";

import Navbar from "../components/Navbar";
import Categories from "../components/Categories";


function Home(){

const [products,setProducts]=useState([]);

const [selectedCategory,setSelectedCategory]=useState("All");



useEffect(()=>{

api.get("/products")
.then(res=>{
setProducts(res.data);
})

.catch(err=>{
console.log(err);
});


},[]);



const filteredProducts = selectedCategory==="All"

?
products

:
products.filter(
(product)=>
product.category===selectedCategory
);



return(

<>


<Navbar/>



<section className="hero">

<h1>
Welcome to Nanda Ladies Corner 🌸
</h1>

<p>
Makeup • Jewellery • Gifts • Toys
</p>

<p>
Visit our shop and explore beautiful collections
</p>

</section>




<Categories 
setSelectedCategory={setSelectedCategory}
/>





<section id="products"
className="products">


<h2>
Our Collection
</h2>




<div className="product-grid">


{

filteredProducts.map(product=>(


<div 
className="product-card"
key={product._id}
>


<img
src={product.image}
alt={product.name}
/>


<h3>
{product.name}
</h3>


<p>
{product.category}
</p>


<p>
₹ {product.price}
</p>


</div>


))

}


</div>


</section>





<section id="contact"
className="contact">


<h2>
Visit Our Shop 🛍️
</h2>


<p>
No online delivery. Please visit Nanda Ladies Corner to purchase.
</p>


</section>


</>

)

}


export default Home;
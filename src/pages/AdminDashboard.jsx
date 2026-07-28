import { useState, useEffect } from "react";
import {
  FaCloudUploadAlt,
  FaSignOutAlt,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

import "./AdminDashboard.css";
import api from "../api/api";


function AdminDashboard() {


  const initialForm = {
    name: "",
    category: "",
    price: "",
    description: "",
  };


  const [form, setForm] = useState(initialForm);

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);



  const getToken = () => localStorage.getItem("token");



  const fetchProducts = async () => {

    try {

      setLoading(true);

      const res = await api.get("/products");

      setProducts(res.data || []);


    } catch(err) {

      console.log(err);


    } finally {

      setLoading(false);

    }

  };



  useEffect(()=>{

    fetchProducts();

  },[]);



  useEffect(()=>{

    return ()=>{

      if(preview && preview.startsWith("blob:")){

        URL.revokeObjectURL(preview);

      }

    };

  },[preview]);





  const handleChange=(e)=>{

    setForm({

      ...form,

      [e.target.name]:e.target.value

    });

  };





  const handleImage=(e)=>{


    const file=e.target.files[0];


    if(!file) return;


    setImage(file);

    setPreview(URL.createObjectURL(file));


  };





  const resetForm=()=>{


    setEditingId(null);

    setForm(initialForm);

    setImage(null);

    setPreview("");


    const input=document.getElementById("image");


    if(input){

      input.value="";

    }


  };





  const deleteProduct=async(id)=>{


    if(!window.confirm("Delete this product?")) return;



    try{


      await api.post("/products", formData, {
  headers:{
    "Content-Type":"multipart/form-data"
  }
});


      await fetchProducts();


      alert("Product Deleted 🌸");



    }catch(err){

      console.log(err);

    }


  };





  const editProduct=(product)=>{


    setEditingId(product._id);


    setForm({

      name:product.name || "",

      category:product.category || "",

      price:product.price || "",

      description:product.description || ""

    });



    setPreview(product.image || "");

    setImage(null);



    window.scrollTo({

      top:0,

      behavior:"smooth"

    });


  };





  const handleSubmit=async(e)=>{


    e.preventDefault();



    try{


      setSaving(true);



      const data=new FormData();



      Object.keys(form).forEach((key)=>{

        data.append(key,form[key]);

      });



      if(image){

        data.append("image",image);

      }




      const config={

        headers:{

          Authorization:`Bearer ${getToken()}`,

          "Content-Type":"multipart/form-data"

        }

      };





      if(editingId){


        await api.put(

          `/products/${editingId}`,

          data,

          config

        );


        alert("Product Updated 💖");



      }else{


        await api.post(

          "/products",

          data,

          config

        );


        alert("Product Added 🌸");


      }




      await fetchProducts();

      resetForm();



    }catch(err){


      console.log(err);


      alert(

        err.response?.data?.message ||

        "Operation Failed"

      );



    }finally{


      setSaving(false);


    }


  };





  const filteredProducts=products.filter((item)=>{


    const text=search.toLowerCase();


    return (

      item.name?.toLowerCase().includes(text) ||

      item.category?.toLowerCase().includes(text)

    );


  });





return(

<div className="admin-page">



<header className="header">


<div className="brand">

🌸

<div>

<h1>Nanda Ladies Corner</h1>

<p>Admin Panel</p>

</div>

</div>







</header>







<section className="form-card">


<div className="image-side">


<label htmlFor="image">


{

preview ?


<img

src={preview}

alt="preview"

/>


:

<>

<FaCloudUploadAlt size={60}/>

<h3>Upload Image</h3>

<span>Click here</span>

</>


}



</label>



<input

id="image"

type="file"

accept="image/*"

onChange={handleImage}

/>



</div>







<form

className="details-side"

onSubmit={handleSubmit}

>


<h2>

{editingId ? "Edit Product 💖":"Add New Product 🌸"}

</h2>




<input

type="text"

name="name"

placeholder="Product Name"

value={form.name}

onChange={handleChange}

required

/>





<div className="row">


<select

name="category"

value={form.category}

onChange={handleChange}

required

>


<option value="">Category</option>

<option>Makeup</option>

<option>Jewellery</option>

<option>Gifts</option>

<option>Toys</option>


</select>





<input

type="number"

name="price"

placeholder="Price"

value={form.price}

onChange={handleChange}

required

/>


</div>





<textarea

rows="6"

name="description"

placeholder="Description"

value={form.description}

onChange={handleChange}

required

/>





<button

className="save-btn"

disabled={saving}

>

{

saving

?

"Saving..."

:

editingId

?

"Update Product"

:

"Add Product"

}


</button>



</form>


</section>







<div className="search-box">


<FaSearch/>


<input

type="text"

placeholder="Search Products..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>



</div>







<section className="products-section">



<div className="section-header">


<h2>🌸 Your Products</h2>


<span>

{filteredProducts.length} Products

</span>


</div>






{

loading ?


<h3 className="loading">

Loading Products...

</h3>



:


filteredProducts.length===0 ?


<div className="empty-products">

<h3>No Products Found 🌸</h3>

<p>

Start adding beautiful products for your boutique.

</p>

</div>



:



<div className="product-grid">



{

filteredProducts.map((product)=>(


<div

className="product-card"

key={product._id}

>



<div className="product-image-box">


<img

src={

product.image ||

"https://via.placeholder.com/400x400?text=Nanda+Ladies+Corner"

}

alt={product.name}

className="product-image"

/>



</div>







<div className="product-content">



<div className="product-top">


<div>


<h3>{product.name}</h3>



<span className="category">

{product.category}

</span>



</div>




<h2 className="price">

₹{product.price}

</h2>



</div>






<p className="description">

{product.description}

</p>






<div className="product-actions">



<button

className="edit-btn"

onClick={()=>editProduct(product)}

>


<FaEdit/>

Edit


</button>





<button

className="delete-btn"

onClick={()=>deleteProduct(product._id)}

>


<FaTrash/>

Delete


</button>



</div>



</div>



</div>



))


}



</div>



}



</section>



</div>

);


}


export default AdminDashboard;
import {
  FaGift,
  FaGem,
  FaMagic
} from "react-icons/fa";

import {
  GiLipstick
} from "react-icons/gi";


function Categories({setSelectedCategory}){


const categories = [

{
name:"Makeup",
icon:<GiLipstick/>
},

{
name:"Jewellery",
icon:<FaGem/>
},

{
name:"Gifts",
icon:<FaGift/>
},

{
name:"Toys",
icon:<FaMagic/>
}

];



return(

<section className="categories">


<h2>
Shop Categories
</h2>



<div className="category-grid">


{

categories.map((item)=>(


<div

className="category-card"

key={item.name}

onClick={()=>setSelectedCategory(item.name)}

>


<div className="icon">

{item.icon}

</div>



<h3>

{item.name}

</h3>


</div>


))

}


</div>


</section>

)

}


export default Categories;
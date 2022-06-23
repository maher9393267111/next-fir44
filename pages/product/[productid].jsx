import React from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import {globaluse} from '../../context/global';
import { onSnapshot, doc, collection,getDoc,query,orderBy } from "firebase/firestore";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {
    useCollectionData,
    useDocumentData,
  } from "react-firebase-hooks/firestore";
const Productid = () => {
  const router = useRouter();
  const { productid } = router.query;
  console.log(productid);

//const {fetchSingleCategoryProducts } = globaluse()


  const [product, setProduct] = useState({});
const [subcategory, setSubcategory] = useState({});
const [category, setCategory] = useState({});
  const fetchproduct = async () => {


const productRef = doc(db, "Pro", productid);
const product = await getDoc(productRef);

setProduct(product.data());


const cathref = doc(db, "Categories2", product.data().categoryid);
const category = await getDoc(cathref);
setCategory(category.data());
//onsole.log(category,'🔴 🔴 🔴 🔴 🔴 ');

const subcathref = doc(db, "subcat", product.data().subid);
const sub = await getDoc(subcathref);
setSubcategory(category.data());
console.log(sub,'🔴 🔴 🔴 🔴 🔴 ');




 
    }


  useEffect(() => {
    if (productid) {
      fetchproduct()
    
    
    }

  }, [db, productid]);

  const { images, name, price, desc, quantity, sold, rating } = product;


  useEffect(() => {
console.log(product.name,'🔴 🔴 ');


    if ( product?.name) {
        onSnapshot(doc(db, "subcat", product.subid), (snapshot) => {
            setSubcategory(snapshot.data())
            

        }
        )
    }
    

  }, [productid]);

  

//  const [cat] = useDocumentData(doc(db, "Categories2", product.id)); 
//    console.log(cat);



// useEffect(() => {

// if (productid && product) {

//     fetchSingleCategoryProducts(product.categoryid)
// }

// }, [productid])



  return (
    <div>
      <div>
        {/* grid--- */}

        <div className=" grid mt-12 ml-2 mr-2 grid-cols-12">
          {/* --image slider- */}
          <div className="  col-span-7">
           
           
            <Carousel showArrows={true} autoPlay infiniteLoop>
          {images && images.map((i) => <img className=" object-contain" src={i.image} key={i.name} />)}
        </Carousel>
              
         
          </div>

          {/* side- */}
          <div className=" col-span-5">

{ category?.name}
{ subcategory?.name}


          </div>



        </div>
      </div>
    </div>
  );
};

export default Productid;

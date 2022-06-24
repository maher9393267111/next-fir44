import React from "react";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import { globaluse } from "../../context/global";
import { useDispatch, useSelector } from "react-redux";
import {
  onSnapshot,
  doc,
  collection,
  getDoc,
  query,
  orderBy,

} from "firebase/firestore";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import Sideinfo from "../../components/product/sideinfo";

const Productid = () => {


  const router = useRouter();
  const { productid } = router.query;
  console.log(productid);

  //const {fetchSingleCategoryProducts } = globaluse()

  const [product, setProduct] = useState({});
  const [subcategory, setSubcategory] = useState({});
  const [category, setCategory] = useState({});
  const [relatedproducts, setRelatedproducts] = useState([]);

  const { refreshproduct } = useSelector((state) => state.global);
const {RealatedProducts} = globaluse()

  const fetchproduct = async () => {
    const productRef = doc(db, "Pro", productid);
    const product = await getDoc(productRef);





    setProduct({id: productid, ...product.data()});

    RealatedProducts(productid) 
    

    const cathref = doc(db, "Categories2", product.data().categoryid);
    const category = await getDoc(cathref);
    setCategory({ id: category.id, ...category.data() });
    //onsole.log(category,'🔴 🔴 🔴 🔴 🔴 ');

    const subcathref = doc(db, "subcat", product.data().subid);
    const sub = await getDoc(subcathref);
    setSubcategory({ ...sub.data(), id: sub.id });
  //  console.log(sub, "🔴 🔴 🔴 🔴 🔴 ");

   await RealatedProducts(product.data().subid) 



  };

  useEffect(() => {
    if (productid) {
      fetchproduct();
    }
  }, [db, productid, refreshproduct]);

  const { images, name, price, desc, quantity, sold, rating } = product;

  return (
    <div>
        {name}
      <div>
        {/* grid--- */}

        <div className=" grid mt-12 ml-2 mr-2 grid-cols-12">
          {/* --image slider- */}
          <div className="  col-span-7">
            <Carousel showArrows={true} autoPlay infiniteLoop>
              {images &&
                images.map((i) => (
                  <img className=" object-contain" src={i.image} key={i.name} />
                ))}
            </Carousel>
          </div>

          {/* side- */}
          <div className=" col-span-5">
            <div>
<Sideinfo category={category} subcategory={subcategory} product={product} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productid;

import {
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    onSnapshot,
    orderBy,
    limit,
    query,
    where,
    FieldPath,
    updateDoc,
    arrayUnion,
    addDoc,
    deleteDoc,
} from "firebase/firestore";

import {
    getDownloadURL,
    ref,
    uploadString,
    getStorage,
    uploadBytes,
    deleteObject,
  } from "firebase/storage";


import { db,storage } from '../firebase'
import {
    useCollectionData,
    useDocumentData,
  } from "react-firebase-hooks/firestore";
import { toast } from "react-toastify";



// const q = query(
//     collection(db, "Categories2"),
  
//   );
//   const [categories, loading] = useCollectionData(q);
 // const [chat] = useDocumentData(doc(db, "chats", id));




// create a new category
export const createCategory = async (category) => {

    console.log('category--->⚡⚡', category);
    await addDoc(collection(db, "Categories2",), { name: category }).then(() => {
        toast.success("Category created successfully");

    }
    ).catch((error) => {
        toast.error(error.message);


    }
    );




}



// update a category

export const updateCategory = async (categoryid, category) => {
    console.log('category---🚀🚀🚀🚀', category,categoryid);
   
    const categoryDoc = doc(db, 'Categories2', categoryid);
   
	await updateDoc(categoryDoc, {name:category});
 

}



export const deleteCategory = async (categoryid) => {
    console.log('category---🚀🚀🚀🚀',categoryid);
   
    const categoryDoc = doc(db, 'Categories2',categoryid);
   
	await  deleteDoc(categoryDoc).then(() => {
        toast.success("Category deleted successfully");
    }).catch((error) => {
        toast.error(error.message);
    }
    );


}



//-----------------------------------------------------//


// subcategory

export const createSub = async (subdata) => {

    console.log('subdata--->⚡⚡');
    await addDoc(collection(db, "subcat",), subdata).then(() => {
        toast.success("SubCategory created successfully");

    }
    ).catch((error) => {
        toast.error(error.message);


    }
    );
}




export const updateSubCategory = async (subid, subdata) => {
   // console.log('Sub is--💬💬💬💬',subid);
   
    const subDoc = doc(db, 'subcat',subid);
   
	await updateDoc(subDoc, subdata).then(() => {
        toast.success("SubCategory updated successfully");


    }   ).catch((error) => {
        toast.error(error.message);

    }
    );
 

}



export const deleteSubCategory = async (subid) => {
    console.log('subid---🚀🚀🚀🚀',subid);
   
    const categoryDoc = doc(db, 'subcat',subid);
   
	await  deleteDoc(categoryDoc).then(() => {
        toast.success("subcategory deleted successfully");
    }).catch((error) => {
        toast.error(error.message);
    }
    );


}




export const createProduct = async (productdata) => {

    console.log('productdata--->⚡⚡',productdata);
    await addDoc(collection(db, "Pro",), productdata).then(() => {
        toast.success("product created successfully");

    }
    ).catch((error) => {
        toast.error(error.message);


    }
    );
}




export const updateproduct = async (productid, productdata) => {
    // console.log('Sub is--💬💬💬💬',subid);
    
     const productDoc = doc(db, 'Pro',productid);
    
     await updateDoc(productDoc, productdata).then(() => {
         toast.success("product----> updated successfully");
 
 
     }   ).catch((error) => {
         toast.error(error.message);
 
     }
     );
  
 
 }
 




 export const deleteproduct = async (productid) => {
    console.log('productid---🚀🚀🚀🚀',productid);
   
    const productpath = doc(db, "Pro", `${productid}`);
    const imagesdata = await (await getDoc(productpath)).data()?.images;

console.log('imagesdata---🚀🚀🚀🚀',imagesdata);

  // // delete images from storage
  if ( imagesdata && imagesdata?.length > 0) {
         imagesdata?.forEach((image) => {
        const desertRef = ref(storage, `ecom/${image.name}`);
        deleteObject(desertRef)
            .then(() => {'Deleted! '})
            .catch((error) => {
                console.log("Uh-oh, an error occurred!");
            }
            )
        })
    }




    const productDoc = doc(db, 'Pro',productid);
   
	await  deleteDoc(productDoc).then(() => {
        toast.success("product deleted successfully");
    }).catch((error) => {
        toast.error(error.message);
    }
    );


}
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
import { db } from '../firebase'
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

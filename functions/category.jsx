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

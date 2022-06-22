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
  import {db} from '../firebase'

  import { toast } from "react-toastify";


// create a new category
export const createCategory = async (category) => {

console.log('category--->⚡⚡', category);
    await addDoc(collection(db, "Categories2",), { name: category}).then(() => {
      toast.success("Category created successfully");

             }
              ).catch((error) => {
                toast.error(error.message);
        
              
              }
            );




}
import {useState, useEffect} from "react"
import {db} from "../firebase";
import { collection, query, orderBy, where, onSnapshot  } from "firebase/firestore"; 



export const useFetchDocuments = (docColection,search = null, id = null)=>{
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const [cancelled, setCancelled] = useState(false);

    useEffect(()=>{
        const loadData = async()=>{
            if(cancelled) return
            setLoading(true);

            const collectionRef = await collection(db, docColection);

          

            try {
                let q 

                q = await query(collectionRef, where("id", "==",  uid), orderBy("createdAt", "desc"));

                // if(search){
                //     q = await query(collectionRef, where("tags", "array-contains", search), orderBy("createdAt", "desc"));
                    
                // }else if(uid){
                //     q = await query(collectionRef, where("uid", "==",  uid), orderBy("createdAt", "desc"));
                // }else{
                
                //     q = await query(collectionRef, orderBy("createdAt", "desc"));
                // }

                

                await onSnapshot(q, (querySnapshot)=>{
                    setDocuments(
                        querySnapshot.docs.map((doc)=>({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                });

                setLoading(false);
            } catch (error) {
                console.log(error);
                setError(error.message);
                setLoading(false);
            }
        }

        loadData();

    },[docColection, search, uid, cancelled]);

    useEffect(()=>{
        return ()=> setCancelled(true);
    },[]);

    return {documents, loading, error}
}
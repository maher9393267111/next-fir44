
import {useDispatch,useSelector} from 'react-redux'
//import JsonData from "./MOCK_DATA.json";
import ReactPaginate from "react-paginate";
import { useState } from 'react';
import { useEffect } from 'react';
import { globaluse } from '../../context/global';

function Pa() {


    const  {latesProducts} = globaluse()


    useEffect(() => {
    
        latesProducts()
    
    
    }, []);


    const dispatch = useDispatch();
    const {products,latestproducts} = useSelector(state=>state.global);

  const [users, setUsers] = useState(products);
  const [pageNumber, setPageNumber] = useState(0);





  const usersPerPage = 2;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = latestproducts
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user) => {
      return (
        <div className="user mx-8">
          <h3>{user.name}</h3>
          <h3>{user.price}</h3>
     
        </div>
      );
    });

  const pageCount = Math.ceil(latestproducts.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="App">

<div className=' grid grid-cols-2 gap-6'>



{displayUsers}

    
    </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}

export default Pa;
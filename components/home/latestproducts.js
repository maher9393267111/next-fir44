
import {useDispatch,useSelector} from 'react-redux'
//import JsonData from "./MOCK_DATA.json";
import ReactPaginate from "react-paginate";
import { useState } from 'react';
import { useEffect } from 'react';
import { globaluse } from '../../context/global';
import HomeCard from '../cards/homecard'

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
    .map((product) => {
      return (
        <div className=" mx-8">
          <HomeCard product={product} />
     
        </div>
      );
    });

  const pageCount = Math.ceil(latestproducts.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="App mt-12  pb-[100px]">


<div className=' lg:w-[1200px]'>

<div className=' w-full h-[100px] mr-12 mb-4  text-white text-xl font-bold text-center  '>
    <h1 className='pt-8 text-2xl  '  >New products</h1>
</div>

</div>


<div className=' grid grid-cols-2 gap-6'>



{displayUsers}

    
    </div>
    <div className=' mt-6'>

    
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
    </div>
  );
}

export default Pa;
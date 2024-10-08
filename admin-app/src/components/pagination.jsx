import React, { memo, useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
// import { CgArrowLongLeft, CgArrowLongRight } from 'react-icons/cg'


const Pagination = ({ productPerPage, totalProducts, paginate, curPage }) => {

    const handlePageClick = (event) => {
        paginate(event.selected + 1);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    let nPage = Math.ceil(totalProducts / productPerPage);
    let nnPage = Math.floor((totalProducts + productPerPage - 1) / productPerPage);
    
    return (
        <>

            <ReactPaginate
                previousLabel={'<CgArrowLongLeft'}
                nextLabel={'<CgArrowLongRight'}
                breakLabel={"..."}
                pageCount={nnPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={curPage === 0 ? "page-item active" : "page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={curPage === 1 ? "page-item d-none" : "page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={curPage === nPage ? "page-item d-none" : "page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />

        </>
    )
}

export default memo(Pagination);
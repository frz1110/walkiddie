import React,{ useState } from 'react';

const Pagination = ({ currentPage, postsPerPage, totalPosts, paginate }) => {
    const pages = [];
    const pageNumberLimit = 3;
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    const handleNextbtn = () => {
        paginate(currentPage + 1);
    
        if (currentPage + 1 > maxPageNumberLimit) {
          setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
      };
    
    const handlePrevbtn = () => {
        paginate(currentPage - 1);
    
        if ((currentPage - 1) % pageNumberLimit === 0) {
          setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
    }

    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              key={number}
              id={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? "active" : null}
            >
              {number}
            </li>
          );
        } else {
          return null;
        }
    });

    return (
        <nav>
        <ul className='pageNumbers'
            style={{
              height: '45px'
            }}
        >
            <li>
            <button
                style={{
                  fontSize: '110%',
                  height: '15px',
                  width: '15px'
                }}
                className="pagination-button"
                onClick={handlePrevbtn}
                disabled={currentPage === pages[0] ? true : false}
            >
                &lt;
            </button>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            <li>
            <button
                style={{
                  fontSize: '110%',
                  height: '15px',
                  width: '15px'
                }}
                onClick={handleNextbtn}
                disabled={currentPage === pages[pages.length - 1] ? true : false}
            >
                &gt;
            </button>
            </li>
        </ul>
        </nav>
    );
};

export default Pagination;
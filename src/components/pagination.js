import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  // console.log(currentPage);

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1);

  // console.log(pagesCount);

  return (
    <nav>
      <ul className="pagination">
        {pages.map(x => (
          <li
            key={x}
            className={x === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link " href="#" onClick={() => onPageChange(x)}>
              {x}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;

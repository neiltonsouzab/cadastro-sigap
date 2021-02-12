import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';

import './styles.css';

const Paginate: React.FC<ReactPaginateProps> = ({ ...props }) => {
  return (
    <ReactPaginate
      containerClassName="paginate"
      nextLabel={<FaArrowRight size={14} color="#000" />}
      previousLabel={<FaArrowLeft size={14} color="#000" />}
      {...props}
    />
  );
};

export default Paginate;

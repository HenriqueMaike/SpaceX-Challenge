import React, { useContext, useState, useEffect } from "react";
import { ContextApi } from "../../context/ContextApi";

import styles from './styles.module.scss'

function Pagination() {
  const { LaunchesRequest } = useContext(ContextApi);
  const { launches } = useContext(ContextApi);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const handlePrevChange = () => {
    if (currentPage > 1) {
      const page = currentPage - 1;
      setCurrentPage(page);
      LaunchesRequest(page);
    }
  };

  const handleNextChange = () => {
    if (currentPage < totalPages) {
      const page = currentPage + 1;
      setCurrentPage(page);
      LaunchesRequest(page);
    }
  };

  useEffect(() => {
    setCurrentPage(launches.page);
    setTotalPages(launches.totalPages);
    setHasNext(launches.hasNext);
    setHasPrev(launches.hasPrev);
  }, [launches]);

  return (
    <>
    <div className={styles.container}>
        <div className={styles.page}>
            <button onClick={handlePrevChange} disabled={!hasPrev}>
                Prev
            </button>
            <strong>{currentPage}</strong>
            <button onClick={handleNextChange} disabled={!hasNext}>
                Next
            </button>
        </div>
    </div>
      
    </>
  );
}

export default Pagination;

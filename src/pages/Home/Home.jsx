import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import Card from "../../components/Card/Card";
import "./home.css";

export default function Home() {
  const [data, setData] = useState({ offers: [], count: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async (page) => {
    try {
      const response = await axios.get(
        `https://site--api-vinted--xqlhxl275zw4.code.run/offer?page=${page}`
      );
      setData(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="home">
      <Header />
      <h2>Articles populaires</h2>
      {!isLoading ? (
        <>
          <div className="home__content">
            {data.offers.map((offer) => (
              <Card offer={offer} key={offer._id} />
            ))}
          </div>
          <div className="home__pagination">
            <button
              className="home__pagination__btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            <span>{currentPage}</span>
            <button
              className="home__pagination__btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage * 5 >= data.count}
            >
              {">"}
            </button>
          </div>
        </>
      ) : (
        <p>En cours de chargement...</p>
      )}
    </div>
  );
}

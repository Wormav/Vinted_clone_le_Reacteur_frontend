import { useContext, useEffect } from "react";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import "./home.css";
import { ArticlesContext } from "../../context/articlesContext";

export default function Home() {
  const { isLoading, data, setPage, page } = useContext(ArticlesContext);

  useEffect(() => {}, [data, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="home">
      <Header />
      <h2>Nos articles</h2>
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
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              {"<"}
            </button>
            <span>{page}</span>
            <button
              className="home__pagination__btn"
              onClick={() => handlePageChange(page + 1)}
              disabled={page * 5 >= data.count}
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

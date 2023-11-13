import axios from "../config/axios.config";
import { createContext, useEffect, useState } from "react";

export const ArticlesContext = createContext();

export const ArticlesProvider = ({ children }) => {
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("price-asc");
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(500);
  const [update, setUpdate] = useState(false);

  const baseUrl = "/offer";

  const [url, setUrl] = useState(
    `${baseUrl}?page=${page}&limit=6&sort=${sort}`
  );

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setUrl(
      `${baseUrl}?page=${page}&limit=6&sort=${sort}&title=${title}&priceMin=${priceMin}&priceMax=${priceMax}`
    );
  }, [page, sort, title, priceMin, priceMax]);

  useEffect(() => {
    fetchData(url);
  }, [url, update]);

  return (
    <ArticlesContext.Provider
      value={{
        data,
        setData,
        isLoading,
        setUrl,
        setPage,
        page,
        setSort,
        setTitle,
        setPriceMin,
        setPriceMax,
        update,
        setUpdate,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

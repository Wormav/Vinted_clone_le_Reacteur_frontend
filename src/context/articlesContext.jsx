import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ArticlesContext = createContext();

export const ArticlesProvider = ({ children }) => {
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("price-asc");

  const baseUrl = "https://site--api-vinted--xqlhxl275zw4.code.run/offer";

  const [url, setUrl] = useState(
    `${baseUrl}?page=${page}&limit=5&sort=${sort}`
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
    setUrl(`${baseUrl}?page=${page}&limit=5&sort=${sort}`);
  }, [page, sort]);

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return (
    <ArticlesContext.Provider
      value={{ data, setData, isLoading, setUrl, setPage, page, setSort }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

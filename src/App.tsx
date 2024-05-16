import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState<string>("");

  useEffect(() => {
    let pageUrl = page;

    if (!pageUrl) {
      const queryParams = new URLSearchParams(window.location.search);
      const getUrl = queryParams.get("page");

      if (getUrl) {
        pageUrl = getUrl;
        setPage(getUrl);
      } else {
        pageUrl = "project";
      }
    }

    window.history.pushState(null, "", "?page=" + pageUrl);
  }, [page]);
  return (
    <>
      <h1>Hej</h1>
    </>
  );
}

export default App;

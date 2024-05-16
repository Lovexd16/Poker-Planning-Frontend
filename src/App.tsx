import { useEffect, useState } from "react";
import "./App.css";
import Project from "./components/pages/project/Project";
import Issue from "./components/pages/issue/Issue";
import IssueDetails from "./components/pages/issue/IssueDetails";
import Login from "./components/pages/login/Login";
import Register from "./components/pages/register/Register";
import Statistics from "./components/pages/statistics/Statistics";

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
      <h1>Poker Planning</h1>
      {
        {
          project: <Project />,
          issue: <Issue />,
          issueDetails: <IssueDetails />,
          login: <Login />,
          register: <Register />,
          statistics: <Statistics />,
        }[page]
      }
    </>
  );
}

export default App;

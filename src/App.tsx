import { useEffect, useState } from "react";
import "./App.css";
import Project from "./components/pages/project/Project";
import Issue from "./components/pages/issue/Issue";
import IssueDetails from "./components/pages/issue/IssueDetails";
import Login from "./components/pages/login/Login";
import Register from "./components/pages/register/Register";
import Statistics from "./components/pages/statistics/Statistics";
import Navigation from "./components/navigation/Navigation";

function App() {
  const [page, setPage] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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
      <Navigation
        setPage={setPage}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={false}
      />
      {
        {
          login: <Login setPage={setPage} setIsLoggedIn={setIsLoggedIn} />,
          register: <Register setPage={setPage} />,
          project: <Project />,
          issue: <Issue />,
          issueDetails: <IssueDetails />,
          statistics: <Statistics />,
        }[page]
      }
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import Project from "./components/pages/project/Project";
import Issue from "./components/pages/issue/NewIssue";
import IssueDetails from "./components/pages/issue/IssueDetails";
import Login from "./components/pages/login/Login";
import Register from "./components/pages/register/Register";
import Statistics from "./components/pages/statistics/Statistics";
import Navigation from "./components/navigation/Navigation";
import NewProject from "./components/pages/project/NewProject";
import SelectedProject from "./components/pages/project/SelectedProject";

function App() {
  const [page, setPage] = useState<string>("");

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const savedState = localStorage.getItem("isLoggedIn");
    return savedState ? JSON.parse(savedState) : false;
  });

  const [isProjectSelected, setIsProjectSelected] = useState<boolean>(false);
  
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    let pageUrl = page;

    if (!pageUrl) {
      const queryParams = new URLSearchParams(window.location.search);
      const getUrl = queryParams.get("page");

      if (getUrl) {
        pageUrl = getUrl;
        setPage(getUrl);
      } else {
        pageUrl = "login";
      }
    }

    window.history.pushState(null, "", "?page=" + pageUrl);
  }, [page]);

  return (
    <>

      <Navigation
        setPage={setPage}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        currentPage={page}
      />
      {
        {
          login: <Login setPage={setPage} setIsLoggedIn={setIsLoggedIn} />,
          register: <Register setPage={setPage} />,
          issue: <Issue projectId={""} />,
          issueDetails: <IssueDetails />,
          statistics: <Statistics />,
          newproject: <NewProject setPage={setPage} />,
          selectedproject: <SelectedProject projectId={""} selectedProject={null} />,
          project: isLoggedIn && <Project setPage={setPage} setIsProjectSelected={setIsProjectSelected} />,
        }[page]
      }
    </>
  );
}

export default App;
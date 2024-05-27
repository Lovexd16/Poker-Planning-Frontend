import { useEffect, useState } from "react";
import "./App.css";
import Project from "./components/pages/project/Project";
import Issue from "./components/pages/issue/NewIssue";
import Login from "./components/pages/login/Login";
import Register from "./components/pages/register/Register";
import Navigation from "./components/navigation/Navigation";
import NewProject from "./components/pages/project/NewProject";
import SelectedProject from "./components/pages/project/SelectedProject";
import ProjectInterface from "./components/interface/ProjectInterface";
import InactiveProject from "./components/pages/statistics/InactiveProject";
import GetIssue from "./components/pages/issue/GetIssue";



function App() {
  const [page, setPage] = useState<string>("");
  

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const savedState = localStorage.getItem("isLoggedIn");
    return savedState ? JSON.parse(savedState) : false;
  });

  const [selectedProject, setSelectedProject] = useState<ProjectInterface | null>(null);  
  
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

  useEffect(() => {
    console.log("Current page:", page);
    console.log(selectedProject?.projectName);
  }, [page]);

  return (
    <>

      <Navigation
        setPage={setPage}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        currentPage={page}
      />

      
{isLoggedIn && (
        <Project
          setPage={setPage}
          setIsProjectSelected={(value: boolean) => {
            if (!value) setSelectedProject(null);
          }}
          setSelectedProject={setSelectedProject}
        />
      )}

      {isLoggedIn && selectedProject && page === `selectedproject/${selectedProject.projectName}` && (
        <SelectedProject
          projectId={selectedProject.projectId}
          selectedProject={selectedProject}
        />
      )}
  
      {
        {
          login: <Login setPage={setPage} setIsLoggedIn={setIsLoggedIn} />,
          register: <Register setPage={setPage} />,
          issue: <Issue projectId={""} />,
          inactiveproject: <InactiveProject />,
          newproject: <NewProject setPage={setPage} />,
          selectedproject: <SelectedProject projectId={""} selectedProject={null} />,
        }[page]
      }
    </>
  );
}

export default App;
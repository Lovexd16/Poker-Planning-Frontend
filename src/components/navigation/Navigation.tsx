import Logout from "../pages/login/Logout";
import './Navigation.css';

interface Props {
  setPage: (page: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  currentPage: string;
}

function Navigation({ setPage, isLoggedIn, setIsLoggedIn, currentPage }: Props) {
  return (
    <div className="header">
      {isLoggedIn ? (
        <>
          <Logout setPage={setPage} setIsLoggedIn={setIsLoggedIn} />
          <button
            className={`button ${currentPage === "newproject" ? "active" : ""}`}
            onClick={() => setPage("newproject")}
          >
            Skapa nytt projekt
          </button>
          <button
            className={`button ${currentPage === "project" ? "active" : ""}`}
            onClick={() => setPage("project")}
          >
            Projekt
          </button>
          <button
            className={`button ${currentPage === "statistics" ? "active" : ""}`}
            onClick={() => setPage("statistics")}
          >
            Statistik
          </button>
        </>
      ) : (
        <>
          <button
            className={`button ${currentPage === "login" ? "active" : ""}`}
            onClick={() => setPage("login")}
          >
            Logga in
          </button>
          <button
            className={`button ${currentPage === "register" ? "active" : ""}`}
            onClick={() => setPage("register")}
          >
            Registrera
          </button>
        </>
      )}
    </div>
  );
}

export default Navigation;

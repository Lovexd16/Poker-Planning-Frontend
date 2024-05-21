import Logout from "../pages/login/Logout";

interface Props {
  setPage: ((page: string) => void);
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

function Navigation({ setPage, isLoggedIn, setIsLoggedIn }: Props) {

  return (
    <div className="header">
      {isLoggedIn ? (
        <Logout setPage={setPage} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <button onClick={() => setPage("login")}>Logga in</button>
      )}
      {!isLoggedIn && (
        <button onClick={() => setPage("register")}>Registrera</button>
      )}
    </div>
  );
}

export default Navigation;
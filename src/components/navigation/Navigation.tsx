
interface Props {
  setPage: ((page: string) => void);
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

function Navigation(props: Props) {



  return (

    <div className="header">
        <>
        <button onClick={() => props.setPage("register")}>Registrera</button>
        <button onClick={() => props.setPage("login")}>Logga in</button>
        </>
    </div>

  );
}

export default Navigation;

import { useState } from "react";
import UserDetails from "../../interface/UserDetails";

interface Props {
  setPage: (page: string) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

function Login({setPage, setIsLoggedIn}: Props) {

  const [newLogin, setNewLogin] = useState<UserDetails>({
    username: "",
    password: ""
  });

  const loginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("http://localhost:8080/loginuser", {
       method: "POST",
       headers: {
           "Content-Type": "application/json"
       },
       body: JSON.stringify({ ...newLogin })
   })
   .then(response => {
       if (!response.ok) {
           throw new Error("Kunde inte logga in!");
       }
       return response.text(); 
   })
   .then(token => {
       console.log("Mottagen JWT-token:", token);
     
       localStorage.setItem("token", token);

       setPage("project");
       setIsLoggedIn(true);
       
   })
   .catch(error => {
       console.error("Error logging in:", error);
   });
};


  return (
      <div className="login">
        <form onSubmit={loginUser}>
          <label>
            Användarnamn<br />
            <input type ="text" required value={newLogin.username} onChange={(e) => setNewLogin({...newLogin, username: e.target.value})}></input>
          </label><br/><br/>
          <label>
            Lösenord<br />
            <input type ="password" required value={newLogin.password} onChange={(e) => setNewLogin({...newLogin, password: e.target.value})}></input>
          </label><br/><br/>
          <button type="submit">Logga in</button>
        </form>
      </div>
  );
}

export default Login;

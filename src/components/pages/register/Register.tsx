import { useState } from "react";
import UserDetailsInterface from "../../interface/UserDetails";

interface Props {
  setPage: (page: string) => void;
}

function Register({ setPage }: Props) {
  const [newUser, setNewUser] = useState<UserDetailsInterface>({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");


  const registerUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("http://localhost:8080/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newUser }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Användarnamnet är upptaget, prova ett annat namn!");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Användare lades till: ", data);
        setPage("login");
      })
      .catch((error) => {
        console.error("Fel vid tillägning: ", error);
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="register">
      <form onSubmit={registerUser}>
        <h2>Registrera</h2>
        <label>
          Användarnamn
          <br />
          <input
            type="text"
            required
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          ></input>
        </label>
        <br />
        <br />
        <label>
          Lösenord
          <br />
          <input
            type="password"
            required
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          ></input>
        </label>
        <br />
        <br />
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Registrera</button>
      </form>
    </div>
  );
}

export default Register;

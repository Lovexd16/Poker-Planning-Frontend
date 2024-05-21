import { useState } from "react";
import UserDetails from "../../interface/UserDetails";

interface Props {
  setPage: (page: string) => void;
}

function Register({ setPage }: Props) {
  const [newUser, setNewUser] = useState<UserDetails>({
    username: "",
    password: "",
  });

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
          throw new Error("Användarnamnet är upptaget.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Användare lades till: ", data);
        setPage("login");
      })
      .catch((error) => {
        console.error("Fel vid tillägning: ", error);
      });
  };

  return (
    <div className="register">
      <form onSubmit={registerUser}>
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
        <button type="submit">Registrera</button>
      </form>
    </div>
  );
}

export default Register;

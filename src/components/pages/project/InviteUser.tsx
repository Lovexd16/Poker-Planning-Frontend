import { useEffect, useState } from "react";
import UserInterface from "../../interface/UserInterface";
import { jwtDecode } from "jwt-decode";

interface InviteUserInterface {
  username: string;
}

function InviteUser({ projectId }: { projectId: string }) {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserInterface[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<UserInterface | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const selectUser = (user: UserInterface) => {
    setSelectedUser(user);
    setInputValue(user.username);
  };

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    const decodedToken = jwtDecode(token);
    const loggedInUser = decodedToken.sub;

    fetch(`http://localhost:8080/user/${loggedInUser}/invite`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [users]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toLowerCase();
    setInputValue(inputValue);

    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(inputValue)
    );
    setFilteredUsers(filtered);
  };

  const [invitedUser, setInvitedUser] = useState<InviteUserInterface>({
    username: "",
  });

  const inviteUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(
      `http://localhost:8080/addUser/${projectId}/${selectedUser?.userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...invitedUser,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Kunde inte bjuda in användaren!");
        }
        setInvitedUser({
          username: "",
        });
      })
      .catch((error) => {
        console.error("Error inviting user:", error);
        setErrorMessage(error.message);
      });
  };

  return (
    <>
      <h2>Bjud in</h2>
      <form onSubmit={inviteUser}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Sök användare..."
          required
        />
        <button type="submit">Bjud in</button>
      </form>
      {inputValue !== "" && (
        <div>
          {filteredUsers.map((user) => (
            <button onClick={() => selectUser(user)} key={user.userId}>
              {user.username}
            </button>
          ))}
        </div>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}

export default InviteUser;

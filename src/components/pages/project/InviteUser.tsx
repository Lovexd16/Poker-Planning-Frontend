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
  const [successMessage, setSuccessMessage] = useState<string>("");

  const selectUser = (user: UserInterface) => {
    setSelectedUser(user);
    setInputValue(user.username);
  };

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    const decodedToken = jwtDecode(token);
    const loggedInUser = decodedToken.sub;

    fetch(
      `https://seahorse-app-f89t8.ondigitalocean.app/user/getallusersexceptloggedin/${loggedInUser}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

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
      `http://localhost:8080/project/adduser/${projectId}/${selectedUser?.userId}`,
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
        console.log(response);

        if (!response.ok) {
          console.log(selectedUser);

          throw new Error("Kunde inte bjuda in användaren!");
        }
        setSuccessMessage(
          "Du bjöd precis in " + selectedUser?.username + " till projektet!"
        );
        setInputValue("");
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
      <details>
        <summary>Bjud in användare</summary>
        <form onSubmit={inviteUser}>
          <input
            className="inputForm"
            type="text"
            required
            size={30}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Sök användare..."
          />
          <button className="issueButtons" type="submit">
            Bjud in
          </button>
        </form>
        {inputValue !== "" && (
          <div>
            {filteredUsers.map((user) => (
              <div key={user.userId}>
                <button
                  className="issueButtons"
                  onClick={() => selectUser(user)}
                >
                  {user.username}
                </button>
                <br />
              </div>
            ))}
          </div>
        )}
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </details>
    </>
  );
}

export default InviteUser;

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";


function IssueMessage({issueId}: {issueId: string}) {
    const [issueMessages, setIssueMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token') || '';
        fetch(`http://localhost:8080/issue/${issueId}/conversation`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then (data => setIssueMessages(data))
        .catch(error => console.error('Error fetching messages:', error));
    }, [issueMessages]);
        

    const sendMessage = () => {
      const token = localStorage.getItem('token') || '';
      const decodedToken = jwtDecode(token);
      const loggedInUser = decodedToken.sub;

      const timestamp = new Date().toLocaleTimeString('sv-SE');

      fetch(`http://localhost:8080/issue/${issueId}/${loggedInUser}/conversation`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(newMessage +  " - skickat: " + timestamp)

      })
      .then(res => res.text())
      .then(data => setIssueMessages([...issueMessages, data]))
      .catch(error => console.error('Error sending message:', error));
      setNewMessage("");
  }
  
  return (
    <details>
      <summary>Meddelanden</summary>
      <div>
        {issueMessages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      ></textarea>
      <button onClick={sendMessage}>Skicka meddelande</button>
    </details>
  )
}

export default IssueMessage
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import NewProjectInterface from "../../interface/NewProjectInterface";

interface Props {
    setPage: (page: string) => void;
  }

function NewProject({setPage}: Props) {

    const [newProject, setNewProject] = useState<NewProjectInterface>({
      
        projectName: "",
        projectDescription: ""
    });

    
    const saveProject = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token') || '';
        const decodedToken = jwtDecode(token);
        const loggedInUser = decodedToken.sub;
    
    
        fetch(`http://localhost:8080/project/${loggedInUser}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ ...newProject, projectCreatedByUser: { userId: loggedInUser } })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Kunde inte spara projekt!");
            }
            setPage("project");
            setNewProject({
                projectName: "",
                projectDescription: "",
            });
        })
        .catch(error => {
            console.error("Error saving project:", error);
        });
    };
  
  
    return (
      <div>
        <h2>Nytt Projekt:</h2>
        <form onSubmit={saveProject}>
        <label>
            Projektnamn<br />
            <input type ="text" required value={newProject.projectName} onChange={(e) => setNewProject({...newProject, projectName: e.target.value})}></input>
          </label><br/><br/>
          <label>
            Projektbeskrivning<br />
            <input type ="text" required value={newProject.projectDescription} onChange={(e) => setNewProject({...newProject, projectDescription: e.target.value})}></input>
          </label><br/><br/>
          <button type="submit">Skapa projekt</button>

        </form>
      </div>
    )
  }
  
  export default NewProject;
  
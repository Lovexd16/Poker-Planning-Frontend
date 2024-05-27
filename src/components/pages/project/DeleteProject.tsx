import { useState } from "react";

function DeleteProject({projectId}: {projectId: string}) {

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
   
    const deleteProject = () => {

        const confirmed = window.confirm("Är du säker på att du vill radera projektet?");
       
        const token = localStorage.getItem('token') || '';

        if(confirmed) {
            fetch(`http://localhost:8080/project/${projectId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Kunde inte radera projekt!");
                }
                setSuccessMessage("Projektet har raderats")
                console.log("Radering lyckats för projekt med id: " + projectId)
            })
            .catch(error => {
                console.error("Error deleting project:", error);
                setErrorMessage("Du har redan tagit bort det här projektet")
            });
        };

        }

    
       

    return (
        <>
        <details>
        <summary>Radera projekt</summary>
            <button className="issueButtons" onClick={deleteProject} >Radera projekt</button>
            {successMessage && <p>{successMessage}</p>}
            {errorMessage && <p>{errorMessage}</p>}
        </details>
        </>
    )
}

export default DeleteProject
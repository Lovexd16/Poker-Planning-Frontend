import { useState } from 'react'

interface IsDone {
    isDone: boolean;
}

function IsDone({projectId}: {projectId: string}) {

    const [newIsDone, setNewIsDone] = useState<IsDone>({
        isDone: false
    })

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
  

    const markAsDone = () => {
       
        const token = localStorage.getItem('token') || '';

    
        fetch(`http://localhost:8080/project/${projectId}/isdone`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ ...newIsDone})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Kunde inte markera klart projekt!");
            }
            setSuccessMessage("Projektet är nu avklarat!")
            setNewIsDone({
                isDone: false
            });
        })
        .catch(error => {
            console.error("Error mark as project done:", error);
            setErrorMessage("Du har redan markerat det här projektet som klar")
        });
    };

    return (
        <>
        <details>
        <summary>Markera projekt som klar</summary>
            <button className='issueButtons' onClick={markAsDone} >Markera som klar</button>
            {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
        </details>
        </>
    )
}

export default IsDone
import { useState } from 'react'

interface IsDone {
    isDone: boolean;
}

function IsDone({projectId}: {projectId: string}) {

    const [newIsDone, setNewIsDone] = useState<IsDone>({
        isDone: false
    })

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
            setNewIsDone({
                isDone: false
            });
        })
        .catch(error => {
            console.error("Error mark as project done:", error);
        });
    };

    return (
        <>
        <details>
        <summary>Markera projekt som klar</summary>
            <button onClick={markAsDone} >Markera som klar</button>
        </details>
        </>
    )
}

export default IsDone
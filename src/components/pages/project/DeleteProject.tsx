function DeleteProject({projectId}: {projectId: string}) {
   
    const deleteProject = () => {
       
        const token = localStorage.getItem('token') || '';

    
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
            console.log("Radering lyckats för projekt med id: " + projectId)
        })
        .catch(error => {
            console.error("Error deleting project:", error);
        });
    };

    return (
        <>
        <details>
        <summary>Radera projekt</summary>
            <button onClick={deleteProject} >Radera projekt</button>
        </details>
        </>
    )
}

export default DeleteProject
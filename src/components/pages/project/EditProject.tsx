import React, { useState } from 'react'

interface EditProject {
    projectName: string;
    projectDescription: string;
}

function EditProject({projectId, projectName, projectDescription}: {projectId: string, projectName: string, projectDescription: string}) {

    const [newEditProject, setEditProject] = useState<EditProject>({
        projectName: "",
        projectDescription: ""
    })



    const editProject = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token') || '';

    
        fetch(`http://localhost:8080/project/changenameanddescription/${projectId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ ...newEditProject})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Kunde inte redigera projekt!");
            }
            setEditProject({
                projectName: "",
                projectDescription: "",
            });
        })
        .catch(error => {
            console.error("Error editing project:", error);
        });
    };
  
    


    return (
        <>
        <div>EditProject</div>
        <form onSubmit={editProject}>
        <label>
            Projektnamn<br />
            <input type="text" placeholder={projectName} required size={30} value={newEditProject.projectName} onChange={(e) => setEditProject({...newEditProject, projectName: e.target.value})}></input>
          </label><br/><br/>
          <label>
            Projektbeskrivning<br />
            <textarea placeholder={projectDescription} required style={{width: '100%', height: '50px'}}value={newEditProject.projectDescription} onChange={(e) => setEditProject({...newEditProject, projectDescription: e.target.value})}></textarea>
          </label><br/><br/>
          <button type="submit">Redigera projekt</button>
        </form>
        </>
    )
}

export default EditProject
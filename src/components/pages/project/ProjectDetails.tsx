// import React from 'react';
// import { useProjectContext } from './Project';
// import './Project.css';
// interface Props {
//     setPage: (page: string) => void;
   
//   }
  

// const ProjectDetails = ({ setPage }: Props) => {
//   const { projects, selectProject } = useProjectContext();

//   return (
//     <div className="container">
//       <details className="details-container" open={true}>
//         <summary>Dina aktiva projekt</summary>
//         <div style={{ maxHeight: '30vh', overflowY: 'auto' }}>
//           {projects.length > 0 ? (
//             projects.map((project) => (
//               <div key={project.projectId}>
//                <button 
//                 className="button" 
//                 onClick={() => {
//                     selectProject(project);
//                     setPage('selectedproject'); 
//                 }}
//                 >
//                 <p>{project.projectCreatedByUserId}/{project.projectName}</p>
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p>Du har inga aktiva projekt.</p>
//           )}
//         </div>
//       </details>
//     </div>
//   );
// };

// export default ProjectDetails;
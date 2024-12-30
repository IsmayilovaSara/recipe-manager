import React from 'react';

const ProjectList = () => {
  const projects = [
    {
      name: 'Bonus Task',
      description: 'Flag of Azerbaijan using CSS',
      link: 'https://github.com/IsmayilovaSara/AZE-flag',
    },
    {
      name: 'Chrome Extension',
      description: 'Auto Form Filler',
      link: 'https://github.com/IsmayilovaSara/ChromeExtension-AutoFormFiller',
    },
  ];

  return (
    <div>
      <h2>My Projects</h2>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              {project.name}
            </a>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;

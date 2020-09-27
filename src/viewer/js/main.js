'use strict';
// LOAD PAGE
window.onload = fetchCourses();
window.addEventListener('load', fetchCourses);
window.onload = fetchProjects();
window.addEventListener('load', fetchProjects);
window.onload = fetchWorks();
window.addEventListener('load', fetchWorks);
var fetchedCourses = [];
var fetchedProjects = [];
var fetchedWorks = [];

// GET COURSE FROM MYSQL DATA
function fetchCourses() {
  fetch('http://studenter.miun.se/~momo1600/writeable/DT173G/adminpanel/src/model/courses.php', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(courses => {
      fetchedCourses = courses;
      document.querySelector('#courseOutput').innerHTML = '';

      courses.forEach(function(course) {
        document.querySelector('#courseOutput').innerHTML += `
                      <tr>
                      <td>${course.startdate} - ${course.enddate}</td>
                      <td>${course.course}</td>
                      <td>${course.hei}</td>
                      <td><a href="${course.url}" class="projects__link" target="_blank">${course.url}</a></td>
                      </tr>
                      `;
      });
    });
}

//  GET PROJECTS FROM MYSQL DATA
function fetchProjects() {
  fetch('http://studenter.miun.se/~momo1600/writeable/DT173G/adminpanel/src/model/projects.php', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(projects => {
      fetchedProjects = projects;
      document.querySelector('#projectOutput').innerHTML = '';

      projects.forEach(function(project) {
        document.querySelector('#projectOutput').innerHTML += `
        <div class="portfolio">
        <div class="portfolio-card">
          <div class="portfolio-container">

                    <div class="portfolio-date">
                    <p>${project.startdate} - ${project.enddate}</p>
                    </div>

                    <div class="portfolio-title">
                    <p>${project.title}</p>
                    </div>

                    <div class="portfolio-info">
                    <p>${project.description}</p>
                    <a href="${project.project}" target="_blank"><button class="portfolio-btn">PROJECT DEMO</button></a>
                    </div>

                    </div>
                    </div>
                  </div>
                    `;
      });
    });
}

//  GET WORKS FROM MYSQL DATA
function fetchWorks() {
  fetch('http://studenter.miun.se/~momo1600/writeable/DT173G/adminpanel/src/model/works.php', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(works => {
      fetchedWorks = works;
      document.querySelector('#workOutput').innerHTML = '';

      works.forEach(function(work) {
        document.querySelector('#workOutput').innerHTML += `
                    <tr>
                    <td>${work.startdate} - ${work.enddate}</td>
                    <td>${work.work}</td>
                    <td>${work.title}</td>
                    <td><a href="${work.url}" class="projects__link" target="_blank">${work.url}</a></td>
                    </tr>
                    `;
      });
    });
}

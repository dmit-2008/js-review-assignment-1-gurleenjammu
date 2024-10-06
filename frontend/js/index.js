import 'bootstrap/dist/css/bootstrap.min.css';
import { getJobs, getJobDetails } from './api/jobs.js';  // Ensure correct path

const searchForm = document.getElementById('search-jobs-form');
const queryInput = document.getElementById('query-input');
const jobList = document.getElementById('searched-jobs');
const jobDetailsCard = document.getElementById('job-details-card');

// Handle form submission and fetch jobs
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = queryInput.value;
  const jobs = await getJobs(query);  // Calls the backend to search for jobs
  renderJobs(jobs);
});

// Render job list
function renderJobs(jobs) {
  jobList.innerHTML = '';  // Clear previous results

  if (jobs.length === 0) {
    jobList.innerHTML = `<div class="text-dark">No Results Found</div>`;
    return;
  }

  jobs.forEach(job => {
    const jobItem = `
      <li class="job-card card my-1" style="width: 18rem; list-style: none;">
        <div class="card-header">${job.company}</div>
        <div class="card-body">
          <h5 class="card-title">${job.title}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">${job.location}</h6>
          <h6 class="card-subtitle mb-2 text-body-secondary">Posted ${new Date(job.postedDate).toLocaleDateString()}</h6>
          <button class="btn btn-primary view-job-button" data-id="${job.id}">View Job</button>
        </div>
      </li>
    `;
    jobList.innerHTML += jobItem;
  });

  // Add event listeners for "View Job" buttons
  document.querySelectorAll('.view-job-button').forEach(button => {
    button.addEventListener('click', async (e) => {
      const jobId = e.target.getAttribute('data-id');
      const jobDetails = await getJobDetails(jobId);
      renderJobDetails(jobDetails);
    });
  });
}

// Render job details
function renderJobDetails(job) {
  jobDetailsCard.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">${job.title}</h3>
        <h4 class="card-subtitle mb-2 text-body-secondary">${job.company}</h4>
        <h6 class="card-subtitle mb-2 text-body-secondary">${job.location}</h6>
        <h6 class="card-subtitle mb-2 text-body-secondary">Posted ${new Date(job.postedDate).toLocaleDateString()}</h6>
        <p><strong>Description:</strong> ${job.description}</p>
        <p><strong>Qualifications:</strong> ${job.qualifications}</p>
      </div>
    </div>
  `;
}

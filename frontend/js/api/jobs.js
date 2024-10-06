// your code goes here.
export async function getJobs(query) {
    const response = await fetch(`http://localhost:3000/jobs?search=${query}`);
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    return response.json();
  }
  
  export async function getJobDetails(jobId) {
    const response = await fetch(`http://localhost:3000/jobs/${jobId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch job details');
    }
    return response.json();
  }
  
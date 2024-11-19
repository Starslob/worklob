import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import person from "../../assets/address.jpg"; // Fallback image
import { jwtDecode } from "jwt-decode";

const Cusgigs = () => {
  const [selectedTab, setSelectedTab] = useState("Offers");
  const [jobs, setJobs] = useState({
    Offers: [],
    progress: [],
    completed: [],
  });
  const [loading, setLoading] = useState(true);
const navigate=useNavigate()
  const token = localStorage.getItem("token");
  let userId;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.userId;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  const handleChat = async (jobId) => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/chat/chatdetails`, {
        params: { jobId },
      });
      console.log("yu h",response.data)
      
      if (response.data.length > 0) {
        const chatId = response.data[0]._id; 
        navigate(`/dashboard/chatdetails/${jobId}/chat/${chatId}`);
      } else {
        console.error("No chat found for this job");
      }
    } catch (error) {
      console.error("Error navigating applied job data:", error);
    }
  }

  useEffect(() => {
    const fetchJobs = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`${API_URL}/api/v1/application/buy-gigjobs/${userId}`);
        const allAppliedJobs = response.data.appliedJobs || [];

        const categorizedJobs = {
          Offers: allAppliedJobs,
          progress: allAppliedJobs.filter(job => job.application?.status === "progress"),
          completed: allAppliedJobs.filter(job => job.application?.status === "completed"),
        };

        setJobs(categorizedJobs);
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [API_URL, userId]);

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  return (
    <>
      <div className="pagetitle">
        <h1>My Gigs</h1>
      </div>
      <div className="job-list">
        <div className="nav-toggle">
          <button
            className={selectedTab === "Offers" ? "active" : ""}
            onClick={() => setSelectedTab("Offers")}
          >
            Offers
          </button>
          <button
            className={selectedTab === "progress" ? "active" : ""}
            onClick={() => setSelectedTab("progress")}
          >
            In Progress
          </button>
          <button
            className={selectedTab === "completed" ? "active" : ""}
            onClick={() => setSelectedTab("completed")}
          >
            Completed
          </button>
        </div>

        <div className="row">
          <div className="fulltime-job-list">
            {jobs[selectedTab]?.length > 0 ? (
              jobs[selectedTab].map((job) => {
                const jobDetails = job.jobDetails || {};
                const postedBy = jobDetails.postedBy || {};

                return (
                  <div className="job-card" key={jobDetails._id}>
                    <Link to={`/dashboard/gigdetails/${jobDetails._id}`}>
                      <div className="job-card-header">
                        <img
                          src={person}
                          alt="Company Logo"
                          className="company-logo"
                        />
                        <div className="job-hr">
                          <h4 className="job-head">{postedBy.username || "HR Name"}</h4>
                          <div className="job-rating">
                            <span className="stars">★★★★☆</span>
                            <span className="rating-count">(25)</span>
                          </div>
                        </div>

                        <div className="job-meta">
                          <span className="job-date">{jobDetails.createdAt ? new Date(jobDetails.createdAt).toLocaleDateString() : "No Date"}</span>
                          <i className="save-icon">&#9734;</i>
                        </div>
                      </div>
                      <div className="job-info">
                        <h4 className="job-title">{jobDetails.jobTitle || "Job Title"}</h4>
                        <p>{jobDetails.description || "Job description not available"}</p>
                      </div>
                    </Link>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="job-amount">$ {jobDetails.budget || "N/A"}</span>
                      <button className="btn chat-button" onClick={()=>{
                        handleChat(jobDetails._id)}}>
                        <i className="bi bi-chat"></i> Chat
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No jobs found for the selected tab.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cusgigs;

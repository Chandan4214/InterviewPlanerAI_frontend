// import "../style/home.scss";
// const Home = () => {
//   return (
//     <main className="home">
//       <div className="interview-input-group">
//         <div className="left">
//           <label htmlFor="Job description">Job Description</label>
//           <textarea
//             name="jobDescription"
//             id="jobDescription"
//             cols="30"
//             rows="10"
//             placeholder="Job Description"
//           ></textarea>
//         </div>

//         <div className="right">
//           <div className="input-group">
//               <p>Resume <small className="highlight"> (Use Resume and self despription for best result) </small>  </p>
//             <label className="file-label" htmlFor="resume">Upload Resume</label>
//             <input
//               type="file"
//               id="resume"
//               hidden
//               name="resume"
//               accept=".pdf"
//             />
//           </div>
//           <div className="input-group">
          
//             <label htmlFor="selfDescription">Upload Self Description</label>
//             <textarea name="selfDescription" cols="30" rows="10" id="selfDescription"></textarea>
//           </div>
//           <button className="button primary-button">Generate Report</button>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Home;

// InterviewPlanGenerator.jsx
import React, { useState, useRef,useEffect } from 'react';
import "../style/home.scss";
import {useInterview} from "../hooks/useInterview"
import {useAuth} from "../../auth/hooks/useAuth"
import { useNavigate, Link } from 'react-router-dom';

const InterviewPlanGenerator = () => {

     const {generateReport, loading, reports, getReports} = useInterview();
     const {user} = useAuth();
     const [jobDescription, setJobDescription]=useState("");
     const [selfDescription, setSelfDescription]=useState("");
     const [showProfileCard, setShowProfileCard] = useState(false);

     const resumeInputRef = useRef(null);
     const navigate = useNavigate();

     // Fetch all reports on component mount
     useEffect(() => {
       getReports();
     }, []);
     const handleGenerateReport = async () => {
  const resumeFile = resumeInputRef.current.files[0];

  if (!resumeFile) {
    alert("Please upload resume");
    return;
  }

  if (!jobDescription || !selfDescription) {
    alert("Please fill all fields");
    return;
  }

  const res = await generateReport({
    resumeFile,
    selfDescription,
    jobDescription,
  });

  console.log("FINAL RESPONSE:", res);

  if (!res?._id) {
    alert("Backend did not return ID");
    return;
  }

  navigate(`/interview/${res._id}`);
};




  const [uploadedFileName, setUploadedFileName] = useState('John_Doe_CV_2024.pdf');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFileName(file.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = () => {
    setUploadedFileName(null);
  };
  if (loading){
    return   <div className='loading-screen'>
      <h1>Loading your interview plan</h1>
    </div>
  }






  return (
    <div className="interview-plan-app">
      {/* ==================== DESKTOP HEADER ==================== */}
      <header className="desktop-header">
        <div className="logo">
          <span className="logo-icon">✦</span> InterviewPlanerAI
        </div>
        {/* <nav className="nav-links">
          <a href="#">Dashboard</a>
          <a href="#" className="active">Plans</a>
          <a href="#">History</a>
          <a href="#">Settings</a>
        </nav> */}
        <div className="header-right">
          <button className="icon-btn">🛎️</button>
          <div className="profile" onClick={() => setShowProfileCard(!showProfileCard)}>
            <span className="profile-icon">👤</span>
            <div className="profile-info">
              <p className="username">{user?.username || 'User'}</p>
            </div>
          </div>
        </div>
      </header>

      {/* ==================== MOBILE HEADER ==================== */}
      <header className="mobile-header">
        <button className="back-btn">←</button>
        <div className="mobile-title">Interview Planner</div>
        <button className="more-btn">⋯</button>
      </header>

      <main className="main">
        <div className="content-wrapper">
          {/* Top Title Section */}
          <div className="plan-header">
            <div className="plan-title">
              <span className="title-icon">✦</span>
              Create your custom interview plan
            </div>
            <p className="subtitle">
              Fill in the details below. Our AI will analyze the requirements and your profile to generate a tailored preparation report.
            </p>
            <button className="view-guides-btn">View Guides</button>
          </div>

          {/* Responsive Form Grid */}
          <div className="form-grid">
            {/* LEFT COLUMN - Job + Self Description */}
            <div className="left-column">
              {/* Job Description */}
              <div className="card job-description">
                <div className="card-header">
                  <span className="section-icon">📋</span>
                  Job Description
                </div>
                <textarea
                  className="input-textarea"
                    onChange={(e)=>setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here... include responsibilities, requirements, and company culture if possible."
                  rows="8"
                />
                <div className="recommendation">Recommended: 500+ words</div>
              </div>

              {/* Self Description */}
              <div className="card self-description">
                <div className="card-header">
                  <span className="section-icon">👤</span>
                  Self Description
                </div>
                <textarea
                  className="input-textarea"
                  onChange={(e)=>setSelfDescription(e.target.value)}
                  placeholder="Tell us about your strengths, key projects, and what you want to highlight for this specific role."
                  rows="6"
                />
              </div>
            </div>

            {/* RIGHT COLUMN - Resume + Ready + Pro Tip */}
            <div className="right-column">
              {/* Resume Upload */}
              <div className="card resume-card">
                <div className="card-header">
                  <span className="section-icon">📄</span>
                  Resume
                </div>

                {/* Drag & Drop Zone */}
                <div
                  className={`upload-zone ${isDragging ? 'dragging' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    ref={resumeInputRef}
                    id="resume-upload"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                    hidden
                  />
                  <label htmlFor="resume-upload" className="upload-label">
                    <div className="upload-icon">☁️</div>
                    <p>Click to upload or drag &amp; drop</p>
                    <small>PDF, DOCX up to 5MB</small>
                  </label>
                </div>

                {/* Uploaded File (matches screenshot) */}
                {uploadedFileName && (
                  <div className="uploaded-file">
                    <div className="file-info">
                      <span className="file-icon">📄</span>
                      <div>
                        <p className="file-name">{uploadedFileName}</p>
                        <small>UPLOADED 2 HOURS AGO</small>
                      </div>
                    </div>
                    <button className="delete-btn" onClick={removeFile}>🗑️</button>
                  </div>
                )}
              </div>

              {/* Ready to Analyze */}
              <div className="card ready-card">
                <div className="ready-header">Ready to analyze?</div>
                <p className="ready-desc">
                  Our engine will generate 10+ behavioral questions, 5 technical challenges, and a preparation checklist.
                </p>
                <ul className="features-list">
                  <li><span className="check">✅</span> AI-powered keyword matching</li>
                  <li><span className="check">✅</span> Mock interview script</li>
                  <li><span className="check">✅</span> Company culture insights</li>
                </ul>
                <button 
                onClick={handleGenerateReport}
                 className="generate-report-btn">
                  <span>✦</span> Generate Report
                </button>
              </div>

              {/* Pro Tip */}
              <div className="card pro-tip-card">
                <div className="tip-header">
                  <span className="tip-icon">💡</span>
                  Pro Tip
                </div>
                <p>For better results, include the salary range and location from the job posting in your description.</p>
              </div>
            </div>
          </div>
        </div>
      </main>


      {/*  USER PROFILE CARD MODAL */}
      {showProfileCard && (
        <div className='profile-modal-overlay' onClick={() => setShowProfileCard(false)}>
          <div className='profile-modal' onClick={(e) => e.stopPropagation()}>
            <button className='modal-close-btn' onClick={() => setShowProfileCard(false)}>✕</button>
            <div className='profile-card'>
              <div className='profile-avatar'>
                <span>👤</span>
              </div>
              <div className='profile-details'>
                <h3 className='profile-username'>{user?.username || 'User'}</h3>
                <p className='profile-email'>{user?.email || 'user@example.com'}</p>
                <div className='profile-stats'>
                  <div className='stat'>
                    <span className='stat-number'>{reports.length}</span>
                    <span className='stat-label'>Reports</span>
                  </div>
                  <div className='stat'>
                    <span className='stat-number'>90%</span>
                    <span className='stat-label'>Avg Score</span>
                  </div>
                </div>
              </div>
              <div className='profile-action'>
                <button className='edit-profile-btn'>✏️</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/*  recent report list*/}
      {
        reports.length > 0 && (
          <section className='recent-reports'>
            <h2>My Recent Reports Plans</h2>
             <ul className='recent-reports-list'>

              {
                reports.map((report) => {
                  const formattedDate = new Date(report.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  });
                  
                  return (
                    <li key={report._id}>
                      <Link to={`/interview/${report._id}`} className="report-card">
                        <h3 className="report-title">{report.tittle || 'Interview Report'}</h3>
                        <span className="report-date">{formattedDate}</span>
                      </Link>
                    </li>
                  );
                })
              }
             </ul>
          </section>
        )
      }

        

      {/* MOBILE BOTTOM NAV (matches mobile screenshot) */}
      <nav className="mobile-bottom-nav">
        <a href="#" className="nav-item">
          <span>🏠</span>
          <span className="label">HOME</span>
        </a>
        <a href="#" className="nav-item active">
          <span>📋</span>
          <span className="label">PLANS</span>
        </a>
        <a href="#" className="nav-item">
          <span>📊</span>
          <span className="label">REPORTS</span>
        </a>
        <button 
          onClick={() => setShowProfileCard(!showProfileCard)}
          className="nav-item"
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
        >
          <span>👤</span>
          <span className="label">PROFILE</span>
        </button>
      </nav>
    </div>
  );
};

export default InterviewPlanGenerator;
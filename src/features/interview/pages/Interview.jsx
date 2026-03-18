import React, { useState, useEffect} from 'react';
import "../style/interview.scss";
import { useInterview } from '../hooks/useInterview';
import { useParams } from 'react-router-dom';
const Interview = () => {
  const [activeSection, setActiveSection] = useState("roadMap");
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const { report, getReportById, loading } = useInterview();
  const { interviewId } = useParams();
  console.log("reportId-------------", interviewId)

  // ✅ FETCH REPORT BY ID
  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  // ✅ LOADING STATE
  if (loading) {
    return (
      <div className="loading-screen">
        Loading your interview plan...
      </div>
    );
  }
  return (
    <div className="interview-report-app">
      <div className="report-container">
        {/* ==================== LEFT SIDEBAR ==================== */}
        <aside className="sidebar">
          <div className="sidebar-title">SECTIONS</div>
          <nav className="section-nav">
            <button
              className={`section-btn ${activeSection === 'technical' ? 'active' : ''}`}
              onClick={() => setActiveSection('technical')}
            >
              <span className="icon">💻</span>
              Technical Questions
            </button>
            <button
              className={`section-btn ${activeSection === 'behavioral' ? 'active' : ''}`}
              onClick={() => setActiveSection('behavioral')}
            >
              <span className="icon">🎯</span>
              Behavioral Questions
            </button>
            <button
              className={`section-btn ${activeSection === 'roadMap' ? 'active' : ''}`}
              onClick={() => setActiveSection('roadMap')}
            >
              <span className="icon">🗺️</span>
              Road Map
            </button>
          </nav>
        </aside>

        {/* ==================== CENTER CONTENT ==================== */}
        <main className="timeline-main">
          {/* ========== TECHNICAL QUESTIONS SECTION ========== */}
          {activeSection === 'technical' && (
            <div className="questions-section">
              <div className="section-header">
                <h1 className="section-title">💻 Technical Questions</h1>
                <p className="section-subtitle">{report.technicalQuestions.length} questions to prepare</p>
              </div>

              <div className="questions-list">
                {report.technicalQuestions.map((q, index) => (
                  <div key={index} className="question-card">
                    <button
                      className={`question-header ${expandedQuestion === `tech-${index}` ? 'expanded' : ''}`}
                      onClick={() => setExpandedQuestion(expandedQuestion === `tech-${index}` ? null : `tech-${index}`)}
                    >
                      <div className="question-number">Q{index + 1}</div>
                      <div className="question-title">{q.question}</div>
                      <div className="expand-icon">{expandedQuestion === `tech-${index}` ? '▼' : '▶'}</div>
                    </button>

                    {expandedQuestion === `tech-${index}` && (
                      <div className="question-content">
                        <div className="content-section">
                          <div className="section-label">Intention:</div>
                          <p className="section-text">{q.intension}</p>
                        </div>
                        <div className="content-section">
                          <div className="section-label">Answer:</div>
                          <p className="section-text">{q.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========== BEHAVIORAL QUESTIONS SECTION ========== */}
          {activeSection === 'behavioral' && (
            <div className="questions-section">
              <div className="section-header">
                <h1 className="section-title">🎯 Behavioral Questions</h1>
                <p className="section-subtitle">{report.behavioralQuestions.length} questions to prepare</p>
              </div>

              <div className="questions-list">
                {report.behavioralQuestions.map((q, index) => (
                  <div key={index} className="question-card">
                    <button
                      className={`question-header ${expandedQuestion === `behav-${index}` ? 'expanded' : ''}`}
                      onClick={() => setExpandedQuestion(expandedQuestion === `behav-${index}` ? null : `behav-${index}`)}
                    >
                      <div className="question-number">Q{index + 1}</div>
                      <div className="question-title">{q.question}</div>
                      <div className="expand-icon">{expandedQuestion === `behav-${index}` ? '▼' : '▶'}</div>
                    </button>

                    {expandedQuestion === `behav-${index}` && (
                      <div className="question-content">
                        <div className="content-section">
                          <div className="section-label">Intention:</div>
                          <p className="section-text">{q.intension}</p>
                        </div>
                        <div className="content-section">
                          <div className="section-label">Answer:</div>
                          <p className="section-text">{q.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========== ROAD MAP SECTION ========== */}
          {activeSection === 'roadMap' && (
            <>
              <div className="timeline-header">
                <div>
                  <h1 className="timeline-title">Preparation Road Map</h1>
                  <p className="timeline-subtitle">7-day plan</p>
                </div>
              </div>

              <div className="timeline">
                {report.preparationPlan?.map((plan, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker">
                      <div className="marker-node"></div>
                    </div>
                    <div className="timeline-content-group">
                      <div className="day-header">
                        <span className="day-badge">Day {plan.day}</span>
                        <h3 className="day-title">{plan.focus}</h3>
                      </div>
                      <ul className="day-tasks">
                        {plan.tasks.map((task, taskIdx) => (
                          <li key={taskIdx} className="task">• {task}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>

        {/* ==================== RIGHT SIDEBAR: SCORE & SKILLS ==================== */}
        <aside className="skills-sidebar">
          <div className="match-score-container">
            <div className="match-score-circle">
              <div className="score-progress"></div>
              <div className="score-inner">
                <span className="score-value">{report.matchScore}</span>
              </div>
            </div>
            <p className="score-label">Strong match for this role</p>
          </div>

          <div className="skills-list">
            <div className="skill-card">
              <span className="skill-label">Message Queues</span>
              <span className="skill-tech">(Kafka/RabbitMQ)</span>
            </div>
            <div className="skill-card">
              <span className="skill-label">Advanced Docker & CI/CD</span>
              <span className="skill-tech">Pipelines</span>
            </div>
            <div className="skill-card">
              <span className="skill-label">Distributed Systems</span>
              <span className="skill-tech">Design</span>
            </div>
            <div className="skill-card">
              <span className="skill-label">Production-level Redis</span>
              <span className="skill-tech">management</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Interview;

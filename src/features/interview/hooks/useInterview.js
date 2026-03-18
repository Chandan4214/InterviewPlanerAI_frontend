// import {
//   generateInterviewReport,
//   getAllinterviews,
//   getInterviewById,
// } from "../services/interview.api";

// import { useContext } from "react";
// import { InterviewContext } from "../interview.context";

// export const useInterview = () => {
//   const context = useContext(InterviewContext);
//   if (!context) {
//     throw new Error("useInterview must be used within a InterviewProvider");
//   }

//   const { loading, setloading, report, setReport, reports, setReports } =
//     context;

//   // const generateReport = async ({
//   //   resumeFile,
//   //   selfDescription,
//   //   jobDescription,
//   // }) => {
//   //   setloading(true);
//   //   try {
//   //     const response = await generateInterviewReport({
//   //       resumeFile,
//   //       selfDescription,
//   //       jobDescription,
//   //     });
//   //     setReport(response);
//   //     return response;
//   //   } catch (error) {
//   //     console.error("Login failed:", error);
//   //   } finally {
//   //     setloading(false);
//   //   }
//   // };



//   const generateReport = async ({ resumeFile, selfDescription, jobDescription }) => {
//   setloading(true);
//   try {
//     const response = await generateInterviewReport({
//       resumeFile,
//       selfDescription,
//       jobDescription,
//     });

//     setReport(response.report); // ✅ store only report
//     return response.report;     // ✅ return clean data
//   } catch (error) {
//     console.error("Generate report failed:", error);
//   } finally {
//     setloading(false);
//   }
// };

// const getReportById = async (id) => {
//   setloading(true);
//   try {
//     const response = await getInterviewById(id);
//     setReport(response);
//   } catch(error) {
//     console.error(error)
//   } finally {
//     setloading(false);
//   }
// };

// const getReports = async () => {
//   setloading(true);
//   try {
//     const response = await getAllinterviews();
//     setReports(response.interviewReports);
//   } catch {
//     console.error(error)
//   } finally {
//     setloading(false);
//   }
// };



// return {generateReport, report, reports,loading, getReportById, getReports};

// };







import {
  generateInterviewReport,
  getAllinterviews,
  getInterviewById,
} from "../services/interview.api";

import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router-dom";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { id } = useParams(); // ✅ get id from URL

  if (!context) {
    throw new Error("useInterview must be used within a InterviewProvider");
  }

  const {
    loading,
    setLoading,
    report,
    setReport,
    reports,
    setReports,
  } = context;

  // ✅ Get Report By ID
  const getReportById = async (id) => {
    if (!id) return;

    setLoading(true);
    try {
      const reportData = await getInterviewById(id);

      if (!reportData?._id) {
        console.error("Invalid report:", reportData);
        return;
      }

      setReport(reportData);
    } catch (error) {
      console.error("Fetch report failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Auto fetch based on route
  useEffect(() => {
    if (id) {
      getReportById(id);
    }
  }, [id]);

  // ✅ Generate Report
  const generateReport = async ({
    resumeFile,
    selfDescription,
    jobDescription,
  }) => {
    setLoading(true);
    try {
      const reportData = await generateInterviewReport({
        resumeFile,
        selfDescription,
        jobDescription,
      });

      if (!reportData?._id) {
        console.error("Invalid report returned:", reportData);
        return null;
      }

      setReport(reportData);
      return reportData;
    } catch (error) {
      console.error("Generate report failed:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Get All Reports
  const getReports = async () => {
    setLoading(true);
    try {
      const reportsData = await getAllinterviews();
      if (Array.isArray(reportsData)) {
        setReports(reportsData);
      } else {
        console.error("Invalid reports data:", reportsData);
        setReports([]);
      }
    } catch (error) {
      console.error("Fetch reports failed:", error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    report,
    reports,
    loading,
    getReportById,
    generateReport,
    getReports,
  };
};
// import {createContext, useState} from "react";

// export const InterviewContext=createContext({})

// export const InterviewProvider=({children})=>{

//   const[loading,setloading]=useState(false)
//   const [report, setReport] = useState({
//   technicalQuestions: [],
//   behavioralQuestions: [],
//   preparationPlan: [],
//   matchScore: 0
// });
//   const [reports,setReports]=useState([]);
//   return (
//     <InterviewContext.Provider value={{loading,setloading,report, setReport,reports,setReports}}> {children} </InterviewContext.Provider>
//   )
  
// }


import { createContext, useState } from "react";

// ✅ safer default
export const InterviewContext = createContext(null);

const initialReport = {
  technicalQuestions: [],
  behavioralQuestions: [],
  preparationPlan: [],
  matchScore: 0,
};

export const InterviewProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [report, setReport] = useState(initialReport);
  const [reports, setReports] = useState([]);

  const [error, setError] = useState(null);

  // ✅ reset single report
  const resetReport = () => {
    setReport(initialReport);
  };

  // ✅ clear error
  const clearError = () => {
    setError(null);
  };

  return (
    <InterviewContext.Provider
      value={{
        loading,
        setLoading,

        report,
        setReport,
        resetReport,

        reports,
        setReports,

        error,
        setError,
        clearError,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};
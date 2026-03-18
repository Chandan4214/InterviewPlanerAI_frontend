// import axios from "axios";
// const api=axios.create({
//   baseURL:"http://localhost:5000",
//   withCredentials:true
// })




// export const generateInterviewReport=async({resumeFile,selfDescription,jobDescription})=>{

//   const formData=new FormData()
//   formData.append("resume",resumeFile)
//   formData.append("selfDescription",selfDescription)
//   formData.append("jobDescription",jobDescription)
//   const response=await api.post("/api/interview/generateReport",formData,{
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   })

//     return response.data
  
// }


// export const getInterviewById=async(interviewId)=>{

//   const response=await api.get(`/api/interview/${interviewId}`)

//     return response.data
  
// }


// export const getAllinterviews=async()=>{

//   const response = await api.get(`/api/interview/getReport`);
//   return response.data
// }



import axios from "axios";

const api = axios.create({
  baseURL: "https://interviewplanerai-backend-2.onrender.com",
  withCredentials: true,
});

// ✅ GENERATE REPORT
export const generateInterviewReport = async ({
  resumeFile,
  selfDescription,
  jobDescription,
}) => {
  const formData = new FormData();
  formData.append("resume", resumeFile);
  formData.append("selfDescription", selfDescription);
  formData.append("jobDescription", jobDescription);

  const response = await api.post(
    "/api/interview/generateReport",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  console.log("GENERATE API:", response.data);

  // ✅ handle both formats
  return response.data.report || response.data;
};

// ✅ GET REPORT BY ID
export const getInterviewById = async (interviewId) => {
  const response = await api.get(`/api/interview/getReport/${interviewId}`);

  console.log("GET REPORT API:", response.data);

  // ✅ handle both formats
  return response.data.report || response.data;
};

// ✅ GET ALL REPORTS
export const getAllinterviews = async () => {
  const response = await api.get(`/api/interview/getReport`);

  console.log("GET ALL API:", response.data);

  // ✅ handle multiple backend formats
  return (
    response.data.reports ||
    response.data.interviewReports ||
    response.data ||
    []
  );
};
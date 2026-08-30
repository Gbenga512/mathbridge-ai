import{getExamDashboardData,getExamTrend}from'./examReportDashboard';
import{getRevisionPlan}from'./waecNecoPracticePlan';
export const buildStudentExamDashboard=()=>{const data=getExamDashboardData();return{...data,trend:getExamTrend(),revisionPlan:getRevisionPlan(data.weakTopics)}};

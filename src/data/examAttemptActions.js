import{submitExam}from'./examEngine';
import{buildExamReport}from'./examResults';
import{saveExamReport}from'./examReportStorage';
export const finalizeExamAttempt=(session)=>{const raw=submitExam({id:session.id||`exam-${Date.now()}`,questions:session.questions},session.answers);const report=buildExamReport(raw);saveExamReport(report);return report};

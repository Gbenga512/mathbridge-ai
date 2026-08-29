// Primary 1 teacher assignment access policy.
export const createPrimary1TeacherAssignment=(teacherId,classId)=>({teacherId:String(teacherId),classId:String(classId),level:'Primary',className:'Primary 1',active:true,createdAt:new Date().toISOString()});
export const teacherCanAccessPrimary1Class=(assignment,teacherId,classId)=>Boolean(assignment?.active&&assignment.teacherId===String(teacherId)&&assignment.classId===String(classId)&&assignment.className==='Primary 1');

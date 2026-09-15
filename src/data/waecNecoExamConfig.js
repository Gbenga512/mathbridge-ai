export const WAEC_NECO_EXAM_CONFIG={WAEC:{label:'WAEC Mathematics',durationMinutes:150,questionCount:50},NECO:{label:'NECO Mathematics',durationMinutes:150,questionCount:50},JAMB:{label:'JAMB UTME Mathematics Practice',durationMinutes:90,questionCount:50}};
export const createExamConfig=(exam='WAEC')=>WAEC_NECO_EXAM_CONFIG[exam]||WAEC_NECO_EXAM_CONFIG.WAEC;

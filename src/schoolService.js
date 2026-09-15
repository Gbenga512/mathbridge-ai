import { supabase, supabaseConfigured } from './supabaseClient';

const fail = message => ({ ok: false, error: new Error(message) });
const requireCloud = () => supabaseConfigured && supabase;

export const SCHOOL_SECTIONS = ['PRIMARY', 'JSS', 'SSS'];
export const SECTION_LEVELS = {
  PRIMARY: ['P1','P2','P3','P4','P5','P6'],
  JSS: ['JSS1','JSS2','JSS3'],
  SSS: ['SSS1','SSS2','SSS3']
};

export async function getCurrentUser() {
  if (!requireCloud()) return { user: null, error: null };
  return await supabase.auth.getUser();
}

export async function createSchoolAccount({ schoolName, schoolCode, sections, adminUserId }) {
  if (!requireCloud()) return fail('Cloud account services are not configured.');
  if (!schoolName?.trim() || !schoolCode?.trim()) return fail('School name and school code are required.');
  const cleanSections = [...new Set(sections)].filter(x => SCHOOL_SECTIONS.includes(x));
  if (!cleanSections.length) return fail('Select at least one school section.');

  const { data: school, error } = await supabase
    .from('schools')
    .insert({ name: schoolName.trim(), school_code: schoolCode.trim().toUpperCase(), enabled_sections: cleanSections })
    .select('*')
    .single();
  if (error) return { ok: false, error };

  const { error: staffError } = await supabase.from('school_staff').insert({
    school_id: school.id,
    user_id: adminUserId,
    role: 'school_admin'
  });
  if (staffError) return { ok: false, error: staffError };

  return { ok: true, school };
}

export async function getMySchools(userId) {
  if (!requireCloud() || !userId) return { data: [], error: null };
  const { data, error } = await supabase
    .from('school_staff')
    .select('role, schools(*)')
    .eq('user_id', userId);
  return { data: (data || []).map(row => ({ ...row.schools, staffRole: row.role })), error };
}

export async function getSchoolOverview(schoolId) {
  if (!requireCloud() || !schoolId) return fail('School context is required.');
  const [school, classes, staff, enrollments, subscriptions] = await Promise.all([
    supabase.from('schools').select('*').eq('id', schoolId).single(),
    supabase.from('school_classes').select('*').eq('school_id', schoolId).order('class_name'),
    supabase.from('school_staff').select('user_id,role,created_at').eq('school_id', schoolId),
    supabase.from('school_enrollments').select('id,student_id,class_id,status,sponsored_until,enrolled_at,ended_at').eq('school_id', schoolId),
    supabase.from('school_subscriptions').select('*').eq('school_id', schoolId).order('starts_at', { ascending: false })
  ]);
  const error = school.error || classes.error || staff.error || enrollments.error || subscriptions.error;
  return { ok: !error, error, school: school.data, classes: classes.data || [], staff: staff.data || [], enrollments: enrollments.data || [], subscriptions: subscriptions.data || [] };
}

export async function createSchoolClasses(schoolId, levels) {
  if (!requireCloud()) return fail('Cloud account services are not configured.');
  const rows = levels.map(className => ({ school_id: schoolId, class_name: className }));
  if (!rows.length) return { ok: true, data: [] };
  const { data, error } = await supabase.from('school_classes').upsert(rows, { onConflict: 'school_id,class_name' }).select('*');
  return { ok: !error, data: data || [], error };
}

export async function removeStudentFromSchool(enrollmentId) {
  if (!requireCloud()) return fail('Cloud account services are not configured.');
  const { data, error } = await supabase.rpc('remove_student_from_school', { p_enrollment_id: enrollmentId });
  return { ok: !error, data, error };
}

export async function enrollStudent({ schoolId, studentId, classId, sponsoredUntil = null }) {
  if (!requireCloud()) return fail('Cloud account services are not configured.');
  const { data, error } = await supabase.rpc('enroll_student_in_school', {
    p_school_id: schoolId,
    p_student_id: studentId,
    p_class_id: classId || null,
    p_sponsored_until: sponsoredUntil
  });
  return { ok: !error, data, error };
}

export async function createSchoolSubscription({ schoolId, seatLimit, startsAt = null, endsAt = null }) {
  if (!requireCloud()) return fail('Cloud account services are not configured.');
  const { data, error } = await supabase.from('school_subscriptions').insert({
    school_id: schoolId,
    seat_limit: Number(seatLimit),
    status: 'active',
    starts_at: startsAt || new Date().toISOString(),
    ends_at: endsAt
  }).select('*').single();
  return { ok: !error, data, error };
}

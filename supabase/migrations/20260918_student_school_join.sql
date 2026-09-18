create or replace function public.get_school_join_options(p_school_code text)
returns jsonb
language plpgsql
security definer
set search_path=public
as $$
declare v_school public.schools%rowtype; v_classes jsonb;
begin
 if not exists(select 1 from public.profiles where id=auth.uid() and role='student') then
   raise exception 'Only student accounts can join a school';
 end if;
 select * into v_school from public.schools where upper(school_code)=upper(trim(p_school_code)) limit 1;
 if v_school.id is null then raise exception 'School code not found'; end if;
 select coalesce(jsonb_agg(jsonb_build_object('id',c.id,'class_name',c.class_name,'class_level',c.class_level,'stream',c.stream) order by c.class_name),'[]'::jsonb)
 into v_classes from public.school_classes c where c.school_id=v_school.id;
 return jsonb_build_object('school_id',v_school.id,'school_name',v_school.name,'school_code',v_school.school_code,'classes',v_classes);
end;
$$;

create or replace function public.join_school_by_code(p_school_code text,p_class_id uuid)
returns uuid
language plpgsql
security definer
set search_path=public
as $$
declare v_school_id uuid; v_seats integer; v_used integer; v_id uuid;
begin
 if not exists(select 1 from public.profiles where id=auth.uid() and role='student') then
   raise exception 'Only student accounts can join a school';
 end if;
 select id into v_school_id from public.schools where upper(school_code)=upper(trim(p_school_code)) limit 1;
 if v_school_id is null then raise exception 'School code not found'; end if;
 if p_class_id is null or not exists(select 1 from public.school_classes where id=p_class_id and school_id=v_school_id) then
   raise exception 'Please select a valid class';
 end if;
 select coalesce(sum(seat_limit),0) into v_seats from public.school_subscriptions
 where school_id=v_school_id and status='active' and starts_at<=now() and (ends_at is null or ends_at>=now());
 if v_seats<1 then raise exception 'This school does not have an active subscription'; end if;
 select count(*) into v_used from public.school_enrollments
 where school_id=v_school_id and status='active' and (sponsored_until is null or sponsored_until>=now());
 if v_used>=v_seats and not exists(select 1 from public.school_enrollments where school_id=v_school_id and student_id=auth.uid() and status='active') then
   raise exception 'This school has no available student seats';
 end if;
 insert into public.school_enrollments(school_id,student_id,class_id,status)
 values(v_school_id,auth.uid(),p_class_id,'active')
 on conflict(school_id,student_id) do update set class_id=excluded.class_id,status='active',enrolled_at=now(),ended_at=null
 returning id into v_id;
 return v_id;
end;
$$;
grant execute on function public.get_school_join_options(text) to authenticated;
grant execute on function public.join_school_by_code(text,uuid) to authenticated;
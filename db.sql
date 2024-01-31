create table if not exists
  message (
    id BIGSERIAL not null,
    profile_id uuid not null,
    message varchar(255) not null,
    is_chatgpt boolean not null,
    is_routine boolean not null,
    timestamp timestamp not null default current_timestamp,
    primary key (id),
    foreign key (profile_id) references profiles (id) on update cascade on delete cascade
  );

create table if not exists
  routine (
    id BIGSERIAL not null,
    profile_id uuid not null,
    routine_name varchar(100) not null,
    json JSON,
    primary key (id),
    foreign key (profile_id) references profiles (id) on update cascade on delete cascade
  );

create table if not exists 
    appliance_type (
        id BIGSERIAL not null,
        type varchar(100) not null,
        primary key (id)
    );

create table if not exists
  appliance (
    id BIGSERIAL not null,
    profile_id uuid not null,
    appliance_name varchar(100) not null,
    brand varchar(100),
    avg_consumption float,
    appliance_type int not null,
    room varchar(100),
    primary key (id),
    foreign key (profile_id) references profiles (id) on update cascade on delete cascade,
    foreign key (appliance_type) references appliance_type (id) on update cascade on delete cascade
  );

INSERT INTO appliance_type (id, type) VALUES
  (1, 'Thermostat'),
  (2, 'Lightbulb'),
  (3, 'Switch'),
  (4, 'Plug'),
  (5, 'Lock'),
  (6, 'Speaker'),
  (7, 'Smart TV'),
  (8, 'Microwave'),
  (9, 'Oven'),
  (10, 'Smart Vacuum Cleaner'),
  (11, 'Air Conditioner'),
  (12, 'Dishwasher'),
  (13, 'Washing Machine'),
  (14, 'Dryer');



-- Trigger for linking authentication.
-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.

-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  homeassistant_key varchar(255),
  homeassistant_url varchar(255)

  constraint username_length check (char_length(username) >= 3)
);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

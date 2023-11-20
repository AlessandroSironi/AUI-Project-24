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
    product_name varchar(100),
    power_consumption float,
    appliance_type int not null,
    room varchar(100),
    primary key (id),
    foreign key (profile_id) references profiles (id) on update cascade on delete cascade,
    foreign key (appliance_type) references appliance_type (id) on update cascade on delete cascade
  );



/* /* Create user table */
/* CREATE TABLE IF NOT EXISTS user (
  id int NOT NULL SERIAL,
  name varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  ifttt_key varchar(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
); */

/* Create message table */
CREATE TABLE IF NOT EXISTS message (
  id int NOT NULL SERIAL,
  profile_id int NOT NULL,
  message varchar(255) NOT NULL,
  is_chatgpt boolean NOT NULL,
  is_routine boolean NOT NULL,
  timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE
);

/* Create routine table */
CREATE TABLE IF NOT EXISTS routine (
    id int NOT NULL SERIAL,
    profile_id int NOT NULL,
    routine_name varchar(100) NOT NULL,
    json JSON, 
    PRIMARY KEY (id),
    FOREIGN KEY (profile_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE
);

/* Create appliance type table */
CREATE TABLE IF NOT EXISTS appliance_type (
    id int NOT NULL SERIAL,
    appliance_type varchar(100) NOT NULL,
    PRIMARY KEY (id)
);

/* Create appliance table */
CREATE TABLE IF NOT EXISTS appliance (
    id int NOT NULL SERIAL,
    profile_id int NOT NULL,
    appliance_name varchar(100) NOT NULL,
    appliance_type varchar(100) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (profile_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (appliance_type) REFERENCES applicance_type(appliance_type) ON UPDATE CASCADE ON DELETE CASCADE
); */
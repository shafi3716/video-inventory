create table user (
    id bigint auto_increment primary key,
    username varchar(50) not null unique,
    password varchar(255) not null,
    role varchar(20) not null
);
create table video (
    id bigint auto_increment primary key,
    title varchar(255) not null,
    description text,
    video_url varchar(255) not null,
    assigned_to_user_id bigint,
    constraint fk_assigned_user foreign key (assigned_to_user_id) references user(id)
);

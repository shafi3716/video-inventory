create table activity_log (
    id bigint auto_increment primary key,
    user_id bigint not null,
    video_id bigint not null,
    action varchar(20) not null,
    timestamp timestamp default current_timestamp,
    constraint fk_activity_user foreign key (user_id) references user(id) on delete cascade,
    constraint fk_activity_video foreign key (video_id) references video(id) on delete cascade
);

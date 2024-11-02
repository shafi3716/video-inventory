create table activity_log (
    id bigint auto_increment primary key,
    userId bigint not null,
    videoId bigint not null,
    action varchar(20) not null,
    timestamp timestamp default current_timestamp,
    constraint fk_activity_user foreign key (userId) references user(id) on delete cascade,
    constraint fk_activity_video foreign key (videoId) references video(id) on delete cascade
);

create table video (
    id bigint auto_increment primary key,
    title varchar(255) not null,
    description text,
    videoUrl varchar(255) not null,
    assignedToUserId bigint,
    constraint fk_assigned_user foreign key (assignedToUserId) references user(id)
);

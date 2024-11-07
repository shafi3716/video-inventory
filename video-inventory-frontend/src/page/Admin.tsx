/**
 * @Author: Abdullah Al Shafi
 * @Date:   2024-11-04 21:59:31
 * @Last Modified by:   Abdullah Al Shafi
 * @Last Modified time: 2024-11-07 17:24:16
 */
import {useEffect, useState} from "react";
import EditVideoModal from "../components/EditVideoModal";
import Navbar from "../components/Navbar";
import VideoAddForm from "../components/VideoAddForm";
import VideoPlayer from "../components/VideoPlayer";
import api from "../helpers/api";
import LocalStorageService from "../helpers/LocalStorageService";

const Admin = () => {
    const [videos, setVideos] = useState<any>();
    const [refresh, setRefresh] = useState<boolean>(false);
    const [selectedVideo, setSelectedVideo] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [users, setUsers] = useState<any>(null);

    useEffect(() => {
        api.get("/videos/get-users", {
            headers: {
                Authorization: `Bearer ${LocalStorageService.getToken()}`,
            },
        })
            .then((response) => {
                console.log(response.data);
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });

        api.get("/videos", {
            headers: {
                Authorization: `Bearer ${LocalStorageService.getToken()}`,
            },
        })
            .then((response) => {
                console.log(response.data);
                setVideos(response.data);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }, [refresh]);

    const handleDelete = (videoId: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this video?"
        );
        if (confirmed) {
            api.delete(`/videos/${videoId}`, {
                headers: {
                    Authorization: `Bearer ${LocalStorageService.getToken()}`,
                },
            })
                .then((response) => {
                    setRefresh(!refresh);
                })
                .catch((error) => {
                    console.error("There was an error!", error);
                });
        }
    };

    const handleOpenPopUp = (video: any) => {
        setSelectedVideo(video);
        setIsModalOpen(true);
    };

    const onClosed = () => {
        setIsModalOpen(false);
        setRefresh(!refresh);
    };

    return (
        <div>
            <Navbar></Navbar>
            <div className='p-10'>
                <div>
                    <VideoAddForm
                        addNewCallback={() => setRefresh(!refresh)}
                        users={users}
                    />
                </div>
                <div className='flex justify-between mt-10 mb-4'>
                    <h1 className='text-lg font-semibold'>Video list:</h1>
                </div>
                <div className='container mx-auto p-4 bg-gray-200 rounded-lg'>
                    <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        {videos?.map((video: any) => (
                            <div
                                key={video.id}
                                className='bg-white rounded-lg shadow-md p-6'
                            >
                                <h2 className='text-xl font-semibold mb-2'>
                                    {video.title}
                                </h2>
                                <p className='text-gray-600'>
                                    {video.description}
                                </p>
                                <p className='py-1 text-gray-600'>
                                    Assigned User:{" "}
                                    {video?.assignedToUser?.username}
                                </p>
                                <VideoPlayer
                                    videoUrl={video.videoUrl}
                                    videoId={video.id}
                                    userId={video?.assignedToUser?.id}
                                    type='ADMIN'
                                ></VideoPlayer>
                                <div className='flex justify-between'>
                                    <button
                                        className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition'
                                        onClick={() => handleOpenPopUp(video)}
                                    >
                                        Update & Assign
                                    </button>
                                    <button
                                        className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition'
                                        onClick={() => handleDelete(video.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <EditVideoModal
                    isOpen={isModalOpen}
                    onClose={() => onClosed()}
                    video={selectedVideo}
                    users={users}
                />
            )}
        </div>
    );
};

export default Admin;

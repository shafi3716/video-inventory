/**
 * @Author: Abdullah Al Shafi
 * @Date:   2024-11-04 22:01:52
 * @Last Modified by:   Abdullah Al Shafi
 * @Last Modified time: 2024-11-07 17:24:22
 */
import {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import VideoPlayer from "../components/VideoPlayer";
import api from "../helpers/api";
import LocalStorageService from "../helpers/LocalStorageService";

const User = () => {
    const [videos, setVideos] = useState<any>([]);

    useEffect(() => {
        const token = LocalStorageService.getTokenInfo();
        console.log("token", token);

        api.get("/videos?userId=2", {
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
    }, []);

    return (
        <div>
            <Navbar></Navbar>
            <div className='p-10'>
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
                                <VideoPlayer
                                    videoUrl={video.videoUrl}
                                    videoId={video.id}
                                    userId={video?.assignedToUser?.id}
                                    type='USER'
                                ></VideoPlayer>
                            </div>
                        ))}
                    </div>
                    {videos.length === 0 && (
                        <h1 className='flex justify-center'>No Video Found</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default User;

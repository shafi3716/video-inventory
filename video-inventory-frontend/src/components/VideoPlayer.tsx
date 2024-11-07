/**
 * @Author: Abdullah Al Shafi
 * @Date:   2024-11-05 11:45:15
 * @Last Modified by:   Abdullah Al Shafi
 * @Last Modified time: 2024-11-07 17:21:29
 */
import api from "../helpers/api";
import LocalStorageService from "../helpers/LocalStorageService";

interface Props {
    videoUrl: string;
    videoId: string;
    userId: string;
    type: string;
}

const VideoPlayer = ({videoUrl, videoId, userId, type}: Props) => {
    const logVideoEvent = async (action: any) => {
        if (type === "ADMIN") return;

        try {
            await api.post(
                "/activity-logs",
                {
                    videoId: videoId,
                    userId: userId,
                    action: action,
                    timestamp: new Date().toISOString(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${LocalStorageService.getToken()}`,
                    },
                }
            );
            console.log(`Logged: ${action}`);
        } catch (error) {
            console.error("Error logging video event:", error);
        }
    };

    return (
        <div className='py-4'>
            <video
                className='video-player'
                controls
                onPlay={() => logVideoEvent("play")}
                onPause={() => logVideoEvent("pause")}
                onEnded={() => logVideoEvent("ended")}
            >
                <source
                    src={process.env.REACT_APP_VIDEO_URL + videoUrl}
                    type='video/mp4'
                />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;

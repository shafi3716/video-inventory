import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import VideoAddForm from "../components/VideoAddForm";
import VideoPlayer from "../components/VideoPlayer";
import api from "../helpers/api";
import LocalStorageService from "../helpers/LocalStorageService";

const Admin = () => {
  const [videos, setVideos] = useState<any>();
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    api.get('/videos', {
      headers: {
        'Authorization': `Bearer ${LocalStorageService.getToken()}`
      }
    })
    .then(response => {
      console.log(response.data);
      setVideos(response.data)
    })
    .catch(error => {
      console.error("There was an error!", error);
    });
  },[refresh])

  const handleDelete = (videoId: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this video?");
    if (confirmed) {
       api.delete(`/videos/${videoId}`, {
          headers: {
            'Authorization': `Bearer ${LocalStorageService.getToken()}`
          }
        })
        .then(response => {
          setRefresh(true)
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
    }
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="p-10">
        <div>
          <VideoAddForm addNewCallback={() => setRefresh(true)}/>
        </div>
        <div className="flex justify-between mt-10">
          <h1 className="text-lg font-semibold">Video list:</h1>
        </div>
          <div className="container mx-auto p-4">
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {videos?.map((video: any) => (
                <div key={video.id} className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
                  <p className="text-gray-600">{video.description}</p>
                  <p className="py-1 text-gray-600">Assigned User: {video?.assignedToUser?.username}</p>
                  <VideoPlayer videoUrl={video.videoUrl}
                  videoId={video.id} userId={video?.assignedToUser?.id} type="ADMIN"></VideoPlayer>
                  <div className="flex justify-between">
                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">Assign Video</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition" onClick={() => handleDelete(video.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
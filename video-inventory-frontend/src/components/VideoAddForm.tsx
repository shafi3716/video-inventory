import { useState } from 'react';
import toast from 'react-hot-toast';
import LocalStorageService from '../helpers/LocalStorageService';
import api from '../helpers/api';

interface Props {
  addNewCallback: () => void,
  users: any
}

const VideoAddForm = ({addNewCallback, users}:Props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [assignedToUserId, setAssignedToUserId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleFileChange = (e: any) => {
        setVideoFile(e.target.files[0]);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!title || !videoFile || !assignedToUserId) {
            setErrorMessage('Please fill in all required fields.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('videoFile', videoFile);
        formData.append('assignedToUserId', assignedToUserId);

        try {
            await api.post('/videos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${LocalStorageService.getToken()}`
                },
            });
            addNewCallback()
            toast.success('Video uploaded successfully!');
            setSuccessMessage('Video uploaded successfully!');
            setTitle('');
            setDescription('');
            setVideoFile(null);
            setAssignedToUserId('');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('There was an error uploading the video.');
            console.error('Error uploading video:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add Video</h2>
            {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
            {successMessage && <div className="mb-4 text-green-500">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-indigo-200"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-indigo-200"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="videoFile" className="block text-sm font-medium text-gray-700">Video File</label>
                    <input
                        type="file"
                        id="videoFile"
                        accept="video/*"
                        onChange={handleFileChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-indigo-200"
                    />
                </div>
               <div className="mb-4">
                    <label htmlFor="assignedToUserId" className="block text-sm font-medium text-gray-700">Assigned To User</label>
                    <select
                        id="assignedToUserId"
                        value={assignedToUserId}
                        onChange={(e) => setAssignedToUserId(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-indigo-200"
                    >
                        <option value="" disabled>Select a user</option>
                        {users?.map((user: any) => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                >
                    Upload Video
                </button>
            </form>
        </div>
    );
};

export default VideoAddForm;

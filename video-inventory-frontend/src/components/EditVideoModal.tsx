/**
 * @Author: Abdullah Al Shafi
 * @Date:   2024-11-05 15:27:17
 * @Last Modified by:   Abdullah Al Shafi
 * @Last Modified time: 2024-11-07 17:23:55
 */
import {useState} from "react";
import api from "../helpers/api";
import LocalStorageService from "../helpers/LocalStorageService";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    video: any;
    users: any;
}

function EditVideoModal({isOpen, onClose, video, users}: Props) {
    const [title, setTitle] = useState(video?.title || "");
    const [description, setDescription] = useState(video?.description || "");
    const [assignedToUserId, setAssignedToUserId] = useState(
        video?.assignedToUser?.id || ""
    );

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("assignedToUserId", assignedToUserId);
        await api.put(`/videos/${video.id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${LocalStorageService.getToken()}`,
            },
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center'>
            <div className='bg-white rounded-lg shadow-lg w-full max-w-lg p-6'>
                <h2 className='text-2xl font-bold mb-4'>Edit Video</h2>

                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>
                        Title
                    </label>
                    <input
                        type='text'
                        className='mt-1 px-3 py-2 border border-gray-300 rounded w-full'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>
                        Description
                    </label>
                    <textarea
                        className='mt-1 px-3 py-2 border border-gray-300 rounded w-full'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>
                        Assign to User
                    </label>
                    <select
                        className='mt-1 px-3 py-2 border border-gray-300 rounded w-full'
                        value={assignedToUserId}
                        onChange={(e) => setAssignedToUserId(e.target.value)}
                    >
                        <option value=''>Select a user</option>
                        {users?.map((user: any) => (
                            <option value={user.id}>{user.username}</option>
                        ))}
                    </select>
                </div>

                <div className='flex justify-end'>
                    <button
                        className='bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 transition'
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition'
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditVideoModal;

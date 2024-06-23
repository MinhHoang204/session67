import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Job1 } from '../interface';

export default function Job() {
    const [name, setName] = useState<string>("");
    const [level, setLevel] = useState<number | null>(null);
    const [error, setError] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [jobToDelete, setJobToDelete] = useState<number | null>(null);

    const jobs: any = useSelector((state: any) => state.jobReducer);
    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLevel(parseInt(event.target.value));
    };

    const addTodo = () => {
        if (!name || level === null) {
            setError("Tên công việc và mức độ không được phép để trống");
            return;
        }
        if (jobs.some((job: Job1) => job.name === name)) {
            setError("Tên công việc không được phép trùng");
            return;
        }

        const newJob: Job1 = {
            id: Math.floor(Math.random() * 9999999),
            name,
            status: false,
            level,
        };
        dispatch({
            type: "ADD_TODO",
            payload: newJob,
        });
        setName("");
        setLevel(null);
        setError("");
    };

    const updateJob = (id: number) => {
        dispatch({
            type: "UPDATE_TODO",
            payload: id,
        });
    };

    const deleteJob = (id: number) => {
        setJobToDelete(id);
        setShowModal(true);
    };

    const confirmDeleteJob = () => {
        if (jobToDelete !== null) {
            dispatch({
                type: "DELETE_TODO",
                payload: jobToDelete,
            });
            setJobToDelete(null);
            setShowModal(false);
        }
    };

    const toggleComplete = (id: number) => {
        dispatch({
            type: "TOGGLE_COMPLETE",
            payload: id,
        });
    };

    return (
        <div>
            <h1>Job</h1>
            <div>
                <label htmlFor="name">Tên công việc</label>
                <input
                    id="name"
                    value={name}
                    type="text"
                    onChange={handleChange}
                />
                <select value={level !== null ? level.toString() : ""} onChange={handleSelect}>
                    <option value="">Chọn mức độ</option>
                    <option value="0">Khẩn cấp</option>
                    <option value="1">Quan trọng</option>
                    <option value="2">Bình thường</option>
                    <option value="3">Không quan trọng</option>
                </select>
                <button onClick={addTodo}>Thêm công việc</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <table border={1}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên công việc</th>
                        <th>Trạng thái</th>
                        <th>Mức độ</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job: Job1, index: number) => (
                        <tr key={job.id}>
                            <td>{index + 1}</td>
                            <td style={{ textDecoration: job.status ? 'line-through' : 'none' }}>
                                {job.name}
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={job.status}
                                    onChange={() => toggleComplete(job.id)}
                                />
                            </td>
                            <td>{["Khẩn cấp", "Quan trọng", "Bình thường", "Không quan trọng"][job.level]}</td>
                            <td>
                                <button onClick={() => deleteJob(job.id)}>Xóa</button>
                                <button onClick={() => updateJob(job.id)}>Sửa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <div className="modal">
                    <p>Bạn có chắc chắn muốn xóa công việc này không?</p>
                    <button onClick={confirmDeleteJob}>Xác nhận</button>
                    <button onClick={() => setShowModal(false)}>Hủy</button>
                </div>
            )}
        </div>
    );
}

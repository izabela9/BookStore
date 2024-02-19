import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const DeleteBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    async function deleteBookById() {
        setLoading(true)
        try {
            const result = await axios.delete(`http://localhost:5555/books/${id}`);
            if (result.status === 200) {
                console.log("in if-----")
                setLoading(false);
                navigate('/')

            }
        } catch (error) {
            console.log("error-----", error);
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
                <p>Are you sure you want to delete?</p>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={deleteBookById}
                        className="bg-red-500 text-white px-4 py-2 rounded focus:outline-none focus:bg-red-600 mr-2"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:bg-blue-600"
                    >
                        Cancel
                    </button>
                </div>
                {loading && <Spinner />}
            </div>
        </div>
    )
}

export default DeleteBook
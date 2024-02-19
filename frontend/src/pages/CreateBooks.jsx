import React, { useState } from "react";
import axios from 'axios';
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";


const CreateBooks = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post('http://localhost:5555/books/', { title, author, publishYear });
            console.log('message success', title, author, publishYear)
            setMessage('Book created successfully!')
            setTitle('');
            setAuthor('');
            setPublishYear('');
            setLoading(false);
        } catch (error) {
            setMessage('Error');
            console.error('Error creating book:', error);
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <BackButton />

            {loading ? (
                <Spinner />
            ) : (
                <div className="flex justify-center items-center min-h-screen pt-16">
                    <div className="w-full max-w-md">
                        <h2 className="text-3xl my-4"> Create Book</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor='title' className="block text-gray-700">Title:</label>
                                <input id='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} required
                                    className='border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500' />
                            </div>
                            <div>
                                <label htmlFor='author' className='block text-gray-700'>Author:</label>
                                <input id='author' type='text' value={author} onChange={(e) => setAuthor(e.target.value)} required
                                    className='border border-gray-300 rounder px-4 py-2 w-full focus:outline-none focus:border-blue-500' />
                            </div>
                            <div>
                                <label htmlFor='publishYear' className="block text-gray-700">Publish Year:</label>
                                <input id='publishYear' type='number' value={publishYear} onChange={(e) => setPublishYear(e.target.value)} required
                                    className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500" />
                            </div>
                            <button type='submit' className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-blue-600 hover:bg-blue-600">Create</button>
                        </form>
                    </div>
                </div>
            )}
            {message && <p className="mt-4 text-green-500">{message}</p>}
        </div>
    )
};

export default CreateBooks
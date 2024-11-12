import React, { useState } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [formData, setFormData] = useState({
        UserName: '',
        UserEmail: '',
        UserPassword: '',
        UserImage: null,
        selectedOption: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, UserImage: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = new FormData();
        data.append('UserName', formData.UserName);
        data.append('UserEmail', formData.UserEmail);
        data.append('UserPassword', formData.UserPassword);
        data.append('UserImage', formData.UserImage);
        data.append('selectedOption', formData.selectedOption);
    
        try {
            const response = await axios.post('http://localhost:5000/upload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log('Backend response:', response.data); // Log the backend response
    
            if (response.data.success) {
                alert('User registered successfully');
            } else {
                alert('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error.response || error.message);
            alert(`Error uploading image: ${error.response ? error.response.data.message : error.message}`);
        }
    };
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6 mt-5">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Enter Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="UserName"
                                value={formData.UserName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Enter Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="UserEmail"
                                value={formData.UserEmail}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="UserPassword"
                                value={formData.UserPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Image</label>
                            <input
                                type="file"
                                className="form-control"
                                name="UserImage"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="mb-3">
                            <select
                                className="form-control"
                                name="selectedOption"
                                value={formData.selectedOption}
                                onChange={handleChange}
                            >
                                <option value="">Select Option</option>
                                <option value="One">One</option>
                                <option value="Two">Two</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
};

export default HomePage;

import React from 'react'

const ViewPage = () => {
    return (
        <div className="container mt-5">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">UserImage</th>
                        <th scope="col">UserRole</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>
                            <button className="btn btn-danger btn-sm mr-3">Delete</button>
                            <button className="btn btn-success btn-sm ml-3" to="">Update</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ViewPage
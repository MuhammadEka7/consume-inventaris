import axios from"axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function User() {
    const [users, setUsers] = useState([])
    const [error, setError] = useState([])

    const navigate = useNavigate()


    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    })

    useEffect(() => {
        instance.get('user', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        .then(res => {
            setUsers(res.data.data)
         
        })
        .catch(err => {
            if (err.response.status == 401) {
                navigate('/login?message=' + encodeURIComponent('Anda Belum Login!'))
            }
        })
    }, [navigate])

    const deleteUser = (id) => {
        instance.delete(`user/destroy/${id}`)
        .then(res => {
            location.reload()
        })
        .catch(err => {
            setError(err.response.data)
        })
    }
    return(
        <Case>
            <div className="block m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Users</h5>
                    <div className="flex justify-end">
                    <button className="px-4 py-2 bg-teal-700 text-white shadow-md border-sky-500 rounded-lg">
                        <Link to={'/user/create'}>Tambah</Link>
                        <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
                    </button>
                    <button className="px-4 py-2 ms-1 bg-orange-700 text-white shadow-md border-sky-500 rounded-lg">
                        <Link to={'/user/trash'}>Trash</Link>
                        <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
                    </button>
                        {/* {
                            opsiButton.includes("create") ? (
                                <button className="px-4 py-2 ms-2 bg-teal-700 text-white shadow-md border-sky-500 rounded-lg">
                                <Link to={'/user/create'}>Tambah</Link>
                                    <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
                                </button>
                            ) : ''
                        }
                        {
                            opsiButton.includes("trash") ? (
                                <button className="px-4 py-2 ms-2 bg-orange-700 text-white shadow-md border-sky-500 rounded-lg">
                                <Link to={'/user/trash'}>Tambah</Link>
                                    <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
                                </button>
                            ) : ''
                        } */}
                    </div>
                    {
                        Object.keys(error).length > 0 ? (
                            <div role="alert">
                                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                    Gagal!
                                </div>
                                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                    <ul>
                                        {
                                            error.message
                                        }
                                    </ul>
                                </div>
                            </div>
                        ) : ''                       
                    }                   
                    <div className="flex mt-4 md:mt-6">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-4">No</th>
                                    <th scope="col" className="px-6 py-4">Username</th>
                                    <th scope="col" className="px-6 py-4">Email</th>
                                    <th scope="col" className="px-6 py-4">Password</th>
                                    <th scope="col" className="px-6 py-4">Role</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, id) => (
                                    <tr key={user.id} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4">{id+1}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{user.username}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{user.password}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{user.role}</td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <Link to={'/user/edit/' + user.id} className="px-4 py-2 bg-orange-500 rounded-lg mr-2 font-bold text-white">Edit</Link>    
                                            <button type="button" onClick={() => deleteUser(user.id)} className="px-4 py-2 bg-red-500 rounded-lg mr-2 font-bold text-white">Hapus</button>    
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Case>
    )
}
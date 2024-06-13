import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { MdArrowBack } from "react-icons/md";
import { MdRestore, MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';

export default function StuffTrash() {
    const [trash, setTrash] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };

        axios.get('http://localhost:8000/stuff/trash', config)
        .then(res => {
            setTrash(res.data.data);
        })
        .catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login'));
            } else {
                setError('Terjadi kesalahan saat memuat data sampah.');
            }
        });
    }, []);

    const restoreStuff = (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin ingin mengembalikan barang ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, kembalikan!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                const accessToken = localStorage.getItem('access_token');
                const config = {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                };

                axios.put(`http://localhost:8000/stuff/restore/${id}`, null, config)
                .then(() => {   
                    setTrash(trash.filter(user => user.id !== id));
                    Swal.fire(
                        'Berhasil!',
                        'Barang telah berhasil dikembalikan.',
                        'success'
                    );
                })
                .catch(err => {
                    setError('Gagal mengembalikan barang.');
                });
            }
        });
    };

    const permanentDeleteStuff = (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin ingin menghapus barang ini secara permanen?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                const accessToken = localStorage.getItem('access_token');
                const config = {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                };

                axios.delete(`http://localhost:8000/stuff/permanent/${id}`, config)
                .then(() => {
                    setTrash(trash.filter(stuff => stuff.id !== id));
                    Swal.fire(
                        'Berhasil!',
                        'Barang telah berhasil dihapus secara permanen.',
                        'success'
                    );
                })
                .catch(err => {
                    setError('Gagal menghapus barang secara permanen.');
                });
            }
        });
    };

    return (
        <Case>
                <div className="block w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="m-5 pb-10 pt-10">
                    <div className="flex justify-between">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Stuff Trash</h5>
                        <div className="flex">
                            <button className="px-4 py-2 bg-teal-700 text-white shadow-md border-sky-500 rounded-lg mr-2">
                                <Link to="/stuff">
                                <MdArrowBack className="w-6 h-6 mr-1"/>
                                </Link>
                            </button>
                        
                        </div>
                    </div>
             
                    {error && (
                        <div role="alert">
                            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                Gagal!
                            </div>
                            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                {error}
                            </div>
                        </div>
                    )}
                    <div className="flex mt-4 md:mt-6">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-4">No</th>
                                    <th scope="col" className="px-6 py-4">Name</th>
                                    <th scope="col" className="px-6 py-4">Category</th>
                                    <th scope="col" className="px-6 py-4">Stok</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trash.map((stuff, id) => (
                                    <tr key={stuff.id} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4">{id+1}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{stuff.name}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{stuff.category}</td>
                                        {
                                            stuff.stock? (
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    Total Avaible: {stuff.stock.total_avaible} <br />
                                                    Total Defect: {stuff.stock.total_defect} <br />
                                                </td>
                                            ) : (
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    Stock Belum Ditambahkan
                                                </td>
                                            )
                                        }
                                        <td className="border px-4 py-2">
                                            <button className="mr-2 text-green-500 hover:text-green-700" onClick={() => restoreStuff(stuff.id)}>
                                                <MdRestore className="w-6 h-6" />
                                            </button>
                                            <button className="text-red-500 hover:text-red-700" onClick={() => permanentDeleteStuff(stuff.id)}>
                                                <MdDeleteForever className="w-6 h-6" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Case>
    );
}
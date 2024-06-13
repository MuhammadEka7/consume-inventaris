import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { MdArrowBack } from "react-icons/md";
import { MdRestore, MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';

export default function InboundTrash() {
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

        axios.get('http://localhost:8000/inbound/trash', config)
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

    const restoreInbound = (id) => {
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

                axios.put(`http://localhost:8000/inbound/restore/${id}`, null, config)
                .then(() => {   
                    setTrash(trash.filter(inbound => inbound.id !== id));
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

    const permanentDeleteInbound = (id) => {
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

                axios.delete(`http://localhost:8000/inbound/permanent/${id}`, config)
                .then(() => {
                    setTrash(trash.filter(inbound => inbound.id !== id));
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
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">inbound Trash</h5>
                        <div className="flex">
                            <button className="px-4 py-2 bg-teal-700 text-white shadow-md border-sky-500 rounded-lg mr-2">
                                <Link to="/inbound">
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
                                    <th scope="col" className="px-6 py-4">Stuff Id</th>
                                    <th scope="col" className="px-6 py-4">Total</th>
                                    <th scope="col" className="px-6 py-4">Date</th>
                                    <th scope="col" className="px-6 py-4">Proff File</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trash.map((inbound, id) => (
                                    <tr key={inbound.id} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4">{id+1}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{inbound.stuff_id}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{inbound.total}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{inbound.date}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{inbound.proff_file}</td>
                                        <td className="border px-4 py-2">
                                            <button className="mr-2 text-green-500 hover:text-green-700" onClick={() => restoreInbound(inbound.id)}>
                                                <MdRestore className="w-6 h-6" />
                                            </button>
                                            <button className="text-red-500 hover:text-red-700" onClick={() => permanentDeleteInbound(inbound.id)}>
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
// import React, { useEffect, useState } from "react";
// import Case from "../components/Case";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Bar, BarChart, CartesianGrid, Legend, Rectangle, Tooltip, XAxis, YAxis } from 'recharts';

// export default function Dashboard() {
//     const [stuffs, setStuffs] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [checkProses, setCheckProses] = useState(false);
//     const [lendingGrouped, setLendingGrouped] = useState([]);

//     const navigate = useNavigate();

//     useEffect(() => {
//         getDataStuffs();
//         getDataUsers();
//         getDataLendings();
//     }, [checkProses]);

//     function getDataStuffs() {
//         axios.get('http://localhost:8000/stuff', {
//             headers: {
//                 'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
//             }
//         })
//         .then(res => {
//             setStuffs(res.data.data);
//         })
//         .catch(err => {
//             if (err.response.status == 401) {
//                 navigate('/login?message=' + encodeURIComponent('Anda belum login'));
//             }
//         });
//     }

//     function getDataUsers() {
//         axios.get('http://localhost:8000/user', {
//             headers: {
//                 'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
//             }
//         })
//         .then(res => {
//             setUsers(res.data.data);
//         })
//         .catch(err => {
//             if (err.response.status == 401) {
//                 navigate('/login?message=' + encodeURIComponent('Anda belum login'));
//             }
//         });
//     }

//     function getDataLendings() {
//         axios.get('http://localhost:8000/lending', {
//             headers: {
//                 'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
//             }
//         })
//         .then(res => {
//             const data = res.data.data;

//             const groupedData = {};
//             data.forEach((entry) => {
//                 const date = new Date(entry.date_time);
//                 const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
//                 if (!groupedData[formattedDate]) {
//                     groupedData[formattedDate] = [];
//                 }
//                 groupedData[formattedDate].push(entry);
//             });

//             const processedData = Object.keys(groupedData).map((date) => ({
//                 date,
//                 totalStuff: groupedData[date].reduce((acc, entry) => acc + entry.total_stuff, 0)
//             }));

//             setLendingGrouped(processedData);
//             setCheckProses(true);
//         })
//         .catch(err => {
//             if (err.response.status == 401) {
//                 navigate('/login?message=' + encodeURIComponent('Anda belum login'));
//             }
//         });
//     }

//     return (
//         <Case>
//             <div className="flex flex-wrap justify-center m-10">
//                 <div className="p-4 w-1/2">
//                     <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
//                         <div className="flex items-center mb-3">
//                             <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
//                                 <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
//                                     <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
//                                 </svg>
//                             </div>
//                             <h2 className="text-white dark:text-white text-lg font-medium">Data Stuff</h2>
//                         </div>
//                         <div className="flex flex-col justify-between flex-grow">
//                             <h1 className="text-white dark:text-white text-lg font-medium">{stuffs.length}</h1>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="p-4 w-1/2">
//                     <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
//                         <div className="flex items-center mb-3">
//                             <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
//                                 <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
//                                     <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
//                                 </svg>
//                             </div>
//                             <h2 className="text-white dark:text-white text-lg font-medium">Data User</h2>
//                         </div>
//                         <div className="flex flex-col justify-between flex-grow">
//                             <h1 className="text-white dark:text-white text-lg font-medium">{users.length}</h1>
//                         </div>
//                     </div>
//                 </div>

//                 <BarChart
//                     width={500}
//                     height={300}
//                     data={lendingGrouped}
//                     margin={{
//                         top: 5,
//                         right: 30,
//                         left: 20,
//                         bottom: 5,
//                     }}
//                 >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="totalStuff" fill="#8884d8" activeShape={<Rectangle fill="pink" stroke="blue" />} />
//                 </BarChart>
//             </div>
//         </Case>
//     )
// }

import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Dashboard() {
    const[stuffs, setStuffs] = useState([]);
    const[users, setUsers] = useState([]);
    const[inbounds, setInbounds] = useState([]);
    const[lendings, setLendings] = useState([]);
    const [lendingGrouped, setLendingGrouped] = useState([]);

    const [checkProses, setCheckProses] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        getDataStuffs();
        getDataUsers();
        getDataLendings();
        getDataInbounds();
    }, [checkProses]);

    function getDataStuffs() {
        axios.get('http://localhost:8000/stuff', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setStuffs(res.data.data)
        })
        .catch(err => {
            if (err.response.status == 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        })
    }

    function getDataUsers() {
        axios.get('http://localhost:8000/user', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setUsers(res.data.data);
        })
        .catch(err => {
            if (err.response.status == 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        })
    }

    function getDataInbounds() {
        axios.get('http://localhost:8000/inbound', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setInbounds(res.data.data);
        })
        .catch(err => {
            if (err.response.status == 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        })
    }

    function getDataLendings() {
        axios.get('http://localhost:8000/lendings', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            const data = res.data.data;
            // mengelompokkan data berdasarkan date_time
            const groupedData = {};
            data.forEach((entry) => {
                const date = new Date(entry.date_time);
                const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                if (!groupedData[formattedDate]) {
                    groupedData[formattedDate] = [];
                }
                groupedData[formattedDate].push(entry);
            });
            // membuat struktur array baru yang berisi date (tanggal terformat sebelumnya) dan totalStuff (total dari total_stuff)
            const processedData = Object.keys(groupedData).map((date) => ({
                date,
                totalStuff: groupedData[date].reduce((acc, entry) => acc + entry.total_stuff, 0)
            }));
            // simpan data pada state
            setLendingGrouped(processedData);
            // mengubah state checkProses menjadi true untuk men-trigger useEffect
            setCheckProses(true)
        })
        .catch(err => {
            if (err.response.status == 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        })
    }

    return (
        <Case>
            <div className="flex flex-wrap justify-center m-10">
                <div className="p-4 w-1/2">
                    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <div
                                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white dark:text-white text-lg font-medium">Data Stuff</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white dark:text-white text-lg font-medium">{stuffs.length}</h1>
                        </div>
                    </div>
                </div>

                <div className="p-4 w-1/2">
                    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <div
                                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white dark:text-white text-lg font-medium">Data User</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white dark:text-white text-lg font-medium">{users.length}</h1>
                        </div>
                    </div>
                </div>

                <div className="p-4 w-1/2">
                    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                        <div className="flex items-center mb-3">
                            <div
                                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-white dark:text-white text-lg font-medium">Data Inbound</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <h1 className="text-white dark:text-white text-lg font-medium">{inbounds.length}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={lendingGrouped}
                    margin={
                        {
                            top: 10,
                            left: 10,
                            right: 20,
                            bottom: 10
                        }
                    }
                >
                    <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
                    <XAxis dataKey="date"></XAxis>
                    <YAxis></YAxis>
                    <Tooltip></Tooltip>
                    <Legend></Legend>
                    <Bar dataKey="totalStuff" fill="#2563eb"></Bar>
                </BarChart>
            </ResponsiveContainer>
        </Case>
    )
}

// import React, { useEffect, useState } from "react";
// import Case from "../components/Case";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// export default function Dashboard() {
//     const [stuffs, setStuffs] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [authUser, setAuthUser] = useState([]);
//     const [lendingGrouped, setLendingGrouped] = useState([]); 
//     const [lendings, setLendings] = useState([]); 
//     const [inbounds, setInbounds] = useState([]); 

//     const navigate = useNavigate();

//     useEffect(() => {
//         getDataStuffs();
//         getDataUsers();
//         getDataLendings();
//         getDataInbounds();
//         getAuthProfile();
//     }, []);

//     useEffect(() => {
//         console.log("Lending Grouped Data:", lendingGrouped); // Debugging to check lendingGrouped data
//     }, [lendingGrouped]);

//     function getAuthProfile() {
//         axios.get('http://localhost:8000/profile', {
//             headers: {
//                 'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
//             }
//         })
//         .then(res => {
//             setAuthUser(res.data.data);
//         })
//         .catch(err => {
//             if (err.response.status === 401) {
//                 navigate('/login?message=' + encodeURIComponent('Anda belum login'));
//             }
//         });
//     }

//     function getDataStuffs() {
//         axios.get('http://localhost:8000/stuff', {
//             headers: {
//                 'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
//             }
//         })
//         .then(res => {
//             setStuffs(res.data.data);
//         })
//         .catch(err => {
//             if (err.response.status === 401) {
//                 navigate('/login?message=' + encodeURIComponent('Anda belum login'));
//             }
//         });
//     }

//     function getDataUsers() {
//         axios.get('http://localhost:8000/user', {
//             headers: {
//                 'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
//             }
//         })
//         .then(res => {
//             setUsers(res.data.data);
//         })
//         .catch(err => {
//             if (err.response.status === 401) {
//                 navigate('/login?message=' + encodeURIComponent('Anda belum login'));
//             }
//         });
//     }

//     function getDataInbounds() {
//         axios.get('http://localhost:8000/inbound', {
//             headers: {
//                 'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
//             }
//         })
//         .then(res => {
//             setInbounds(res.data.data);
//         })
//         .catch(err => {
//             if (err.response.status === 401) {
//                 navigate('/login?message=' + encodeURIComponent('Anda belum login'));
//             }
//         });
//     }

//     function getDataLendings() {
//         axios.get('http://localhost:8000/lendings', {
//             headers: {
//                 'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
//             }
//         })
//         .then(res => {
//             setLendings(res.data.data); 
//             const data = res.data.data;
//             const groupedData = {};
            
//             data.forEach((entry) => {
//                 const date = new Date(entry.date_time);
//                 const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
                
//                 if (!groupedData[formattedDate]) {
//                     groupedData[formattedDate] = 0;
//                 }
                
//                 groupedData[formattedDate] += entry.total_stuff;
//             });

//             const processedData = Object.keys(groupedData).map((date) => ({
//                 date,
//                 total_stuff: groupedData[date]
//             }));

//             setLendingGrouped(processedData);
//         })
//         .catch(err => {
//             if (err.response.status === 401) {
//                 navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
//             }
//         });
//     }

//     return (
//         <>
//             <Case>
//             {
//         authUser['role'] == 'admin' ? (
//             <div  className="flex flex-wrap justify-center m-10">
//                 <div className="p-4 w-1/2">
//                     <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
//                         <div className="flex items-center mb-3">
//                             <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
//                                 <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
//                                     <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
//                                 </svg>
//                             </div>
//                             <h2 className="text-white dark:text-white text-lg font-medium">Data Stuff</h2>
//                         </div>
//                         <div className="flex flex-col justify-between flex-grow">
//                             <h1 className="text-white dark:text-white text-lg font-medium">{stuffs.length}</h1>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="p-4 w-1/2">
//                     <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
//                         <div className="flex items-center mb-3">
//                             <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
//                                 <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
//                                     <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
//                                 </svg>
//                             </div>
//                             <h2 className="text-white dark:text-white text-lg font-medium">Data User</h2>
//                         </div>
//                         <div className="flex flex-col justify-between flex-grow">
//                             <h1 className="text-white dark:text-white text-lg font-medium">{users.length}</h1>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="p-4 w-1/2">
//                     <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
//                         <div className="flex items-center mb-3">
//                             <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
//                                 <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
//                                     <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
//                                 </svg>
//                             </div>
//                             <h2 className="text-white dark:text-white text-lg font-medium">Data Lending</h2>
//                         </div>
//                         <div className="flex flex-col justify-between flex-grow">
//                             <h1 className="text-white dark:text-white text-lg font-medium">{lendings.length}</h1>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="p-4 w-1/2">
//                     <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
//                         <div className="flex items-center mb-3">
//                             <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
//                                 <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
//                                     <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
//                                 </svg>
//                             </div>
//                             <h2 className="text-white dark:text-white text-lg font-medium">Data Inbound</h2>
//                         </div>
//                         <div className="flex flex-col justify-between flex-grow">
//                             <h1 className="text-white dark:text-white text-lg font-medium">{inbounds.length}</h1>
//                         </div>
//                     </div>
//                 </div>
//             </div>
            
//         ) : null
// }

//                 <div className="flex justify-center m-10">
//                     <ResponsiveContainer width="100%" height={400}>
//                         <BarChart data={lendingGrouped}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="date" />
//                             <YAxis />
//                             <Tooltip />
//                             <Legend />
//                             <Bar dataKey="totalStuff" fill="#8884d8" />
//                         </BarChart>
//                     </ResponsiveContainer>
//                 </div>
//             </Case>
//         </>
//     );
// }
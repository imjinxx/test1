'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Page() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch('http://localhost:3001/api/users');
        if (!res.ok) {
          console.error('Failed to fetch data');
          return;
        }
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getUsers();

    const interval = setInterval(getUsers, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
      });
      const result = await res.json();
      console.log(result);

      // Re-fetch users after deletion
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <>
      <br /><br /><br /><br />
      <div className="container">
        <div className="card">
          <div className="card-header">
            Users List
          </div>
          <div className="card-body">
            <div className="row">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th className='col-md-2 text-center'>#</th>
                    <th className='col-md-4'>Firstname</th>
                    <th className='col-md-4'>Lastname</th>
                    <th className='col-md-1'>Edit</th>
                    <th className='col-md-1'>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className='text-center'>{item.id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td><Link href={`/users/edit/${item.id}`} className="btn btn-warning">Edit</Link></td>
                      <td><button className="btn btn-danger" type="button" onClick={() => handleDelete(item.id)}>Del</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <br /><br />
    </>
  );
}

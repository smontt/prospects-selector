import React, { useEffect, useState } from "react";

function SimpleTable() {
    const [prospects, setProspects] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const apiProspects = 'http://localhost:5000/api/prospects?sortBy=score&order=asc&page=1&limit=20';

    const fetchData = (page) => {
      return fetch(page)
            .then((response) => response.json())
            .then((res) => {
                setProspects(res.data);
                setTotalPages(res.totalPages);
      });
    }
  
    useEffect(() => {
      fetchData(apiProspects);
    },[])

      // Estado de la tabla
      const [page, setPage] = useState(1);
      const [sortColumn, setSortColumn] = useState(null);
      const [sortDirection, setSortDirection] = useState('asc');
    
      // Función para cambiar de página
      const handlePageChange = (newPage) => {
        fetchData(`http://localhost:5000/api/prospects?sortBy=score&order=asc&page=${newPage}&limit=20`)
        setPage(newPage);
      };

      // Función para manejar el sort
      const handleSort = (column) => {
        const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortDirection(direction);

        const sortedData = [...prospects].sort((a, b) => {
          if (sortColumn === null) return 0;
      
          const aValue = a[sortColumn];
          const bValue = b[sortColumn];
      
          if (sortDirection === 'asc') {
            return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
          } else {
            return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
          }
        });
        setProspects(sortedData);
      };

    return (
        <div>
          <table width='100%'>
        <thead>
          <tr>
            
            <th>
              <button onClick={() => handleSort('name')}>Name</button>
            </th>
            <th>
              <button onClick={() => handleSort('email')}>Email</button>
            </th>
            <th>
              <button onClick={() => handleSort('country')}>Country</button>
            </th>
            <th>
              <button onClick={() => handleSort('jobTitle')}>Job Title</button>
            </th>
            <th>
              <button onClick={() => handleSort('yearsOfExperience')}>Experience</button>
            </th>
            <th>
              <button onClick={() => handleSort('industry')}>Industry</button>
            </th>
            <th>
              <button onClick={() => handleSort('companySize')}>Company Size</button>
            </th>
            <th>
              <button onClick={() => handleSort('score')}>Score</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {prospects.map((row) => (
            <tr key={row._id}>
              <td align="center">{row.name}</td>
              <td align="center">{row.email}</td>
              <td align="center">{row.country}</td>
              <td align="center">{row.jobTitle}</td>
              <td align="center">{row.yearsOfExperience}</td>
              <td align="center">{row.industry}</td>
              <td align="center">{row.companySize}</td>
              <td align="center">{row.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div style={{margin:'20px'}}>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>{` Page ${page} of ${totalPages} `}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>   
        </div>
    )
}

export default SimpleTable;
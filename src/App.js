import React, { useState, useEffect } from 'react';
import Board from './components/Board.js';
import DisplayButton from './components/DisplayButtton.js';
import { fetchData } from './utils/api';

function App() {
  
  const [viewState, setViewState] = useState({
    grouping: localStorage.getItem('grouping') || 'status',
    ordering: localStorage.getItem('ordering') || 'priority',
  });
  
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData();
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  
  const handleDisplayChange = (newGrouping, newOrdering) => {
    setViewState({
      grouping: newGrouping,
      ordering: newOrdering
    });
    
    
    localStorage.setItem('grouping', newGrouping);
    localStorage.setItem('ordering', newOrdering);
  };

  return (
    <div className="app">
      <DisplayButton
        grouping={viewState.grouping}
        ordering={viewState.ordering}
        onDisplayChange={handleDisplayChange}
      />
      <Board
        tickets={tickets}
        users={users}
        grouping={viewState.grouping}
        ordering={viewState.ordering}
      />
    </div>
  );
}

export default App;


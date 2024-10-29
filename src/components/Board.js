import React from 'react';
import Column from './Column.js';
import '../styles/Board.css';

function Board({ tickets, users, grouping, ordering }) {
  const getPriorityName = (priority) => {
    const priorities = {
      4: 'High',
      3: 'Medium',
      2: 'Low',
      1: 'Urgent',
      0: 'No priority'
    };
    return priorities[priority];
  };

  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (ordering === 'priority') {
        return b.priority - a.priority;
      }
      return a.title.localeCompare(b.title);
    });
  };

  const groupTickets = () => {
    let groups = {};

    if (grouping === 'status') {
      groups = {
        'Backlog': [],
        'Todo': [],
        'In progress': [],
        'Done': [],
        'Canceled': []
      };
      tickets.forEach(ticket => {
        if (!groups[ticket.status]) groups[ticket.status] = [];
        groups[ticket.status].push(ticket);
      });
    } else if (grouping === 'user') {
      users.forEach(user => {
        groups[user.id] = [];
      });
      tickets.forEach(ticket => {
        groups[ticket.userId].push(ticket);
      });
    } else if (grouping === 'priority') {
      [0, 1, 2, 3, 4].forEach(priority => {
        groups[priority] = [];
      });
      tickets.forEach(ticket => {
        groups[ticket.priority].push(ticket);
      });
    }

    
    Object.keys(groups).forEach(key => {
      groups[key] = sortTickets(groups[key]);
    });

    return groups;
  };

  const getColumnTitle = (key) => {
    let title = key;
    let icon = null;

    if (grouping === 'user') {
      const user = users.find(u => u.id === key);
      title = user ? user.name : key;
    } else if (grouping === 'priority') {
      title = getPriorityName(parseInt(key, 10));

      
      if (key === '1') { 
        icon = (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 1C1.91067 1 1 1.91067 1 3V13C1 14.0893 1.91067 15 3 15H13C14.0893 15 15 14.0893 15 13V3C15 1.91067 14.0893 1 13 1H3ZM7 4H9L8.75391 8.99836H7.25L7 4ZM9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z" fill="#FB773F"/>
          </svg>
        );
      } else if (key === '0') { 
        icon = (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.9" d="M4.5 7.34375H2.75C2.50838 7.34375 2.3125 7.53963 2.3125 7.78125V8.21875C2.3125 8.46037 2.50838 8.65625 2.75 8.65625H4.5C4.74162 8.65625 4.9375 8.46037 4.9375 8.21875V7.78125C4.9375 7.53963 4.74162 7.34375 4.5 7.34375Z" fill="#5E5E5F"/>
            <path opacity="0.9" d="M8.875 7.34375H7.125C6.88338 7.34375 6.6875 7.53963 6.6875 7.78125V8.21875C6.6875 8.46037 6.88338 8.65625 7.125 8.65625H8.875C9.11662 8.65625 9.3125 8.46037 9.3125 8.21875V7.78125C9.3125 8.53963 9.11662 8.34375 8.875 7.34375Z" fill="#5E5E5F"/>
            <path opacity="0.9" d="M13.25 7.34375H11.5C11.2584 7.34375 11.0625 7.53963 11.0625 7.78125V8.21875C11.0625 8.46037 11.2584 8.65625 11.5 8.65625H13.25C13.4916 8.15625 13.6875 7.96037 13.6875 8.21875V7.78125C13.6875 7.53963 13.4916 7.34375 13.25 7.34375Z" fill="#5E5E5F"/>
          </svg>
        );
      } else if (key === '2') { 
        icon = (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 8H2.5C1.94772 8 1.5 8.44772 1.5 9V13C1.5 13.5523 1.94772 14 2.5 14H3.5C4.05228 14 4.5 13.5523 4.5 13V9C4.5 8.44772 4.05228 8 3.5 8Z" fill="#5C5C5E"/>
            <path d="M8.5 5H7.5C6.94772 5 6.5 5.44772 6.5 6V13C6.5 13.5523 6.94772 14 7.5 14H8.5C9.05228 14 9.5 13.5523 9.5 13V6C9.5 5.44772 9.05228 5 8.5 5Z" fill="#5C5C5E" fillOpacity="0.4"/>
            <path d="M13.5 2H12.5C11.9477 2 11.5 2.44772 11.5 3V13C11.5 13.5523 11.9477 14 12.5 14H13.5C14.0523 14 14.5 13.5523 14.5 13V3C14.5 2.44772 14.0523 2 13.5 2Z" fill="#5C5C5E" fillOpacity="0.4"/>
          </svg>
        );
      } else if (key === '3') { 
        icon = (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 8H2.5C1.94772 8 1.5 8.44772 1.5 9V13C1.5 13.5523 1.94772 14 2.5 14H3.5C4.05228 14 4.5 13.5523 4.5 13V9C4.5 8.44772 4.05228 8 3.5 8Z" fill="#5C5C5E"/>
            <path d="M8.5 5H7.5C6.94772 5 6.5 5.44772 6.5 6V13C6.5 13.5523 6.94772 14 7.5 14H8.5C9.05228 14 9.5 13.5523 9.5 13V6C9.5 5.44772 9.05228 5 8.5 5Z" fill="#5C5C5E"/>
            <path d="M13.5 2H12.5C11.9477 2 11.5 2.44772 11.5 3V13C11.5 13.5523 11.9477 14 12.5 14H13.5C14.0523 14 14.5 13.5523 14.5 13V3C14.5 2.44772 14.0523 2 13.5 2Z" fill="#5C5C5E" fillOpacity="0.4"/>
          </svg>
        );
      } else if (key === '4') { 
        icon = (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 8H2.5C1.94772 8 1.5 8.44772 1.5 9V13C1.5 13.5523 1.94772 14 2.5 14H3.5C4.05228 14 4.5 13.5523 4.5 13V9C4.5 8.44772 4.05228 8 3.5 8Z" fill="#5C5C5E"/>
            <path d="M8.5 5H7.5C6.94772 5 6.5 5.44772 6.5 6V13C6.5 13.5523 6.94772 14 7.5 14H8.5C9.05228 14 9.5 13.5523 9.5 13V6C9.5 5.44772 9.05228 5 8.5 5Z" fill="#5C5C5E"/>
            <path d="M13.5 2H12.5C11.9477 2 11.5 2.44772 11.5 3V13C11.5 13.5523 11.9477 14 12.5 14H13.5C14.0523 14 14.5 13.5523 14.5 13V3C14.5 2.44772 14.0523 2 13.5 2Z" fill="#5C5C5E"/>
          </svg>
        );
      }
    }

    return (
      <div className="column-header">
        {icon && <span className="icon-wrapper">{icon}</span>}
        <span className="title">{title}</span>
      </div>
    );
  };

  const groupedTickets = groupTickets();

  return (
    <div className="board">
      {Object.entries(groupedTickets).map(([key, tickets]) => (
        <Column
          key={key}
          title={getColumnTitle(key)}
          status={grouping === 'status' ? key : null} 
          tickets={tickets}
          users={users}
          grouping={grouping}
        />
      ))}
    </div>
  );
}

export default Board;
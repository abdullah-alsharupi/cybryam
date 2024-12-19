// components/StatusButton.tsx
import React from 'react';

interface StatusButtonProps {
  status: 'CONFIRMED' | 'CANCELLED' | 'PENDING';
  onClick?: () => void;
}

const StatusButton: React.FC<StatusButtonProps> = ({ status }) => {
  const getButtonStyle = () => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-500 hover:bg-green-600 text-white';
      case 'CANCELLED':
        return 'bg-red-500 hover:bg-red-600 text-white';
      case 'PENDING':
        return 'bg-yellow-500 hover:bg-yellow-600 text-white';
      default:
        return '';
    }
  };

  return (
    <button
      className={`p-1 rounded ${getButtonStyle()}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </button>
  );
};

export default StatusButton;
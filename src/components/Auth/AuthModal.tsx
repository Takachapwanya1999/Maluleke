import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { LoginForm, RegisterForm } from './AuthForms';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          >
            <FiX size={24} />
          </button>

          {/* Content */}
          <div className="p-6">
            {mode === 'login' ? (
              <LoginForm
                onSwitchToRegister={() => setMode('register')}
                onClose={onClose}
              />
            ) : (
              <RegisterForm
                onSwitchToLogin={() => setMode('login')}
                onClose={onClose}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

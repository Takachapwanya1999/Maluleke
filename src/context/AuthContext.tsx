import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  preferences?: {
    language: 'en' | 'af' | 'zu';
    currency: 'ZAR';
    newsletter: boolean;
  };
  loyaltyPoints: number;
  customerType: 'retail' | 'wholesale';
  wishlist: string[]; // Product IDs
  orderHistory: string[]; // Order IDs
  createdAt: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE'; payload: Partial<User> }
  | { type: 'ADD_TO_WISHLIST'; payload: string }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'CLEAR_ERROR' };

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  clearError: () => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  customerType: 'retail' | 'wholesale';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null
      };
    
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null
      };
    
    case 'ADD_TO_WISHLIST':
      return {
        ...state,
        user: state.user ? {
          ...state.user,
          wishlist: [...state.user.wishlist, action.payload]
        } : null
      };
    
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        user: state.user ? {
          ...state.user,
          wishlist: state.user.wishlist.filter(id => id !== action.payload)
        } : null
      };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  });

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('chap_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('chap_user');
      }
    }
  }, []);

  // Save user to localStorage when authenticated
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('chap_user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('chap_user');
    }
  }, [state.user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulate API call - replace with real authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would validate the password here
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Mock user data - replace with real API response
      const mockUser: User = {
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe',
        phone: '+27123456789',
        address: {
          street: '123 Main Street',
          city: 'Johannesburg',
          province: 'Gauteng',
          postalCode: '2000'
        },
        preferences: {
          language: 'en',
          currency: 'ZAR',
          newsletter: true
        },
        loyaltyPoints: 1250,
        customerType: 'retail',
        wishlist: [],
        orderHistory: [],
        createdAt: new Date()
      };
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
      return true;
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials' });
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        preferences: {
          language: 'en',
          currency: 'ZAR',
          newsletter: true
        },
        loyaltyPoints: 100, // Welcome bonus
        customerType: userData.customerType,
        wishlist: [],
        orderHistory: [],
        createdAt: new Date()
      };
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: newUser });
      return true;
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Registration failed' });
      return false;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = (updates: Partial<User>) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: updates });
  };

  const addToWishlist = (productId: string) => {
    if (state.user && !state.user.wishlist.includes(productId)) {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: productId });
    }
  };

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider value={{
      state,
      login,
      register,
      logout,
      updateProfile,
      addToWishlist,
      removeFromWishlist,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthContext.tsx

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// 인증 상태 인터페이스 정의
interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
}

// 초기 상태 정의
const initialAuthState: AuthState = {
  isLoggedIn: false,
  userId: null,
};

// Context 생성
interface AuthContextType {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Context Provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 로컬 스토리지에서 인증 정보를 가져와 초기 상태 설정
  const [authState, setAuthState] = useState<AuthState>(() => {
    const storedAuthState = localStorage.getItem('authState');
    return storedAuthState ? JSON.parse(storedAuthState) : initialAuthState;
  });

  // 인증 정보가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(authState));
  }, [authState]);

  return (
    // 인증 컨텍스트 제공자를 사용하여 자식 컴포넌트에 컨텍스트 제공
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

// 사용 편의를 위한 Custom Hook
export const useAuth = () => {
  // useContext 훅을 사용하여 현재 인증 컨텍스트의 값을 가져옴
  const context = useContext(AuthContext);
  // 컨텍스트가 없는 경우 오류 처리
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  // 인증 컨텍스트 반환
  return context;
};

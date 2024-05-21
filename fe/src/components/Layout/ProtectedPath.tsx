import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import paths, { protectedPaths } from '../../common/paths';
import { useAppSelector } from '../../store/hooks';
import { selectIsAdmin } from '../../pages/Login/selectors';

const ProtectedPath = ({ children }: { children: React.ReactNode }) => {
  const path: string = window.location.pathname;
  const isAdmin = useAppSelector(selectIsAdmin);

  const navigate = useNavigate();

  useEffect(() => {
    if (protectedPaths.includes(path) && !isAdmin) {
      navigate(paths.root);
    }
  }, [path, navigate, isAdmin]);

  return <>{children}</>;
};

export default ProtectedPath;

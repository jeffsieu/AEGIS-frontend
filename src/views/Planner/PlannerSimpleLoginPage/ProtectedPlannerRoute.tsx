import { CircularProgress } from '@mui/material';
import { useAppSelector } from '@store/hooks';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function ProtectedPlannerRoute() {
  const isPlanner = useAppSelector((state) => state.general.isPlanner);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPlanner) {
      navigate('/login');
    }
  }, [isPlanner, navigate]);

  if (isPlanner) {
    return <Outlet />;
  } else {
    return <CircularProgress />;
  }
}

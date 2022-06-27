import TitledContainer from '@components/general/titled-container';
import { Button, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { setIsPlanner } from '@store/general';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PLANNER_PASSWORD = 'pw123';

export default function PlannerSimpleLoginPage() {
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const dispatch = useAppDispatch();
  const isPlanner = useAppSelector((state) => state.general.isPlanner);
  const navigate = useNavigate();

  function onChangePassword(event: any) {
    setPasswordInput(event.target.value);
  }

  async function onSubmit(event: any) {
    event.preventDefault();
    try {
      await validatePassword(passwordInput);
      dispatch(setIsPlanner(true));
    } catch (error: any) {
      setError(error.toString());
    }
  }

  function validatePassword(password: string): Promise<void> {
    return new Promise<void>((res, rej) => {
      if (password === PLANNER_PASSWORD) res();
      else rej('Incorrect password');
    });
  }

  useEffect(() => {
    if (isPlanner) {
      navigate('/planner');
    }
  }, [isPlanner, dispatch, navigate]);

  return (
    <TitledContainer title="Planner login">
      <Box component="form" noValidate onSubmit={onSubmit}>
        <Stack alignItems="start" spacing={2}>
          <TextField
            error={error !== ''}
            required
            label="Password"
            autoFocus
            type="password"
            onChange={onChangePassword}
            helperText={error}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Stack>
      </Box>
    </TitledContainer>
  );
}

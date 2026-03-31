import { useState } from 'react';
import {
  Button,
  TextInput,
  Stack,
  Paper,
  PasswordInput,
  Loader,
} from '@mantine/core';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginApi } from './auth.api';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    setError('');

    if (!form.username || !form.password) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);

      const data = await loginApi(form.username, form.password);

      // expected response: { user: 'admin', token: 'xxx' }
      login(data.user, data.token);

      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper p="lg" maw={320} mx="auto" mt="xl" withBorder>
      <Stack>
        <TextInput
          label="Username"
          value={form.username}
          onChange={(e) => handleChange('username', e.currentTarget.value)}
        />

        <PasswordInput
          label="Password"
          value={form.password}
          onChange={(e) => handleChange('password', e.currentTarget.value)}
        />

        {error && <div style={{ color: 'red' }}>{error}</div>}

        <Button onClick={handleLogin} disabled={loading}>
          {loading ? <Loader size="sm" /> : 'Login'}
        </Button>
      </Stack>
    </Paper>
  );
}
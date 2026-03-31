import { Group, Text } from '@mantine/core';
import { Button } from '@mantine/core';
import { useAuth } from '../../features/auth/AuthContext';

export default function Header() {
  const { logout } = useAuth();
  return (
    <Group justify="space-between" p="md">
      <Text fw={700}>Richmond Portal</Text>
      <Text size="sm">Welcome</Text>
      <Button onClick={logout}>Logout</Button>
    </Group>
  );
}
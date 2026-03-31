import { useEffect, useState } from 'react';
import { getUsers } from './users.api';
import { Button, Group } from '@mantine/core';
import UsersTable from './UsersTable';
import UserModal from './UserModal';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [opened, setOpened] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = () => {
    setSelectedUser(null);
    setOpened(true);
  };

  return (
    <>
      <Group justify="space-between" mb="md">
        <h2>Users</h2>
        <Button onClick={handleAdd}>Add User</Button>
      </Group>

      <UsersTable
        data={users}
        loading={loading}
        onEdit={(user: User) => {
          setSelectedUser(user);
          setOpened(true);
        }}
        onDelete={fetchUsers}
      />

      <UserModal
        opened={opened}
        onClose={() => setOpened(false)}
        user={selectedUser}
        refresh={fetchUsers}
      />
    </>
  );
}
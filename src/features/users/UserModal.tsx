import { Modal, TextInput, Button, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import { createUser, updateUser } from './users.api';
import { notifications } from '@mantine/notifications';

export default function UserModal({
  opened,
  onClose,
  user,
  refresh,
}: any) {
  const [form, setForm] = useState({
    name: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // preload when editing
  useEffect(() => {
    setError('');

    if (user) {
      setForm({
        name: user.name,
        email: user.email,
      });
    } else {
      setForm({ name: '', email: '' });
    }
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setError('');
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      setError('Invalid email format');
      return;
    }

    if (!form.name) {
      setError('Name is required');
      return;
    }

    if (!form.email) {
      setError('Email is required');
      return;
    }

    try {
      setLoading(true);

      if (user) {
        await updateUser(user.id, form);
        alert('User updated');
      } else {
        await createUser(form);
        notifications.show({
          title: 'Success',
          message: user ? 'User updated' : 'User created',
          color: 'green',
        });
      }

      refresh();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title={user ? 'Edit User' : 'Add User'}>
      <Stack>
        <TextInput
          label="Name"
          value={form.name}
          onChange={(e) => handleChange('name', e.currentTarget.value)}
        />

        <TextInput
          label="Email"
          value={form.email}
          onChange={(e) => handleChange('email', e.currentTarget.value)}
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <Button onClick={handleSubmit} loading={loading}>
          {user ? 'Update' : 'Create'}
        </Button>
      </Stack>
    </Modal>
  );
}
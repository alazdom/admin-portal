import { Table, Button, Group } from '@mantine/core';
import { deleteUser } from './users.api';
import { Modal } from '@mantine/core';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

export default function UsersTable({ data, onEdit, onDelete }: any) {

  const [deleteId, setDeleteId] = useState<number | null>(null);

  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map((user: any) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>

            <td>
              <Group>
                <Button size="xs" onClick={() => onEdit(user)}>
                  Edit
                </Button>

                <Button
                  size="xs"
                  color="red"
                  onClick={() => setDeleteId(user.id)}
                >
                  Delete
                </Button>
              </Group>
            </td>
          </tr>
        ))}
      </tbody>
      <Modal
        opened={deleteId !== null}
        onClose={() => setDeleteId(null)}
        title="Confirm Delete"
      >
        <p>Are you sure you want to delete this user?</p>

        <Group mt="md">
          <Button variant="default" onClick={() => setDeleteId(null)}>
            Cancel
          </Button>

          <Button
            color="red"
            onClick={async () => {
              if (deleteId !== null) {
                await deleteUser(deleteId);

                notifications.show({
                  title: 'Deleted',
                  message: 'User deleted successfully',
                  color: 'red',
                });

                onDelete();
                setDeleteId(null);
              }
            }}
          >
            Delete
          </Button>
        </Group>
      </Modal>
    </Table>
  );
}
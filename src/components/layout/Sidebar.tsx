// components/layout/Sidebar.tsx
import { Stack, NavLink } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import {
  IconLayoutDashboard,
  IconUsers,
} from '@tabler/icons-react';

const menu = [
  {
    label: 'Dashboard',
    path: '/',
    icon: IconLayoutDashboard,
  },
  {
    label: 'Users',
    path: '/users',
    icon: IconUsers,
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <Stack p="md" gap="xs">
      {menu.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            label={item.label}
            component={Link}
            to={item.path}
            leftSection={<Icon size={18} />}
            active={location.pathname === item.path}
            variant="light"
          />
        );
      })}
    </Stack>
  );
}
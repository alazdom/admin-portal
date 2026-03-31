let mockUsers = [
  { id: 1, name: 'Tikmon', email: 'tikmon@test.com' },
  { id: 2, name: 'Admin', email: 'admin@test.com' },
];

// GET
export const getUsers = async () => {
  await new Promise((res) => setTimeout(res, 500));
  return mockUsers;
};

// CREATE
export const createUser = async (payload: any) => {
  await new Promise((res) => setTimeout(res, 500));

  const newUser = {
    id: Date.now(),
    ...payload,
  };

  mockUsers.push(newUser);
  return newUser;
};

// UPDATE
export const updateUser = async (id: number, payload: any) => {
  await new Promise((res) => setTimeout(res, 500));

  mockUsers = mockUsers.map((u) =>
    u.id === id ? { ...u, ...payload } : u
  );

  return true;
};

// DELETE
export const deleteUser = async (id: number) => {
  await new Promise((res) => setTimeout(res, 500));

  mockUsers = mockUsers.filter((u) => u.id !== id);

  return true;
};
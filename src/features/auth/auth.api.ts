

export const loginApi = async (username: string, password: string) => {
  await new Promise((res) => setTimeout(res, 800)); // simulate delay

  if (username === 'admin' && password === '1234') {
    return {
      user: 'admin',
      token: 'fake-jwt-token',
    };
  }

  throw {
    response: {
      data: {
        message: 'Invalid credentials',
      },
    },
  };
};
import { rest } from 'msw';

export const login = rest.post('/login', (req, res, ctx) => {
  return res(ctx.status(200));
});

// Handles a GET /user request
export const getUser = rest.get('/user', (req, res, ctx) => {
  // Check if the user is authenticated in this session
  const isAuthenticated = sessionStorage.getItem('is-authenticated');
  if (!isAuthenticated) {
    // If not authenticated, respond with a 403 error
    return res(
      ctx.status(403),
      ctx.json({
        message: 'Not authorized',
      }),
    );
  }
  // If authenticated, return a mocked user details
  return res(
    ctx.status(200),
    ctx.json({
      username: 'admin',
    }),
  );
});

export const getUserSuccess = rest.get('/user', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      username: 'admin',
    }),
  );
});

export const getUserFailed = rest.get('/user', (req, res, ctx) => {
  return res(
    ctx.status(403),
    ctx.json({
      message: 'Not authorized',
    }),
  );
});

export const getUserError = rest.get('/user', (req, res, ctx) => {
  return res.networkError('Network Error');
});

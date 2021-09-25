import { rest } from 'msw';

export const login = rest.post('/login', (req, res, ctx) => {
  return res(ctx.status(200));
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

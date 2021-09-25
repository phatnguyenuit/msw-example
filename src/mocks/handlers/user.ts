import { rest } from 'msw';

export const login = rest.post('/login', (req, res, ctx) => {
  return res(ctx.status(200), ctx.delay());
});

export const getUserSuccess = rest.get('/user', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      message: 'Request success',
      data: {
        username: 'admin',
      },
    }),
    ctx.delay(),
  );
});

export const getUserFailed = rest.get('/user', (req, res, ctx) => {
  return res(
    ctx.status(403),
    ctx.json({
      message: 'Not authorized',
    }),
    ctx.delay(),
  );
});

export const getUserError = rest.get('/user', (req, res, ctx) => {
  return res.networkError('Network Error');
});

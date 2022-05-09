import auth   from './routes/auth';
import blog   from './routes/blog';
import users  from './routes/users';

export default [
  ...blog,
  ...users,
  ...auth
];

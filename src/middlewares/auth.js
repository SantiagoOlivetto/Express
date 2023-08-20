export const authUser = (req, res, next) => {
  if (req.session.user) {
    return req.session.user.email ? next() : res.send('Client authentication error');
  } else {
    return res.redirect('/login');
  }
};

export const authClient = (req, res, next) => {
  return req.session.user.role === 'client' ? next() : res.send('Client authentication error');
};

export const authAdmin = (req, res, next) => {
  return req.session.user.role === 'admin' ? next() : res.send('Authorization process deny');
};

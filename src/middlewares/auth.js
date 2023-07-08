export const authUser = (req, res, next) => {
  return req.session.user.email ? next() : res.send('Client authentication error');
};

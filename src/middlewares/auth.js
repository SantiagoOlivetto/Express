export const authUser = (req, res, next) => {
  return req.session.email ? next() : res.send('Client authentication error');
};

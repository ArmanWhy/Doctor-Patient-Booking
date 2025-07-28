// middlewares/mockAuth.js
export const mockAuth = (req, res, next) => {
  const userId = req.header('x-user-id');
  const role = req.header('x-user-role'); // 'patient' or 'doctor'

  if (!userId || !role) {
    return res.status(401).json({ message: 'Missing user role or ID in headers' });
  }

  req.user = {
    id: userId,
    role: role.toLowerCase()
  };

  next();
};

import jwt from 'jsonwebtoken';

export const generateAccessToken = (id, email, role) => {
  const payload = {
    id,
    email,
    role,
  };
  return jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET,
  );
};

export const generateHash = (payload, secret, time) => jwt.sign(
  { payload },
  secret,
  { expiresIn: time },
);

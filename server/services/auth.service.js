const prisma = require("../prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (name, email, password) => {
  if (!name || !email || !password) {
    const err = new Error("All fields are required");
    err.status = 400;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });
    const { password: _, ...safeUser } = user;
    return safeUser;
  } catch (err) {
    if (err.code === "P2002") {
      const error = new Error("Email already exists");
      error.status = 409;
      throw error;
    }
    throw err;
  }
}

exports.login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const err = new Error("Invalid email or password");
    err.status = 400;
    throw err;
  }

  const passwordMatches = bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    const err = new Error("Invalid email or password");
    err.status = 400;
    throw err;
  }

  // Generate access token
  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "12h" }
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken ,
      userId: user.id,
      expiresAt
    } 
  });

  const { password: _, ...safeUser } = user;

  return({
    user: safeUser,
    accessToken,
    refreshToken
  });
}

exports.refresh = async (refreshToken) => {
  if (!refreshToken) {
    const err = new Error("No refresh token provided");
    err.status = 401;
    throw err;
  }

  const storedToken = await prisma.refreshToken.findUnique({
    where: { token: refreshToken }
  });

  if (!storedToken) {
    const err = new Error("Invalid refresh token");
    err.status = 403;
    throw err;
  }

  // delete refresh token from db if expired
  if (storedToken.expiresAt < new Date()) {
    await prisma.refreshToken.delete({
      where: { id: storedToken.id }
    });
    const err = new Error("Refresh token expired");
    err.status = 403;
    throw err;
  }

  let decoded;
  try {
    decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
  } catch (err) {
    const error = new Error("Invalid refresh token");
    error.status = 403;
    throw error;
  } 

  const user = await prisma.user.findUnique({ where: { id: decoded.userId }});
  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }
  const accessToken = jwt.sign(
    { userId: user.id, },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );

  return accessToken;
}

exports.logout = async (refreshToken) => {
  if (refreshToken) {
    await prisma.refreshToken.deleteMany({
      where: { token: refreshToken }
    });
  }
}
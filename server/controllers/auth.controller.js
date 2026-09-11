const authService = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await authService.register(name, email, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "Registration failed"});
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    res.cookie("jwt", user.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 1000,
      secure: process.env.NODE_ENV === "production"
    });
    res.status(200).json({
      message: "Login successfull",
      "accessToken": user.accessToken,
      user: {
        id: user.user.id,
        name: user.user.name,
        email: user.user.email
      }
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "Login failed" });
  }
}

exports.refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies?.jwt;
    const accessToken = await authService.refresh(refreshToken);
    res.status(200).json({ "accessToken": accessToken });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
}

exports.logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.jwt;
    await authService.logout(refreshToken);

    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    });
    res.status(200).json({ message: "Logged out successfully" })
    
  } catch (err) {
      res.status(err.status || 500).json({ error: "Could'nt log you out" });
  }
}
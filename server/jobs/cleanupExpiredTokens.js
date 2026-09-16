const cleanupExpiredTokens = async () => {
  try {
    const result = await Token.deleteMany({ expiresAt: { $lt: new Date() } });
    console.log(`Expired tokens cleared: ${result.deletedCount}`);
  } catch (error) {
    console.error("Error clearing expired tokens:", error);
  }
}

module.exports = cleanupExpiredTokens;
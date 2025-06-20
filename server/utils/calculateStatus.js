const calculateStatus = (expiryDateStr) => {
  const today = new Date();
  const expiryDate = new Date(expiryDateStr);

  const diffInMs = expiryDate - today;
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 0) return "expired";
  if (diffInDays <= 5) return "nearly expired";
  return "fresh";
};

module.exports = calculateStatus;

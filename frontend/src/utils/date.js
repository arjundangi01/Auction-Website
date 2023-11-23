export const getDate = (createdAt) => {
  const date = new Date(createdAt);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  return { day, month };
};

export function calculateTimeRemaining(expirationDate) {
  const now = new Date();
  const expiration = new Date(expirationDate);

  // Calculate the difference in milliseconds
  const difference = expiration - now;

  // Convert the difference to days
  const daysRemaining = Math.floor(difference / (1000 * 60 * 60 * 24));

  return daysRemaining
  // return `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}`;
}
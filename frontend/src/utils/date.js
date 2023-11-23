export const getDate = (createdAt) => {
  const date = new Date(createdAt);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  return { day, month };
};

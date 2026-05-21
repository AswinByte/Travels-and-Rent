export const logger = (
  message,
  data = null
) => {

  const time =
    new Date().toLocaleString();

  console.log(
    `\n[${time}] ${message}`
  );

  if (data) {
    console.log(data);
  }

};
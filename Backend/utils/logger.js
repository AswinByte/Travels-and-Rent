export const logger = (
  message,
  data = null
) => {

  const time =
    new Date().toLocaleString();


  if (data) {
    console.log(data);
  }

};
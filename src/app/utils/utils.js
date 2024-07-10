
export const ParseJWT = (token) => {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(base64));
}

export const Enquiry = (customer, productId) => {
  return `
  Hello!\n
  I am interested in a product available at your store. Could you please help me with the following details?\n
  Price?\n
  Is this product available?\n
  https://litchies.com/product/${productId}\n
  \n
  Thank you,\n
  ${customer}\n
  Product Enquiry\n
  Found our app on play store\n
  https://play.google.com/store/apps/details?id=com.litchies`
}

export const ProductShare = (name, productId) => {
  return `
  Hello ${name} amazing product on Litchies!
  https://litchies.com/product/${productId}
  Start shopping now!`
};

export const MillisecondsToTime = (milliseconds) => {
  const date = new Date(milliseconds);
  
  const day = date.getDate();
  const month = date.getMonth() + 1; // getMonth() returns 0-11, adding 1 to make it 1-12
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const dayOfWeek = date.getDay(); // getDay() returns 0 (Sunday) to 6 (Saturday)

  return [day, month, year, hours, minutes, seconds, dayOfWeek];
};

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
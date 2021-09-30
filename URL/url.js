const url = "https://backend-nodejs-c8f42.ondigitalocean.app/bacend";
export const registerURL = `${url}/v1/auth/register`;
export const loginURL = `${url}/v1/auth/login`;
export const groupURL = `${url}/v1/accounts`;
export const billsURL = `${url}/v1/bills`;
export const token = localStorage.getItem("token");

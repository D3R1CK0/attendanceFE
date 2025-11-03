import axios from "axios";

export const commonapi = async (method, url, reqBody) => {
  const confiObj = {
    method: method,
    url: url,
    data: reqBody,
  };
  return await axios(confiObj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export default commonapi;

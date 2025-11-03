import { baseUrl } from "./BaseUrl";
import commonapi from "./CommonApi";

export const addDetails=async (reqBody) => {
    return await commonapi('post',`${baseUrl}/datas`,reqBody)
}
export const getDetails=async () => {
    return await commonapi(`get`,`${baseUrl}/datas`,"")
}
export const updateAttendance=async (id,reqBody) => {
    return await commonapi('put',`${baseUrl}/datas/${id}`,reqBody)
}
export const deleteStudent = async (id) => {
  return await commonapi('DELETE', `${baseUrl}/datas/${id}`, {});
};
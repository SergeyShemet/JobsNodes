import axios from "axios";

import authHeader from "./auth.header";

const API_URL = "http://localhost:8000/api/";

class UserService {
    getUserBoard() {
        return axios.get(API_URL, { headers: authHeader() });
    }

    getUsersById = (currentId) => {
        return axios.get(API_URL + "user?id=" + currentId, { headers: authHeader() });
    }
    getAllUsers = (currentId) => {
        return axios.get(API_URL + "user?id=" + currentId + "&usersall=true", { headers: authHeader() });
    }

    getUsersList = () => {
        return axios.get(API_URL + "user?userslist=true", { headers: authHeader() });
    }

    getJobsForUser = (currentId) => {
        return axios.get(API_URL + "user?id=" + currentId + "&jobsForUser=true", { headers: authHeader() });
    }

    getJobsForEmployes = (currentId) => {
        return axios.get(API_URL + "user?id=" + currentId + "&jobsForEmpl=true", { headers: authHeader() });
    }

    getAllJobs = () => {
        return axios.get(API_URL + "user?alljobs=true", { headers: authHeader() });
    }

    insertJob = (data) => {
        return axios.post(API_URL+"post", data, { headers: authHeader() });
    }

    updateJob = (data) => {
        return axios.put(API_URL + "post/" + data.id, data, { headers: authHeader() });
    }   



}
export default new UserService();

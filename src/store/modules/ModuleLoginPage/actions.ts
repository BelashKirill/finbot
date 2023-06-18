import axios from "axios";
import { dataInfo } from "@/constants";

const { urlServer } = dataInfo;

export default {
  async sendTokenUser(context, data: string) {
    return new Promise((resolve, reject) => {
      axios
        .post(urlServer + "/profile/token/", data)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

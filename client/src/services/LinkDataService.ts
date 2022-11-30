import http from "@/http-common";
import axios from "axios";

type Code = {
  id: number;
  shortcode_uuid: string;
  redirect_url: string;
  active: boolean;
};

class LinkDataService {
  protected baseUrl = "http://localhost:3000/api/v1/codes";
  getAll(): Promise<any> {
    return http.get("/codes");
  }

  get(id: any): Promise<any> {
    return http.get(`/codes/${id}`);
  }

  async update(id: any, request: any): Promise<any> {
    try {
      const { data } = await axios.patch<Code>(
        `${this.baseUrl}/${id}`,
        request,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }

  delete(id: any): Promise<any> {
    return http.delete(`/codes/${id}`);
  }
}

export default new LinkDataService();

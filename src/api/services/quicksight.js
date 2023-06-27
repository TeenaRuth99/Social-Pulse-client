import * as http from "./http";
import ApiService from "./service";

export class QuickSightService extends ApiService {
  async getEmbeddedURL(request) {
    const url = `${this.apiDomain}/api/dashboard_links/quicksight/${request.check}`;

    const response = await http
      .get(url, this.store, request.check)
      .catch((err) => console.log(err));
    return { data: response.data };
  }
}

import { stringify } from 'query-string';
import * as http from './http';
import ApiService from './service';

export class QuickSightService extends ApiService {
    // async getEmbeddedURL(request) {
    //     const url =
    //         //`${this.apiDomain}/api/dashboard_links/quicksight`;
    //         `http://localhost:3004/${request.resource}`;
    //     const response = await http
    //         .get(url, this.store)
    //         .catch((err) => console.log(err));
    //     return { data: response.data };
    // }
}

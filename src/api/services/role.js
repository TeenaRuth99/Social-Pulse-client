import * as http from './http';
import ApiService from './service';

export class RoleService extends ApiService {
    async getRole() {
        const url = `${this.apiDomain}/roles`;
        // const url = `${this.apiDomain}/${request.resource}?${stringify(query)}`;

        const response = await http
            .get(url, this.store)
            .catch((err) => console.log(err));
        return { data: response };
    }
}

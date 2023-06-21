// import * as http from './http';
import ApiService from './service';
import * as http from './http';

export class UserService extends ApiService {
    async addUser(request, data) {
        const url = `${this.apiDomain}/${request.resource}`;

        return http.post(url, data);
    }
    async getUserById(id) {
        const url = `${this.apiDomain}/users/get/${id}`;

        const response = await http
            .get(url, id)
            .catch((err) => console.log(err));
        return { data: response };
    }
    async updateUser(request, data) {
        const url = `${this.apiDomain}/${request.resource}`;
        return http.put(url, data);
    }
}

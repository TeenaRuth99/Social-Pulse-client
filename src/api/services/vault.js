import * as http from './http';
import ApiService from './service';

export class VaultService extends ApiService {
    async getVaultapi(request) {
        const url = `${this.apiDomain}/${request.resource}`;
        const response = await http
            .get(url, this.store)
            .catch((err) => console.log(err));
        return response;
    }

    async postSecret(request, data) {
        const url = `${this.apiDomain}/${request.resource}`;
        let res = await http.post(url, data, this.store);
        return res;
    }

    async getSecret(secret) {
        const url = `${this.apiDomain}/api/vault/${secret}`;
        let res = await http.get(url, this.store);
        return res?.data;
    }

    async deleteSecret(secret) {
        const url = `${this.apiDomain}/api/vault/${secret}`;
        let res = await http.remove(url, null, this.store);
        return res?.data;
    }
}

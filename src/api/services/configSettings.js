import { toastr } from 'react-redux-toastr';
import * as http from './http';
import ApiService from './service';

export class ConfigService extends ApiService {
    async getRecords() {
        const url = `${this.apiDomain}/api/configurationSettings`;
        const response = await http
            .get(url, this.store)
            .catch((err) => console.log(err));
        return response?.data?.data;
    }
    async updateRecords(data) {
        const url = `${this.apiDomain}/api/configurationSettings`;
        const response = await http
            .post(url, data, this.store)
            .catch((err) => console.log(err));
        return response?.data;
    }

    async getThresholdVal(type) {
        const url = `${this.apiDomain}/api/configurationSettings/thresholdValue/${type}`;
        const response = await http
            .get(url, this.store)
            .catch((err) => toastr.error('Error', err.message));
        if (response?.data?.status !== 200) {
            toastr.error('Error', response?.data?.message);
            return null;
        }
        return response?.data?.data;
    }
}

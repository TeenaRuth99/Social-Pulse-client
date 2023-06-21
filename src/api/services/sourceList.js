import * as http from './http';
import ApiService from './service';

export class SourceListService extends ApiService {
    async getSourceList(request) {
        const url = `${this.apiDomain}/${request.resource}`;
        const response = await http
            .get(url, this.store)
            .catch((err) => console.log(err));
        return { data: response.data };
    }

    async getSourceListbyTableName(request) {
        let { stringColOnly, resource, tableName } = request;
        const url = `${this.apiDomain}/${resource}/${tableName}`;
        return http.post(url, { stringColOnly }, this.store);
    }

    async getDateColumnsByTableName(request) {
        try {
            const url = `${this.apiDomain}${request.resource}`;
            let {
                data,
                data: { status },
            } = await http.get(url, this.store);
            if (status !== 200) {
                // toastr.error('Error', message);
                return null;
            }
            return data;
        } catch (error) {
            console.log(error.message);
        }
    }
}

import { stringify } from 'query-string';
import * as http from './http';
import ApiService from './service';
//import { formatConfigurationData } from '../../helper/formatConfigurationData';

export class CrudService extends ApiService {
    async getList1(request) {
        // const { limit, currentPage, search, sort, filter } = request;
        // const query = {
        //     search,
        //     limit,
        //     sort: JSON.stringify(sort),
        //     filter: JSON.stringify(filter),
        //     page: currentPage,
        // };

        // if (!search) {
        //     delete query.search;
        // }
        if (request.search != '') {
            const url = `${this.apiDomain}/users/${request.search}`;
            // const url = `${this.apiDomain}/${request.resource}?${stringify(query)}`;

            const response = await http
                .get(url, this.store, request.search)
                .catch((err) => console.log(err));
            return { data: response };
        } else if (
            request.filter?.role != undefined ||
            request.filter?.datasource != undefined
        ) {
            const url = `${this.apiDomain}/users/data/${JSON.stringify(
                request.filter,
            )}`;
            // const url = `${this.apiDomain}/${request.resource}?${stringify(query)}`;

            const response = await http
                .get(url, this.store, request.search, request.filter)
                .catch((err) => console.log(err));
            return { data: response };
        } else {
            const url = `${this.apiDomain}/${request.resource}`;
            // const url = `${this.apiDomain}/${request.resource}?${stringify(query)}`;

            const response = await http
                .get(url, this.store)
                .catch((err) => console.log(err));
            return { data: response };
        }
    }
    async addconfig(request, data) {
        const url = `${this.apiDomain}/${request.resource}`;

        return http.post(url, data);
    }
    async getEndpoint(request) {
        const url = `${this.apiDomain}/endpoints/${request.item}`;
        // const url = `${this.apiDomain}/${request.resource}?${stringify(query)}`;

        const response = await http
            .get(url, this.store, request.item)
            .catch((err) => console.log(err));
        return { data: response };
    }
    async getConfig(request) {
        const url = `${this.apiDomain}/config/${request.item}`;
        // const url = `${this.apiDomain}/${request.resource}?${stringify(query)}`;

        const response = await http
            .get(url, this.store, request.item)
            .catch((err) => console.log(err));
        return { data: response };
    }
    async getappname() {
        const url = `${this.apiDomain}/getappname`;
        // const url = `${this.apiDomain}/${request.resource}?${stringify(query)}`;

        const response = await http
            .get(url, this.store)
            .catch((err) => console.log(err));
        return { data: response };
    }
    async updateConfig(request, data) {
        const url = `${this.apiDomain}/${request.resource}`;
        return http.put(url, data);
    }
    async getList(request) {
        const { limit, currentPage, search, sort, filter } = request;
        const query = {
            search,
            limit,
            sort: JSON.stringify(sort),
            filter: JSON.stringify(filter),
            page: currentPage,
        };

        if (!search) {
            delete query.search;
        }

        const url = `${this.apiDomain}/${request.resource}?${stringify(query)}`;

        const response = await http
            .get(url, this.store)
            .catch((err) => console.log(err));
        return { data: response };
    }

    async postList(request) {
        const url = `${this.apiDomain}/${request.resource}`;

        const response = await http
            .get(url, this.store)
            .catch((err) => console.log(err));
        return { data: response.data };
    }
    async create(request, data) {
        const url = `${this.apiDomain}/${request.resource}`;
        console.log(data, { url });
        return http.post(url, data, this.store);
    }

    async get(request) {
        const url = `${this.apiDomain}/${request.resource}/${request.resourceId}`;
        return http.get(url, this.store);
    }

    async update(request, data) {
        const url = `${this.apiDomain}/${request.resource}/${request.resourceId}`;
        return http.put(url, data, this.store);
    }

    async removeMetricsbyId(request) {
        const url = `${this.apiDomain}/${request.resource}/${request.resourceId}`;
        return http.remove(url, this.store);
    }

    async removeAllMetrics(request, data) {
        const url = `${this.apiDomain}/${request.resource}`;
        return http.remove(url, data, this.store);
    }

    // async getAvailableRecordsBasedOnInputs(request) {
    //     let formatedData = formatConfigurationData(
    //         request.data,
    //         request.checkTypes,
    //     );
    //     return http.post(
    //         this.apiDomain + request.url,
    //         { data: formatedData },
    //         this.store,
    //     );
    // }
}

import {
    CrudService,
    UserService,
    AuthService,
    SourceListService,
    AzureService,
    AzureGraphService,
    VaultService,
} from './services';
import { ConfigService } from './services/configSettings';
import { RoleService } from './services/role';
import { ThemesService } from './services/themes';
import { QuickSightService } from './services/quicksight';

export default class EdsApiClient {
    crud;
    user;
    auth;
    azure;
    azureGraphApi;
    sourceList;
    quicksight;
    vault;
    store = {
        apiDomain: '',
        token: undefined,
    };

    constructor(apiDomain) {
        this.store.apiDomain = apiDomain;
        this.crud = new CrudService(this.store);
        this.user = new UserService(this.store);
        this.auth = new AuthService(this.store);
        this.sourceList = new SourceListService(this.store);
        this.rolelist = new RoleService(this.store);
        this.azure = new AzureService(this.store);
        this.azureGraphApi = new AzureGraphService();
        this.themes = new ThemesService(this.store);
        this.configSettings = new ConfigService(this.store);
        this.quicksight = new QuickSightService(this.store);
        this.vault = new VaultService(this.store);
    }

    setToken(token) {
        this.store.token = token;
    }
}

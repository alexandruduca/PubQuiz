import endpoints from '../../common/endpoints';
import { postRequest } from '../../http';
import { LoginCredentialsState } from '../../types/login';

const loginApi = (params: LoginCredentialsState) => postRequest(endpoints.login, params);

export default loginApi;

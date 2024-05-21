import endpoints from '../../common/endpoints';
import { postRequest } from '../../http';
import { RegisterCredentialsState } from '../../types/register';

const registerApi = (params: RegisterCredentialsState) => postRequest(endpoints.register, params);

export default registerApi;

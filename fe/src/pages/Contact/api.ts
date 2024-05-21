import endpoints from '../../common/endpoints';
import { postRequest } from '../../http';
import { ContactParamsState } from '../../types/contact';

const contactApi = (params: ContactParamsState) => postRequest(endpoints.contactInfo, params);

export default contactApi;

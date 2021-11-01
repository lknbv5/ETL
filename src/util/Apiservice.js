import {get,post} from './http';

export const getProjectlist=par=>get('api/Project/GetProjectList',par);
export const getProjectAllAttr=par=>get('GetAttribute/'+par.toString(),{});
export const getIsHasOtherApiAdd=par=>get('api/Project/GetIsHasOtherApiAdd',par);
export const getIsHasApiAdd=par=>get('api/Project/GetIsHasedApiAdd',par);
export const updateProject=par=>post('api/Project/UpdateProject',par);
export const saveProject=par=>post('api/Project/SaveProject',par);
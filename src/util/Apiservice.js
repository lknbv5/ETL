import {get,post} from './http';

export const getProjectlist=par=>get('api/Project/GetProjectList',par);
export const getProjectAllAttr=par=>get('GetAttribute/'+par.toString(),{});
export const getAttribute=par=>get('GetAttribute/'+par.projectAddr+'/'+par.attributeAddr,{});
export const getIsHasOtherApiAdd=par=>get('api/Project/GetIsHasOtherApiAdd',par);
export const getIsHasApiAdd=par=>get('api/Project/GetIsHasedApiAdd',par);
export const updateProject=par=>post('api/Project/UpdateProject',par);
export const saveProject=par=>post('api/Project/SaveProject',par);
export const deleteProject=par=>get('api/Project/DeleteProject',par);
export const deleteAttr=par=>get('api/Attribute/DelAttribute',par);
export const getAttributeList=par=>get('api/Attribute/GetAttributeListByProjectId',par);
export const getDicTree=async par=>get('api/CommonAttributeDic/GetCommonAttributeDicList',par);
export const setIsActive=par=>post("api/Attribute/SetIsActive",par);
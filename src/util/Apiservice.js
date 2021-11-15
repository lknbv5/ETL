import {httpget,httppost} from './http';

export const getProjectlist=par=>httpget('api/Project/GetProjectList',par);
export const getProjectAllAttr=par=>httpget('ETL/'+par.toString(),{});
export const getAttribute=par=>httpget('ETL/'+par.projectAddr+'/'+par.attributeAddr,{});
export const getIsHasOtherApiAdd=par=>httpget('api/Project/GetIsHasOtherApiAdd',par);
export const getIsHasApiAdd=par=>httpget('api/Project/GetIsHasedApiAdd',par);
export const updateProject=par=>httppost('api/Project/UpdateProject',par);
export const saveProject=par=>httppost('api/Project/SaveProject',par);
export const deleteProject=par=>httpget('api/Project/DeleteProject',par);
export const deleteAttr=par=>httpget('api/Attribute/DelAttribute',par);
export const getAttributeList=par=>httpget('api/Attribute/GetAttributeListByProjectId',par);
export const getDicTree=async par=>httpget('api/CommonAttributeDic/GetCommonAttributeDicList',par);
export const setIsActive=par=>httppost("api/Attribute/SetIsActive",par);
export const gerIshasSameAttrName=par=>httpget("api/Attribute/GetIshasSameAttrName",par);
export const gerIshasOtherSameAttrName=par=>httpget("api/Attribute/GetIshasOtherSameAttrName",par);
export const saveAttribute=par=>httppost("api/Attribute/SaveAttribute",par);
export const updateAttribute=par=>httppost("api/Attribute/UpdateAttribute",par);
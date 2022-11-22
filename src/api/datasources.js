/*
datasources

type (mutation, lookup, list, form) ? doing this could help set sensible cache values
name
query[role (defaults to all)]
variables (filters, sorts, offset, limit)
role
config (queryOptions, transform, dependencies)
return (data, loading, fetching, error)
dependencies (list of caches to clear due to a mutation update)
*/

import { useQuery } from "@tanstack/vue-query";
import {hasAccess} from "../utils/datautils";
import {capitalize} from "vue";
import queries from "../config/queries/index";

const config = {
    fetchUrl: '',
    jwtToken: null,
};

//these need to also contain a collection for dependencies
//needs to be a useUpdateData and useCreateData with a useMutationData
const mutations = Object.assign({}, JSON.parse(window.localStorage.getItem('mutations')));

export function useGetListData(datasource, variables, asRole, options) {
    //this should be a getMany
    return useGetData('lists', datasource, variables, asRole, options)
}
export function useGetLookupData(datasource, variables, asRole, options) {
    //this should be a getMany
    return useGetData('lookups', datasource, variables, asRole, options)
}
export function useGetFormData(datasource, variables, asRole, options) {
    //this should be a getSingle
    return useGetData('forms', datasource, variables, asRole, options)
}

function getDefaultOptions(type) {
    const options = {
        lists: {
            staleTime: 1000 * 60 * 2 //2 mins
        },
        lookups: {
            staleTime: 1000 * 60 * 10 //2 mins
        },
        forms: {
            staleTime: 0,
            refetchOnWindowFocus: false
        }
    }
    return options[type];
}

function getRoleHeader(wantedRole) {

    if (!wantedRole) {
        return null;
    }
    // let chosenRole = hasAccess('sysadmin') ? 'sysadmin' : 'rs_admin';
    // if (wantedRole == 'user') {
    //     chosenRole = 'user';
    // }
    // if (wantedRole == 'author' && !hasAccess('sysadmin') && !hasAccess('rs_admin')) {
    //     chosenRole = 'author';
    // }
    // if (wantedRole == 'leader' && !hasAccess('sysadmin') && !hasAccess('rs_admin') ) {
    //     chosenRole = 'leader';
    // }
    let chosenRole = wantedRole;

    return { 'X-Hasura-Role': chosenRole };

}

function useGetData(type, datasource, variables, asRole, options) {

    const queryObj = queries && queries[type] ? queries[type][datasource] : null;
    if (!queryObj) {
        return null
    }

    const defaultOptions = getDefaultOptions(type);

    return useQuery(
        [type, datasource, variables],
        async () => {
            //variables is referenced by value as it comes from a vue reactive ref
            const variableValues = variables?.__v_isRef ? variables.value : variables
            let data = await fetchQLData(queryObj, variableValues, asRole);
            return data[capitalize(datasource)];
        },
        Object.assign(defaultOptions, options)
    );
}

function isJWTInvalid(errors, isMutation) {
    var found = false
    errors.forEach(error => {
        try {
            const { extensions, message } = error;
            const { code } = extensions;

            //"auth failed"
            if (
                (code && code.includes('invalid-jwt')) ||
                message.includes('JWTExpired')
            ) {
                found = true;
            }
        } catch (ex) {
            console.log('error:', error);
        }
    });
    return found;
}

async function fakeQLData(queryObj, variables, asRole) {

    const queryRole = asRole ? asRole : 'all';
    const query = queryObj?.queries? queryObj.queries[queryRole] : null;
    if (!query) {
        return null;
    }

    const encodeObj = {query: query};
    if (variables){
        encodeObj.variables = JSON.stringify(variables)
    }
    const queryString = new URLSearchParams(encodeObj).toString();
    console.log(queryString)
    const url = `http://localhost:9002/graphql?${queryString}`;
    const res = await fetch(url);
    const json = await res.json();

    if (query.transformFunction) {
        return query.transformFunction(json.data);
    }

    return json.data;
}

async function fetchQLData(queryObj, variables, asRole) {

    return fakeQLData(queryObj, variables, asRole)

    const queryRole = asRole ? asRole : 'all';
    const query = queryObj?.queries? queryObj.queries[queryRole] : null;
    if (!query) {
        return null;
    }

    const roleHeader = getRoleHeader(asRole);

    const headers = {
        'Content-Type': 'application/json',
        ...roleHeader,
    }
    if (config.jwtToken) {
        headers.Authorization = 'Bearer ' + config.jwtToken
    }

    const res = await fetch(config.fetchUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
        if (isJWTInvalid(json.errors)) {
            //return await Auth.signOut();
        }
        if (query.errorFunction) {
            query.errorFunction(json.errors); //this can throw if it needs to
            return null;
        } else {
            throw new json.errors;
        }
    }

    if (query.transformFunction) {
        return query.transformFunction(json.data);
    }
    
    return json.data;
}

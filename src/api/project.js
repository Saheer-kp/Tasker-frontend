import api from './axios'

export const getProjects = () => {
    return api.get('v1/projects')
}

export const getSections = (projectId, cursor = null) => {
    return api.get(`v1/projects/${projectId}/sections`, {
        params: { cursor }
    })
}

export const getTasks = (sectionId, cursor = null) => {
    return api.get(`v1/sections/${sectionId}/tasks`, {
        params: { cursor }
    })
}
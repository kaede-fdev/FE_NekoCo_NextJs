import axiosClient from '../utils/axiosClient'

const END_POINT = {
    GET_ALL_FOLLOWING: "allFollowingUsers",
    USER_MESSAGE: "/messages"
}

export const getAllFollowingUser = (accessToken: string , userId: string) => {
    return axiosClient.get(END_POINT.GET_ALL_FOLLOWING + `?from=${userId}`, {
        headers: {
            "Authorization" : `Bearer ${accessToken}`
        }
    })
}
export const getUserChatMessage = (accessToken:string, userId:string, recipientId:string) => {
    return axiosClient.get(END_POINT.USER_MESSAGE + `?senderId=${userId}&recipientId=${recipientId}`, {
        headers: {
            "Authorization" : `Bearer ${accessToken}`
        }
    })
}
import { userUrl } from "."
import axios from "axios"

export const add_user = async (data) => {
    const res = await axios.post(`${userUrl}/newUser`, data)
    return res.data.name
}

export const add_room_code = async (data) => {
    const res = await axios.put(`${userUrl}/addRoomCode`, data)
    return res.data.data
}

export const get_user = async (data) => {
    const res = await axios.post(`${userUrl}/getUser`, data)
    return res.data.data.name
}
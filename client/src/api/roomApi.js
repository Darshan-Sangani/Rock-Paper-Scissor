import { roomUrl } from "."
import axios from "axios"

export const create_room = async () => {
    const room = await axios.post(`${roomUrl}/createRoom`)
    return room.data.data.roomCode
}

export const join_random_room = async () => {
    const data = await axios.get(`${roomUrl}/joinRandomRoom`)
    return data.data.rooms
}

export const get_total_players = async (data) => {
    const res = await axios.post(`${roomUrl}/getTotalPlayer`, data)
    return res.data.totalPlayer
}

export const remove_player = async (data) => {
    const res = await axios.put(`${roomUrl}/removePlayers`, data)
    return res
}
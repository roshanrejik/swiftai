import apiClient from "@/src/store/api/apiService";
import { API_URLS } from "../EndPoints";
import { useConverstationStore } from "@/src/store/chat";



const getConversations = async () => {
    const response = await apiClient.get(API_URLS.GET_CONVERSATIONS);
    useConverstationStore.getState().updateItems(response.data.data.items);
    return response;
}


const getMessages = async (conversationId: string) => {
    const response = await apiClient.get(`${API_URLS.GET_MESSAGES}/${conversationId}/messages`);
    return response;
}

export { getConversations ,getMessages};
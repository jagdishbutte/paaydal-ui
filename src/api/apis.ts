import { BASE_URL } from "@/lib/apiConnection";

export const userAuth = {
    LOGIN: `${BASE_URL}api/auth/login`,
    REGISTER: `${BASE_URL}api/auth/register`,
};

export const leaderTrek = {
    CREATE_NEW_TREK: `${BASE_URL}api/leader/treks/create-trek`,
    UPDATE_TREK: (trekId: string) => `${BASE_URL}api/leader/treks/update-trek/${trekId}`,
    DELETE_TREK: (trekId: string) => `${BASE_URL}api/leader/treks/delete-trek/${trekId}`,
};

export const userTrek = {
    GET_ALL_TREKS: `${BASE_URL}api/user/treks/get-all-treks`,
    GET_TREK_BY_ID: (trekId: string) => `${BASE_URL}api/user/treks/get-trek/${trekId}`,
    BOOK_TREK: (trekId: string) => `${BASE_URL}api/user/treks/book-trek/${trekId}`,
};
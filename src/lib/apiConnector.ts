"use client";
import axios from "axios";
import toast from "react-hot-toast";

export const axiosInstance = axios.create({});

export const apiConnector = async (
    method: string,
    url: string,
    data: object | null,
    headers: object | null,
    params: object | null,
    responseType:
        | "arraybuffer"
        | "blob"
        | "json"
        | "text"
        | "stream"
        | null
) => {
    try {
        const fields = {
            method: method,
            url: url,
            data: data || undefined,
            headers: headers || undefined,
            params: params || undefined,
            responseType: responseType || undefined,
        };

        const response = await axiosInstance(fields);

        return response;
    } catch (error: unknown) {
        if ((error as { response?: { status?: number } })?.response?.status === 408) {
            toast.error("Session Expired! Please login again.");
            setTimeout(() => {
                localStorage.clear();
                if (typeof window !== "undefined") window.location.reload();
            }, 200);
        }
        throw error;
    }
};

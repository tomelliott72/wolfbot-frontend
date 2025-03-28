export type ResponseMessage = {
    content: string;
    role: string;
};

export type ResponseContext = {
    data_points: string[];
};

export type ChatAppResponseOrError = {
    message: ResponseMessage;
    delta: ResponseMessage;
    context: ResponseContext;
    session_state: string;
    error?: string;
};

export type ChatAppResponse = {
    message: ResponseMessage;
    delta: ResponseMessage;
    context: ResponseContext;
    session_state: string;
};

export type ChatAppRequest = {
    messages: ResponseMessage[];
    context?: Record<string, unknown>;
    session_state: string;
};

export type SimpleAPIResponse = {
    message?: string;
};

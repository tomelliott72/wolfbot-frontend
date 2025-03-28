const BACKEND_URI = "https://capps-backend-jugyr2epntute.wonderfulwater-a743e18a.eastus2.azurecontainerapps.io/chat/stream";
import { getOrCreateSessionId } from "../utils/session";
import { defaultOverrides } from "./chatConfig";

export async function chatApi(request: ChatAppRequest): Promise<Response> {
  
  const fullRequest = {...request, session_state: getOrCreateSessionId(), overrides: defaultOverrides};

  return await fetch(BACKEND_URI, {method: "POST",headers: {"Content-Type": "application/json"},
    body: JSON.stringify(fullRequest)
  });
}

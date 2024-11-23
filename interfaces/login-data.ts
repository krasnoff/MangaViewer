export interface LoginData {
    access_token: string,
    expires_in: number,
    refresh_expires_in: number,
    refresh_token: string,
    token_type: "Bearer" | 'JWT',
    'not-before-policy': number,
    session_state: string,
    scope: string,
    client_type: "personal" | 'public'
}
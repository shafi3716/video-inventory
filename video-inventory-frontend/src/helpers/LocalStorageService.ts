interface TokenPayload {
    exp: number;
    [key: string]: any;
}

class LocalStorageService {
    private static tokenKey = 'authToken';

    static setToken(token: string): void {
        localStorage.setItem(LocalStorageService.tokenKey, token);
    }

    static getToken(): string | null {
        return localStorage.getItem(LocalStorageService.tokenKey);
    }

    static removeToken(): void {
        localStorage.removeItem(LocalStorageService.tokenKey);
    }

    static getTokenInfo(tokenStr?: string): TokenPayload | null {
        const token = tokenStr ?? LocalStorageService.getToken() ?? '';
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload as TokenPayload;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    static isTokenExpired(): boolean {
        const tokenInfo = LocalStorageService.getTokenInfo();
        if (!tokenInfo) return true;

        return tokenInfo.exp * 1000 < Date.now();
    }
}

export default LocalStorageService;

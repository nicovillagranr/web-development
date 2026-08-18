// ================= CONTEXTO MODULO =================
// Hook estático de Spotify — sin lógica real.
// Retorna estado fijo y callbacks noop. La integración OAuth está desactivada.
// ================= HOOK =================
export function useSpotify() {
    return {
        isConnected:     false,
        isLoading:       false,
        error:           "",
        spotify:         null,
        connect:         () => {},
        disconnect:      () => {},
        togglePlayPause: () => {},
        skipNext:        () => {},
        skipPrev:        () => {},
    };
}

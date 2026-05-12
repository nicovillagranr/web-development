import React from "react";

class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error) {
        return { hasError: true, error: error.message };
    }

    componentDidCatch() {
        console.log("Error atrapado");
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (!this.state.hasError) {
            return this.props.children;
        }

        const email = this.props.profile?.email;

        return (
            <div
                role="alert"
                aria-live="assertive"
                className="my-8 rounded-card border border-line bg-surface/60 backdrop-blur p-6 sm:p-10"
            >
                <div className="flex flex-col gap-4 sm:gap-6">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-badge border border-red-400/40 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-400">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse-dot" />
                            error
                        </span>
                        <span className="font-mono text-xs text-text-muted hidden sm:inline">
                            ErrorBoundary.jsx
                        </span>
                    </div>

                    <div>
                        <h2 className="font-heading text-2xl sm:text-3xl font-bold leading-tight text-text-primary">
                            Algo salió mal.
                        </h2>
                        <p className="mt-2 text-sm sm:text-base text-text-secondary">
                            Ocurrió un error inesperado al renderizar esta sección. Puedes
                            intentar recargar la página; si el problema persiste, avísame.
                        </p>
                    </div>

                    {this.state.error && (
                        <pre className="rounded-lg border border-line-hover bg-base-900/50 p-3 font-mono text-xs text-text-muted overflow-x-auto">
                            {this.state.error}
                        </pre>
                    )}

                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        <button
                            type="button"
                            onClick={this.handleReload}
                            className="hero-cta-shadow rounded-btn bg-linear-to-br from-accent to-cyan-400 px-4 py-2 text-xs sm:text-sm font-bold text-base-900 transition-transform hover:-translate-y-0.5"
                        >
                            Recargar página
                        </button>
                        {email && (
                            <a
                                href={`mailto:${email}?subject=Error en portfolio`}
                                className="rounded-btn border border-line-hover bg-base-900/50 px-4 py-2 text-xs sm:text-sm font-bold text-text-primary transition-all hover:-translate-y-0.5 hover:border-accent-border"
                            >
                                Reportar por email
                            </a>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default ErrorBoundary;

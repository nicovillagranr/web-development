import React from "react";

class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch() {
        console.log("Error atrapado");
    }

    render() {
        if (this.state.hasError) {
            return <h1>Algo salió mal. Por favor recarga la página.</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;

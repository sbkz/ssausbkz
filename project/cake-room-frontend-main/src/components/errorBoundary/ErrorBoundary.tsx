import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

type ErrorBoundaryProps = {
    children: React.ReactNode;
};

type ErrorBoundaryState = {
    error: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps,ErrorBoundaryState> {

    
    constructor(props:ErrorBoundaryProps) {
        super(props)
        this.state = {
            error: false
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log(error);
        console.log(errorInfo);
        this.setState({
            error: true
        })
    }

    render () {
        if(this.state.error) {
            return <ErrorMessage/>
        } 

        return this.props.children;
    }
}

export default ErrorBoundary;
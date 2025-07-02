import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasErrors: false };
  }

  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasErrors: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught", error, info);
  }

  render() {
    if (this.state.hasErrors) {
      return (
        <div style={{ background: "red", borderRadius: 10, padding: 20 }}>
          <h2>Something went wrong</h2>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

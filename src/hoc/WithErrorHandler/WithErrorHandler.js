import React, { Component } from "react";

import Model from "../../components/UI/Model/Model";

const withErrorHandler = (WrapperComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    errorModelHandler = () => {
      this.setState({
        error: null,
      });
    };

    componentWillMount() {
      this.reqInterceptors = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptors = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }

    render() {
      return (
        <>
          <Model
            show={this.state.error}
            model
            modelClose={() => this.errorModelHandler()}
          >
            {this.state.error ? this.state.error.message : null}
          </Model>
          <WrapperComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler;

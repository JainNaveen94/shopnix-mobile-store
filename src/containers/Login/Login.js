import React, { Component } from "react";

import loginCSS from "./Login.css";

import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Model from "../../components/UI/Model/Model";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import Input from "../../components/UI/Input/Input";

import axios from "../../services/axios/axios-product";

class Login extends Component {
  state = {
    loginForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "User Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    loading: false,
    loginModel: false,
    modelMessage: "",
  };

  modelCloseHandler = () => {
    this.setState({
      loginModel: false,
      modelMessage: "",
    });
  };

  getLoginDetails() {
    const formData = {};
    for (let formElementIdentifier in this.state.loginForm) {
      formData[formElementIdentifier] = this.state.loginForm[
        formElementIdentifier
      ].value;
    }
    console.log(formData);
    return formData;
  }

  generateLoginHandler = (event) => {
    this.setState({
      loading: true,
    });
    const loginDetails = this.getLoginDetails();
    if (loginDetails.name === "admin" && loginDetails.password === "admin") {
      localStorage.setItem("Token", loginDetails.name);
      this.setState({
        loading: false,
      });
      this.props.history.push("/products");
    } else {
      localStorage.removeItem("Token");
      this.setState({
        loading: false,
        loginModel: true,
        modelMessage: "Please Enter the Valid Credentials To Login",
        loginForm: {
          name: {
            elementType: "input",
            elementConfig: {
              type: "text",
              placeholder: "User Name",
            },
            value: "",
            validation: {
              required: true,
            },
            valid: false,
            touched: false,
          },
          password: {
            elementType: "input",
            elementConfig: {
              type: "password",
              placeholder: "Password",
            },
            value: "",
            validation: {
              required: true,
            },
            valid: false,
            touched: false,
          },
        },
      });
    }
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.loginForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ loginForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.loginForm) {
      formElementsArray.push({
        id: key,
        config: this.state.loginForm[key],
      });
    }
    let form = (
      <>
        <form>
          {formElementsArray.map((formElement) => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event) =>
                this.inputChangedHandler(event, formElement.id)
              }
            />
          ))}
        </form>
        <Button
          btnType="Success"
          disabled={!this.state.formIsValid}
          clicked={this.generateLoginHandler}
        >
          Login
        </Button>
      </>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <>
        <Model
          show={this.state.loginModel}
          modelClose={() => this.modelCloseHandler()}
        >
          <h3>{this.state.modelMessage}</h3>
        </Model>
        <div className={loginCSS.LoginData}>
          <p>::: Enter Your Login Details :::</p>
          {form}
        </div>
      </>
    );
  }
}

export default WithErrorHandler(Login, axios);

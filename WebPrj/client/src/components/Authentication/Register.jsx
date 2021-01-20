import React, { Component } from "react";


import { connect } from "react-redux";
import { register } from "../../actions/auth";

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });


      this.props
          .dispatch(
              register(this.state.username, this.state.email, this.state.password)
          )
          .then(() => {
            this.setState({
              successful: true,
            });
          })
          .catch(() => {
            this.setState({
              successful: false,
            });
          });
  }

  render() {
    const { message } = this.props;

    return (
        <div className="col-md-12">
          <div className="card card-container">
            <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
            />

            <form
                onSubmit={this.handleRegister}
                ref={(c) => {
                  this.form = c;
                }}
            >
              {!this.state.successful && (
                  <div>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                          type="text"
                          className="form-control"
                          name="username"
                          value={this.state.username}
                          onChange={this.onChangeUsername}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                          type="text"
                          className="form-control"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChangeEmail}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                          type="password"
                          className="form-control"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChangePassword}
                      />
                    </div>

                    <div className="form-group">
                      <button className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                  </div>
              )}

              {message && (
                  <div className="form-group">
                    <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                      {message}
                    </div>
                  </div>
              )}
            </form>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(Register);
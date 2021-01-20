import React from "react";
import {Link} from "react-router-dom";
import {logout} from "../actions/auth";
import {connect} from "react-redux";

class Navbar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined,
        };
        this.logOut = this.logOut.bind(this);

    }


    componentDidMount() {
        const user = this.props.user;

        if (user) {
            this.setState({
                currentUser: user,
                showPMContent: user.roles.includes("ROLE_PM"),
                showTeacherContent: user.roles.includes("ROLE_TEACHER"),
                showAdminContent: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }

    logOut() {
        this.props.dispatch(logout());
    }

    render() {
        return (
                <nav className="navbar navbar-expand navbar-dark bg-primary">
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                        </li>

                        {this.state.currentUser && this.state.showPMContent ? (
                            <li className="nav-item">
                                <Link to={"/projects"} className="nav-link">
                                    Projects list
                                </Link>
                            </li>
                        ) : ""}
                    </div>

                    {this.state.currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {this.state.currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut}>
                                    Logout
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}


export default  connect(mapStateToProps)(Navbar);
import React from 'react'

import ProjectService from "../../service/ProjectService";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";

class AddProject extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            project: {
                name: undefined,
                description: undefined,
                deliveryDate: undefined,
                projectLink: undefined
            },
            loading: false
        }

        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeLink = this.handleChangeLink.bind(this);
        this.saveProject = this.saveProject.bind(this);
    }

    saveProject(e) {
        this.setState({
            loading: true
        })

        let {project} = this.state;
        if (this.props.history.location.state.editMode) {
            ProjectService.updateProject(this.state.project.id, project).then(
                (res) => {
                    console.log(res);
                }
            ).then(() => this.props.history.push({pathname: '/project/' + this.state.project.id}))
        } else {
            ProjectService.createNewProject(project).then(
                (res) => {
                    console.log(res);
                }
            )
            this.props.history.push({pathname: '/projects', state: {reload: true}})
        }
    }

    componentDidMount() {
        if (this.props.history.location.state.editMode) {
            this.setState({
                project: {
                    ...this.props.history.location.state.project,
                    deliveryDate: new Date(this.props.history.location.state.project.deliveryDate)
                }
            })
        }
    }

    handleChangeName(e) {
        this.setState({
            project: {
                ...this.state.project,
                name: e.target.value,
            }
        });
    }

    handleChangeDescription(e) {
        this.setState({
            project: {
                ...this.state.project,
                description: e.target.value,
            }
        });
    }

    handleChangeLink(e) {
        this.setState({
            project: {
                ...this.state.project,
                projectLink: e.target.value,
            }
        });
    }

    handleChangeDate(e) {

        this.setState({
            project: {
                ...this.state.project,
                deliveryDate: e,
            }
        });
    }

    render() {
        return (
            <>
                <form
                >
                    <div className="form-group">
                        <label htmlFor="name">Project name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={this.state.project?.name}
                            onChange={this.handleChangeName}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            value={this.state.project?.description}
                            onChange={this.handleChangeDescription}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Delivery date</label>
                        <DatePicker
                            selected={this.state.project.deliveryDate}
                            onChange={(date) => this.handleChangeDate(date)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="link">Link</label>
                        <input
                            type="text"
                            className="form-control"
                            id="link"
                            value={this.state.project?.projectLink}
                            onChange={this.handleChangeLink}
                        />
                    </div>

                    <div className="form-group">
                        <Button
                            variant="outline-primary"
                            disabled={this.state.loading}
                            onClick={this.saveProject}
                        >
                            {this.state.loading && (
                                <span className="spinner-border spinner-border-sm"/>
                            )}
                            <span>Save</span>
                        </Button>
                    </div>
                </form>
            </>
        );
    }

}

export default AddProject;
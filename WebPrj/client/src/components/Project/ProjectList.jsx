import React from 'react'
import ProjectService from "../../service/ProjectService";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            update: false
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.update) {
            this.getProjects();
            this.setState({update: false})
        }
    }

    componentDidMount() {
        this.getProjects();
    }

    getProjects() {
        ProjectService.getAllProjects().then(
            (res) => {
                console.log(res);
                console.log(this.props)
                this.setState({
                    projects: res.data
                });
            }
        ).then(() => this.setState({update: !!this.props.history.location?.state?.reload}))
    }

    render() {
        return (
            <>
                <ListGroup>
                    {this.state.projects?.map((project, index) => {
                        return (
                            <>
                                <ListGroup.Item
                                    key={index}
                                    onClick={() => this.props.history.push({pathname: '/project/' + project.id})}
                                >
                                    {project.name}
                                </ListGroup.Item>
                            </>
                        )
                    })}
                </ListGroup>
                <br/>
                <Button
                    variant="primary"
                    onClick={() => this.props.history.push({pathname: '/addProject'})}
                >
                    Add project
                </Button>
            </>
        )
    }
}

export default ProjectList;
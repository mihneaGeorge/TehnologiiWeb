import React from 'react'
import ProjectService from "../../service/ProjectService";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import PartialDeliverableService from "../../service/PartialDeliverableService";
import {BsX} from 'react-icons/bs'

class ViewProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: undefined,
            userOnProject: false,
            showPartialDeliverableModal: false,
            showGradeModal: false,
            grade: undefined,
            canAddGrade: false,
            partialDeliverable: {
                name: undefined,
                description: undefined,
                deliveryDate: undefined
            },
            update: false,
            averageGrade: undefined,
        }

        this.openPartialDeliverableModal = this.openPartialDeliverableModal.bind(this);
        this.closePartialDeliverableModal = this.closePartialDeliverableModal.bind(this);
        this.saveDeliverable = this.saveDeliverable.bind(this);
        this.openGradeModal = this.openGradeModal.bind(this);
        this.closeGradeModal = this.closeGradeModal.bind(this);
        this.saveGrade = this.saveGrade.bind(this);
        this.handleDeliverableDescChange = this.handleDeliverableDescChange.bind(this);
        this.handleDeliverableNameChange = this.handleDeliverableNameChange.bind(this);
        this.handleDeliverableDateChange = this.handleDeliverableDateChange.bind(this);
        this.handleGradeChange = this.handleGradeChange.bind(this);
        this.getProject = this.getProject.bind(this);
        this.calculateAverageGrade = this.calculateAverageGrade.bind(this);
    }

    handleDeliverableDescChange(e) {
        this.setState({
            partialDeliverable: {
                ...this.state.partialDeliverable,
                description: e.target.value
            }
        })
    }

    handleDeliverableNameChange(e) {
        this.setState({
            partialDeliverable: {
                ...this.state.partialDeliverable,
                name: e.target.value
            }
        })
    }

    handleDeliverableDateChange(e) {
        this.setState({
            partialDeliverable: {
                ...this.state.partialDeliverable,
                deliveryDate: e
            }
        })
    }

    handleGradeChange(e) {
        this.setState({
            grade: e.target.value
        })
    }

    openGradeModal() {
        this.setState({
            showGradeModal: true
        })
    }

    closeGradeModal() {
        this.setState({
            showGradeModal: false
        })
    }

    saveGrade() {
        let grades = this.state.project.grades;
        if (!grades) {
            grades = []
        }

        grades.push(this.state.grade);

        this.setState({
            project: {
                ...this.state.project,
                grades: grades
            }
        }, () => ProjectService.updateProject(this.state.project.id, this.state.project).then(
            (res) => {
                console.log(res);
                this.setState({
                    showGradeModal: false,
                    update: true
                })
            }
        ))
    }

    getProject() {
        ProjectService.getProjectById(this.props.match.params.id).then(
            (res) => {
                console.log(res);
                this.setState({
                    project: res.data,
                    update: true
                })
            }
        ).then(() => {
            if (this.state.project?.members?.find(item => item === this.props.user.username)) {
                this.setState({
                    userOnProject: true
                })
            } else {
                this.setState({
                    userOnProject: false
                })
            }
        }).then(() => {
            if (!this.state.userOnProject ) {
                this.setState({
                    canAddGrade: true
                })
            } else {
                if (this.props.user.roles.includes("ROLE_TEACHER")) {
                    this.setState({
                        canAddGrade: true
                    })
                } else {
                    this.setState({
                        canAddGrade: false
                    })
                }
            }
        }).then(() => this.calculateAverageGrade());
    }

    componentDidMount() {
        this.getProject();
    }

    render() {
        return(
            <>
                <ListGroup>
                    <ListGroup.Item><strong>Project name: </strong>{this.state.project?.name}</ListGroup.Item>
                    <ListGroup.Item><strong>Description: </strong>{this.state.project?.description}</ListGroup.Item>
                    <ListGroup.Item><strong>Link: </strong>{this.state.project?.projectLink}</ListGroup.Item>
                    <ListGroup.Item><strong>Delivery date: </strong>{this.state.project?.deliveryDate}</ListGroup.Item>
                    <ListGroup.Item><strong>Members: </strong><div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        {this.state.userOnProject ?
                        <Button
                            variant="outline-primary"
                            onClick={() => this.joinOrLeaveProject()}
                        >
                                Leave project
                        </Button>
                            :
                        <Button
                            variant="outline-primary"
                            onClick={() => this.joinOrLeaveProject()}
                        >
                            Add yourself as a member
                        </Button>
                        }
                    </div></ListGroup.Item>
                    {this.state.project?.members ?
                        this.state.project.members.map((member, index) => {
                            return <ListGroup.Item key={index}>{member}</ListGroup.Item>
                        })
                        :
                        <ListGroup.Item>No members</ListGroup.Item>
                    }
                    <ListGroup.Item><strong>Deliverables: </strong><div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        {this.state.project?.members?.find(item => item === this.props.user.username) ?
                        <Button
                            variant="outline-primary"
                            onClick={this.openPartialDeliverableModal}
                        >
                            Add a deliverable
                        </Button>
                            :
                            ""}
                        <Modal show={this.state.showPartialDeliverableModal} onHide={this.closePartialDeliverableModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add partial deliverable</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group controlId="deliverableName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter deliverable name" onChange={this.handleDeliverableNameChange}/>
                                    </Form.Group>
                                    <Form.Group controlId="deliverableDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" placeholder="Enter deliverable description" onChange={this.handleDeliverableDescChange}/>
                                    </Form.Group>
                                    <Form.Group controlId="deliverableDate">
                                        <Form.Label>Date</Form.Label>
                                        <DatePicker
                                            selected={this.state.partialDeliverable.deliveryDate}
                                            onChange={(date) => this.handleDeliverableDateChange(date)}
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.closePartialDeliverableModal}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={this.saveDeliverable}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div></ListGroup.Item>
                    {this.state.project?.partialDeliverables && this.state.project.partialDeliverables !== [] ?
                        this.state.project.partialDeliverables.map((partialDeliverable, index) => {
                            return (
                                <>
                                    <ListGroup.Item key={index} style={{position: 'relative'}}>
                                        {partialDeliverable.name}
                                        <BsX
                                            style={{position: 'absolute', right: '25px', top: '15px'}}
                                            onClick={() => this.deleteDeliverable(partialDeliverable)}
                                        />
                                    </ListGroup.Item>

                                </>
                            )
                        })
                        :
                        <ListGroup.Item>No partial deliverables</ListGroup.Item>
                    }
                    <ListGroup.Item><strong>Average grade: </strong>{this.state.averageGrade}
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        {this.state.canAddGrade ?
                            <Button
                                variant="outline-primary"
                                onClick={this.openGradeModal}
                            >
                                Add a grade
                            </Button>
                            :
                            ""}
                        {this.props.user.roles.includes("ROLE_TEACHER") ?
                            <Button
                                variant="outline-primary"
                                onClick={() => {
                                    this.props.history.push({
                                        pathname: '/grades/' + this.state.project.id,
                                        state: {
                                            project: this.state.project
                                        }
                                    })
                                }}
                            >
                                See grades
                            </Button>
                            :
                            ""
                        }
                        <Modal show={this.state.showGradeModal} onHide={this.closeGradeModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add grade</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group controlId="grade">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="decimal" placeholder="Enter a grade" onChange={this.handleGradeChange}/>
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.closeGradeModal}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={this.saveGrade}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div></ListGroup.Item>
                </ListGroup>
                <br/>
                <Button
                    variant="primary"
                    onClick={() => this.deleteProject()}
                >
                    Delete project
                </Button>
                {" "}
                <Button
                    variant="primary"
                    onClick={() => this.editProject()}
                >Edit project</Button>
            </>
        )
    }

    editProject() {
        this.props.history.push({
            pathname: "/addProject/" + this.state.project.id,
            state: {
                project: this.state.project,
                editMode: true
            }
        })
    }

    deleteProject() {
        ProjectService.deleteProjectById(this.state.project.id).then(
            (res) => {
                console.log(res);
                this.props.history.push({pathname: "/projects"})
            }
        )
    }

    openPartialDeliverableModal() {
        console.log("asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfzxcvbxzcbvdfghe4trwert")
        this.setState({
            showPartialDeliverableModal: true
        })
    }

    saveDeliverable() {
        console.log(this.state.partialDeliverable);
        PartialDeliverableService.createNewPartialDeliverable(this.state.partialDeliverable).then(
            (res) => {
                let partialDeliverables = [];
                if (this.state.project.partialDeliverables) {
                    partialDeliverables = this.state.project.partialDeliverables;
                }
                partialDeliverables.push({
                    name: res.data.name,
                    id: res.data.id,
                    description: res.data.description,
                    deliveryDate: res.data.deliveryDate
                })

                this.setState({
                    project: {
                        ...this.state.project,
                        partialDeliverables: partialDeliverables
                    }
                }, () => {
                    ProjectService.updateProject(this.state.project.id, this.state.project).then(
                        (res) => {
                            console.log(res);
                        }
                    ).then(() => this.setState({showPartialDeliverableModal: false}));
                })

            }
        )
    }
    deleteDeliverable(partialDeliverable) {
        PartialDeliverableService.deletePartialDeliverableById(partialDeliverable.id).then(
            (res) => {
                let partialDeliverables = this.state.project.partialDeliverables;
                partialDeliverables = partialDeliverables.filter(item => item.id !== partialDeliverable.id)

                this.setState({
                    project: {
                        ...this.state.project,
                        partialDeliverables: partialDeliverables
                    }
                }, () => {
                    ProjectService.updateProject(this.state.project.id, this.state.project).then(
                        (res) => {
                            console.log(res);
                        }
                    ).then(() => this.setState({update: true}));
                })

            }
        )
    }

    closePartialDeliverableModal() {
        this.setState({
            showPartialDeliverableModal: false
        })
    }

    joinOrLeaveProject() {
        console.log(this.props.user);
        let members = this.state.project.members;
        console.log(this.state.project)
        console.log(members)
        if (this.state.userOnProject) {
            if (!members) {
                // should not get here
                return;
            }
            members = members.filter(item => item !== this.props.user.username);
            console.log(members)
            this.setState({
                userOnProject: false,
                canAddGrade: true
            })
        } else {
            if (!members) {
                members = [];
            }
            members.push(this.props.user.username);
            this.setState({
                userOnProject: true,
                canAddGrade: false
            })
        }
        this.setState({
            project: {
                ...this.state.project,
                members
            }
        }, () => {
            console.log(this.state.project)
            ProjectService.updateProject(this.state.project.id, this.state.project).then(
                (res) => {
                    console.log(res);
                }
            );
        });

    }

    calculateAverageGrade() {
        if (this.state.project?.grades) {
            let grades = this.state.project?.grades?.sort((a,b) => a - b);
            console.log(grades);
            grades = grades.slice(1, -1);
            console.log(grades)
            let numGrades = grades.length;
            let sum = grades.reduce((a, b) => a + b);

            this.setState({
                averageGrade: sum / numGrades
            });
        }
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}

export default  connect(mapStateToProps)(ViewProject);
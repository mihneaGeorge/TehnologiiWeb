import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

class ViewGrades extends React.Component{
    render() {
        console.log(this.props)
        return (
            <>
                <ListGroup>
                {this.props.history.location.state.project?.grades?.map((grade, index) => {
                    console.log(grade)
                    return (
                        <>
                            <ListGroup.Item key={index}>{grade}</ListGroup.Item>
                        </>
                    )
                })}
                </ListGroup>
            </>
        );
    }
}

export default ViewGrades;
import React from "react";
import Table from "react-bootstrap/Table";
//import { faBoxTissue } from "@fortawesome/free-solid-svg-icons";

class ListComponent extends React.Component {
  render(props) {
    return (
      <Table striped bordered hover size="sm" variant="dark">
        <thead>{this.props.header}</thead>
        <tbody>{this.props.listItems}</tbody>
      </Table>
    );
  }
}

export default ListComponent;

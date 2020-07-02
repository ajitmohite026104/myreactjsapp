import React from "react";

class ListComponent extends React.Component {
  render(props) {
    return <div className="row">{this.props.cardList}</div>;
  }
}

export default ListComponent;


//import Table from "react-bootstrap/Table";
//import { faBoxTissue } from "@fortawesome/free-solid-svg-icons";

/* <Table striped bordered hover size="sm" variant="dark">
  <thead>{this.props.header}</thead>
  <tbody>{this.props.listItems}</tbody>
</Table> */
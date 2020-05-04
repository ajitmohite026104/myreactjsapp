import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';

class SearchComponent extends React.Component{
    state = {
        searchText: ''
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.searchText);
        alert('Thank you for visiting our website, we are creating something great stuff on '+ this.state.searchText);
    };

    render(){
        return(
            <Form inline className="col-md-8" onSubmit={this.handleSubmit}>
                        {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
                        <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Search..."
                        aria-label="Search"
                        aria-describedby="searchText"
                        value={this.state.searchText}
                        onChange={event => this.setState({ searchText : event.target.value })}
                        className="mr-sm-2"
                    />
                    </InputGroup>
                    <Button variant="outline-success" type="submit">Search</Button>
            </Form>
        );
    }
};

export default SearchComponent;
import React, { Component } from 'react';
import { Card, Button, Input } from 'antd';
import { connect } from 'react-redux';
import { Menu, Dropdown, Icon } from 'antd';

import './index.css';
import { getIdeas, createNewIdea, updateIdea, deleteIdea } from './action';
import deleteIcon from '../../trash-icon.svg';

const { TextArea } = Input;

class Home extends Component {
    state = {
        ideas: [],
        sortOption: "Sort By created date"
    }

    componentDidMount() {
        this.props.getIdeas();
    }

    componentWillReceiveProps(props) {
        if (props.homeReducer.ideas !== this.props.homeReducer.ideas) {
            this.setState(() => ({ ideas: props.homeReducer.ideas }));
        }
        if (props.homeReducer.newIdea !== this.props.homeReducer.newIdea) {
            this.state.ideas.push(props.homeReducer.newIdea);
            this.setState(this.state.ideas);
        }
    }

    addNewIdea = () => {
        this.props.createNewIdea();
    }

    updateIdea = (idea) => {
        this.props.updateIdea(idea);
    }

    deleteIdea = (idea) => {
        this.props.deleteIdea(idea);
    }

    changeSortingOption = (option) => {
        this.setState(() => ({sortOption: option.item.props.children}), () => this.sortIdeasArray(option));
    }

    sortIdeasArray = (option) => {
        if (option.key === "1") {
            this.state.ideas.sort(( prev, next ) => {
                return prev.title < next.title ? -1 : prev.title > next.title ? 1 : 0;
            });
            this.setState(this.state.ideas);
        } else {
            this.state.ideas.sort((prev, next) => {
                prev = new Date(prev.created_date);
                next = new Date(next.created_date);
                return prev > next ? -1 : prev < next ? 1 : 0;
             });
            this.setState(this.state.ideas);
        }
    }

    handleTitleChange = (event, index) => {
        this.state.ideas[index].title = event.target.value;
        this.setState(this.state.ideas);
    }

    handleBodyChange = (event, index) => {
        this.state.ideas[index].body = event.target.value;
        this.setState(this.state.ideas);
    }

    menu = (
        <Menu onClick= {this.changeSortingOption} >
          <Menu.Item key="0">
            Sort By created date
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="1">
            Sort by title
          </Menu.Item>
          <Menu.Divider />
        </Menu>
    );

    render() {
        const { ideas } = this.state;
        return (
        <div className="ideas-container">
            <div className="dropdown">
                <h1>RangeWell</h1>
                <div>Sort Option: <Dropdown overlay={this.menu} trigger={['click']}>
                    <a className="ant-dropdown-link" href="#">
                        {this.state.sortOption} <Icon type="down" />
                    </a>
                </Dropdown></div>
            </div>

            {ideas.map((idea, index) => <Card key={index} title={ <Input type="text" onChange={(event) => this.handleTitleChange(event, index)} onBlur={() => this.updateIdea(idea)} value={idea.title}/> } className="card-container">
                <TextArea rows={4} onChange={(event) => this.handleBodyChange(event, index)} onBlur={() => this.updateIdea(idea)} value={idea.body} />
                <div className="delete-icon" onClick={() => this.deleteIdea(idea)}> Delete <img alt="delete" src={deleteIcon} /> </div>
            </Card>)}

            <Button className="add-button" type="primary" shape="circle" icon="plus-circle-o" onClick={this.addNewIdea} />
        </div>
        );
    }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getIdeas, createNewIdea, updateIdea, deleteIdea })(Home);

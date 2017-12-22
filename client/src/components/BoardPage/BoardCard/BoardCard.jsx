import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import DeleteIcon from 'material-ui-icons/delete';

import './BoardCard.scss';

class BoardCard extends Component {
    constructor () {
        super();

        this.handleBoardDelete = this.handleBoardDelete.bind(this);
    }

    handleBoardDelete (e) {
        e.stopPropagation();
        
        const { id }  = this.props;

        this.props.onDelete(id);
    }

    render () {
        const styles = {
            position: 'absolute',
            color: 'rgba(255, 255, 255, 1)'
        };
        const id = this.props.id;
        const title = this.props.title;

        return (
            <div className="col-3">
<<<<<<< HEAD
                <Link
                    className = "ard-custom board-card text-white bg-card p-2" 
                    to = {`/boards/${id}/${title}`}>
                    <div>
=======
                <Link to = {`/boards/${id}/${title}`}>
                    <div 
                        className="card-custom board-card text-white bg-card p-2"
                    >
>>>>>>> 81cf88af280bef14b434ff9db4ec27c8fa955a60
                        { this.props.title }
                        <DeleteIcon 
                            className="delete-icon"
                            style={ styles }
                            onClick = { this.handleBoardDelete }
                        />
                    </div>
                </Link>  
            </div>
        );
    }
};

BoardCard.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

export default withRouter(BoardCard);

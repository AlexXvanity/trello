import React, { Component } from 'react';
import TitleForm from '../../TitleForm/TitleForm.jsx';
import '../../TitleForm/titleForm.scss';
import { connect } from 'react-redux';
import { fetchTitleMiddleware } from '../../../middlewares/title';
import { updateBoardMiddleware } from '../../../middlewares/boards';

class BoardTitle extends Component {
    constructor () {
        super();
        this.state = {
            isFormOpen: false
        };
        this.changeTitle = this.changeTitle.bind(this);
        this.openForm = this.openForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        const { boardId, title } = nextProps;

        if (!title) {
            this.props.onFetchBoardTitle(boardId);
        } else if (nextProps.title === this.props.title) {
            this.props.onFetchBoardTitle(boardId);
        }
    }

    changeTitle () {
        const title = this.props.title;
        const currentValue = this.formInput.value;

        if (title === currentValue)  {
            this.formInput = ''; 
            this.closeForm();
        } else {
            const boardId = this.props.boardId;
            
            this.props.onUpdateBoardTitle(boardId, currentValue);
            this.closeForm(); 
        }
    }

    openForm () {
        this.setState({isFormOpen: true});
    }

    closeForm () {
        this.setState({isFormOpen: false});
    }

    render () {
        const isOpen = this.state.isFormOpen;
        const title = this.props.title;
        
        return (
            <div className = "list-page__title-wrap">
                <h2 
                    onClick = {this.openForm} 
                    className = "list-page__title">{title}
                </h2>
                <div className = "list-page__form-wrap">
                    {
                        isOpen ? 
                            <TitleForm
                                inputRef={(input) => this.formInput = input} 
                                show = {isOpen} 
                                close = {this.closeForm}
                                formTitle = 'Переименование доски'
                                pageTitle = {title}
                                buttonTitle = 'Переименовать'
                                changeTitle = {this.changeTitle} 
                            /> : null
                    }
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        title: state.boardTitle,
        boardId: state.boardId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchBoardTitle: (boardId) => dispatch(fetchTitleMiddleware(boardId)),
        onUpdateBoardTitle: (boardId, title) => dispatch(updateBoardMiddleware(boardId, title))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardTitle);

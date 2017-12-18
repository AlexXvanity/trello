import React, { Component } from 'react';
import TitleForm from '../../TitleForm/TitleForm.jsx';
import '../../TitleForm/titleForm.scss';
import { connect } from 'react-redux';
import { updateBoardMiddleware } from '../../../actions/boards';
import { fetchTitleMiddleware } from '../../../actions/title';
import getBoardId from '../../../utils/getBoardId';
import browserHistory from '../../../utils/history';

class PageTitle extends Component {
    constructor () {
        super();
        this.state = {
            isFormOpen: false
        };
        this.changeTitle = this.changeTitle.bind(this);
        this.getTitle = this.getTitle.bind(this);
        this.openForm = this.openForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
    }
    componentDidMount () {
        const boardId = getBoardId();
        this.props.onFetchTitle(boardId);
    }
    changeTitle () {
        const title = this.props.title;
        const currentValue = this.formInput.value;

        if (title === currentValue)  {
            this.formInput = ''; 
            this.closeForm();
        } else {
            const boardId = getBoardId();
            
            this.props.onUpdateBoardTitle(boardId, currentValue);
            this.closeForm(); 
        }
    }
    getTitle () {
        const URL = window.location.href;
        let title = '',
            url = URL.split('/');
    
        title = url[url.length - 1];
        
        return title;
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
        title: state.title
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateBoardTitle: (boardId, title) => {
            dispatch(updateBoardMiddleware(boardId, title))
        },
        onFetchTitle: (boardId) => {
            dispatch(fetchTitleMiddleware(boardId))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageTitle);
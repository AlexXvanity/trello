import React, { Component } from 'react';
import PropTypes from 'prop-types';
import history from '../../../../utils/history';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Title from '../../../Title/Title.jsx';

import { getCardDetailsMiddleware } from '../../../../middlewares/cards';
import { updateCardTitleMiddleware } from '../../../../middlewares/cards';

import findCover from '../../../../utils/findCover';

import './cardDetailModal.scss';

import Cover from './components/Cover';
import CommentPage from '../../components/../../CommentPage/CommentPage.jsx';
import SidebarContainer from '../../../SidebarContainer/SidebarContainer.jsx';

class CardDetailModal extends Component {
    constructor (props) {
        super(props);
    }

    componentWillMount () {
        const { _id : id } = this.props.card;

        this.props.fetchData(id);
        document.body.classList.add('modal-open');
    }

    componentWillUnmount () {
        const { boardId } = this.props;

        document.body.classList.remove('modal-open');
    }

    render () {
        const { card } = this.props;
        const { title, attachments } = card;
        const itemWithCover = attachments.length && findCover(attachments);

        return (  
            <div className="card-detail__wrapper">
                { itemWithCover ?
                    <Cover
                        cover = { itemWithCover }
                    /> : null
                }
                <div className="card-detail__content">
                    <Title 
                        title = {title}
                        updateTitle = {this.props.onUpdateCardTitle}
                        id = {this.props.id} 
                    />
                    CardDetailModal!!!<br/>
                    Title: {title}<br/>
                    id: { this.props.id}
                    <div className = "modal-wrap">
                        <CommentPage card = {this.props.card}/>
                    </div>
                    <SidebarContainer card = {this.props.card}/>
                </div>
            </div>
        );
    }
}

CardDetailModal.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    fetchData: PropTypes.func
};

const mapStateToProps = state => {
    const id = state.modal.modalProps.id;

    return  {
        card: state.cards.find((card) => card._id === id)
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: id => dispatch(getCardDetailsMiddleware(id)),
        onUpdateCardTitle: (cardId, title) => dispatch(updateCardTitleMiddleware(cardId, title))
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CardDetailModal)
);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPubs } from '../store/actions/users';
import UserItem from '../components/UserItem';

class PubsList extends Component {
    componentDidMount() {
        this.props.fetchPubs(this.props.match.params.id);
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.fetchPubs(this.props.match.params.id);
        }
    }
    render() {
        const { users } = this.props;
        let pubsList = users.map(p => (           
            <UserItem
                key={p.id}
                id={p.id}
                first={p.first_name}
                last={p.last_name}
                username={p.username}
                image={p.image}
            />     
        ));
        return (
            <div className='col-lg-6 col-sm-10 offset-sm-1 offset-lg-0'>
                {this.props.users.length ? (
                    <div className='card-columns'>
                        {pubsList}
                    </div>
                ) : (
                    <div className='d-flex justify-content-center'>
                        <div className='spinner-grow text-primary' role='status'>
                            <span className='sr-only'>Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, { fetchPubs })(PubsList);
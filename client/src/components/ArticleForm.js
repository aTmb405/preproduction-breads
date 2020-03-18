import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewReading, fetchReadings } from '../store/actions/readings';

class ArticleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ''
        }
    }

    handleChange = e => {
        this.setState({
            url: e.target.value
        });
    };

    handleNewMessage = (event) => {
        event.preventDefault();
        this.props.postNewReading(this.state.url);
        this.setState({ url: "" });
        console.log(this.props);
        // this.props.history.push("/");
        // this.props.history.goBack();
        // window.location.reload(false);
        // this.props.fetchReadings();
        
    };

    // need to immediately add to readings list
    // componentDidUpdate(prevProps, prevState) {
    //   console.log(prevState);
    //     if (prevProps.readings.length > 0 && this.props.readings[0] !== prevState.url) {
    //         console.log("in componentdidupdate");
    //         console.log(prevProps.readings[0].url);
    //         console.log(this.props.readings[0].url);
    //         this.props.fetchReadings();
    //     }
    // }

    render() {
        const { url } = this.state;
        const { errors, readings } = this.props;

        return (
                <form onSubmit={this.handleNewMessage} className='form-inline'>
                    {errors.message && (
                        <div className='alert alert-danger p-1 mb-2 small'>{errors.message}</div>
                    )}
                    <div className='form-group mx-sm-3 mb-2'>
                        <label htmlFor='url'></label>
                        <input
                            type='text'
                            className='form-control form-control-sm'
                            id='url'
                            name='url'
                            onChange={this.handleChange}
                            placeholder='www.coolarticle.com'
                            value={url}
                        />
                    </div>
                    <button type='submit' className='btn btn-outline-primary btn-sm mb-2'>Submit Article</button>
                </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        errors: state.errors,
        readings: state.readings
    }
}

export default connect(mapStateToProps, { postNewReading, fetchReadings })(ArticleForm);
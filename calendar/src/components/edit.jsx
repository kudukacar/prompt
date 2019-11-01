import React from "react";


class EditEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.formatDate(this.props.event.date),
            title: this.props.event.title,
            id: this.props.event.id
        }
    }

    formatDate(date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        const dash = "-";

        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        return (year + dash + month + dash + day);
    }

    update(field) {
        return (e) => {
            this.setState({ [field]: e.target.value });
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleEvent(this.state);
    }

    handleClick = (e) => {
        e.preventDefault();
        this.props.handleCancel();
    }

    handleDelete = (e) => {
        e.preventDefault();
        this.props.handleDelete();
    }

    date = date => {
        return this.setState({ date })
    }

    render() {
        const { date, title } = this.state;
        return (
            <form onSubmit={this.handleSubmit}> <h1>Edit an event</h1>
                <label htmlFor=""> Title
                    <input
                        type="text"
                        value={title}
                        onChange={this.update("title")}
                    />
                </label>
                <label> Date
                    <input type="date" value={date} onChange={this.update('date')} />
                </label>
                <div>
                    <button onClick={this.handleDelete}>Delete</button>
                    <button onClick={this.handleClick}>Cancel</button>
                    <input type="submit" value="Save" />
                </div>
            </form>
        )
    }
}

export default EditEvent;
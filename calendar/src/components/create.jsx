import React from "react";


class CreateEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.formatDate(this.props.date),
            title: "",
            id: null
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

    date = date => {
        return this.setState({ date })
    }

    render() {
        const { date, title } = this.state;
        return (
            <form onSubmit={this.handleSubmit}> <h1>Add an event</h1>
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
                    <button onClick={this.handleClick}>Cancel</button>
                    <input type="submit" value="Save" />
                </div>
            </form>
        )
    }
}

export default CreateEvent;
import React from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, compareAsc, parse } from "date-fns";
import CreateEvent from "./create";
import EditEvent from "./edit";

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            today: new Date(),
            selected: new Date(),
            create: false,
            edit: false,
            events: [],
            selectedEvent: {}
        }
    }

    days() {
        const { today, events } = this.state;
        const monthStart = startOfMonth(today);
        const monthEnd = endOfMonth(today);
        const weekStart = startOfWeek(monthStart);
        const weekEnd = endOfWeek(monthEnd);
        const dateFormat = "d";
        const rows = [];
        let day = weekStart;

        while(day <= weekEnd) {
            const week = [];
            for(let i = 0; i < 7; i++) {
                const formattedDate = format(day, dateFormat);
                const dupDay = day;
                const matchingEvents = [];
                events.forEach(event => {
                    if(compareAsc(event.date, dupDay) === 0) {
                        matchingEvents.push(
                            <div className="event" key={event.id} onClick={() => this.onSelectEvent(event)}>{event.title}</div>
                        )
                    }
                })
                week.push(
                    <div className="day" key={i} onClick={() => this.onSelect(dupDay)}>
                        <div>{formattedDate}</div>
                        {matchingEvents}
                    </div>
                );
                day = addDays(day, 1);
            }
            const length = rows.length;
            rows.push(
                <div className="days" key={length}>
                    {week}
                </div>
            );
        }
        return <div>{rows}</div>
    }

    onSelectEvent = event => {
        this.setState({
            edit: true,
            selectedEvent: event,
        })
    }

    onSelect = (day) => {
        let hasEvent = false;
        const { today, events } = this.state;
        this.setState({
            selected: new Date(day)
        })
        events.forEach(event => {
            if(compareAsc(day, event.date) === 0) {
                alert("event already booked on selected day");
                hasEvent = true;
            }
        })
        const compare = compareAsc(day, today);
        if (compare > -1 && hasEvent === false) {
            this.setState({
                create: true,
            })
        }
    }

    handleCancel = () => {
        this.setState({
            create: false,
            edit: false,
            selectedEvent: {}
        })
    }

    handleCreateEvent = (event) => {
        const formattedEvent = event;
        const { events } = this.state;
        const length = events.length;
        formattedEvent.id = length;
        formattedEvent.date = parse(formattedEvent.date, "yyyy-MM-dd", new Date());
        events.push(event);

        this.setState({
            events,
            create: false
        })
    }

    handleEditEvent = event => {
        const formattedEvent = event;
        const { events } = this.state;
        formattedEvent.date = parse(formattedEvent.date, "yyyy-MM-dd", new Date());
        events[event.id] = formattedEvent;

        this.setState({
            events,
            edit: false
        })
    }

    handleDelete = () => {
        const { selectedEvent, events } = this.state;
        events.splice(selectedEvent.id, 1);
    
        this.setState({
            events,
            edit: false
        })
    }

    render() {
        if(this.state.create) {
            return (
                <div>
                    <CreateEvent
                        handleCancel={this.handleCancel}
                        handleEvent={this.handleCreateEvent}
                        date={this.state.selected}
                    />
                </div>
            )
        } else if(this.state.edit) {
            return (
                <div>
                    <EditEvent
                        handleCancel={this.handleCancel}
                        handleEvent={this.handleEditEvent}
                        event={this.state.selectedEvent}
                        handleDelete={this.handleDelete}
                    />
                </div>
            )
        } else return (
            <div className="calendar">
                <div className="header">
                    {format(this.state.today, "MMMM yyyy")}
                </div>
                <div className="week">
                    <div>Sunday</div>
                    <div>Monday</div>
                    <div>Tuesday</div>
                    <div>Wednesday</div>
                    <div>Thursday</div>
                    <div>Friday</div>
                    <div>Saturday</div>
                </div>
                <div className="days">{this.days()}</div>
            </div>
        )

    }
}

export default Calendar;
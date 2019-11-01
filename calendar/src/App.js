import React from 'react';
import Calendar from "./components/calendar";
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <main className="calendar">
          <Calendar />
        </main>
      </div>
    );
  }
}

export default App;

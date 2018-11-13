import React, { Component } from 'react';

class Sidebar extends Component {
  render() {
    const breweries = this.props.breweries;
    return (
      <nav id="sideBar">
        <h1>Asheville's Top 5 Breweries</h1>
        <label htmlFor="filterMenu">Filter:</label>
        <select id="filterMenu">
          <option value="">--Choose filter option--</option>
          <option value="local">Local-only</option>
          <option value="food">Serves food</option>
        </select>
        <section>
          <ul>
          {breweries.map(brewery => (
            <li key={brewery.id} className='brewery-list-item'>
              {brewery.name}
            </li>
          ))}
          </ul>
        </section>
      </nav>
    )
  }
}

export default Sidebar;

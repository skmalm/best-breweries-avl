import React, { Component } from 'react';

class Sidebar extends Component {
  state = {
    breweries: this.props.breweries,
    listBreweriesToDisplay: this.props.breweries,
  }

  handleFilterChange = (event) => {
    if (event.target.value === '') {
      this.setState({ listBreweriesToDisplay: this.state.breweries });
    }
    if (event.target.value === 'local') {
      this.setState({ listBreweriesToDisplay: this.state.breweries.filter(brewery => brewery.local) });
    }
    if (event.target.value === 'food') {
      this.setState({ listBreweriesToDisplay: this.state.breweries.filter(brewery => brewery.food) });
    }
  }

  render() {
    const onClickListBrewery = this.props.onClickListBrewery;
    return (
      <nav id="sideBar">
        <h1>Asheville's Top 5 Breweries</h1>
        <label htmlFor="filterMenu">Filter:</label>
        <select id="filterMenu" onChange={this.handleFilterChange}>
          <option value="">--Choose filter option--</option>
          <option value="local">Local-only</option>
          <option value="food">Serves food</option>
        </select>
        <section>
          <ul>
          {this.state.listBreweriesToDisplay.map((brewery, index) => (
            <li
              key={brewery.id}
              className='brewery-list-item'
              onClick={function() {
                onClickListBrewery(index);
              }}
            >
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
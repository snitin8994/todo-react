import React from "react";
import "./FilterTab.css";

class FilterTab extends React.Component {
  changeSelectedTab = () => {
    this.props.changeTab(this.props.index);
  };

  render() {
    const { selectedTab, index, tab } = this.props;
    let filterTabClass = "filter__item";
    if (selectedTab === index) {
      filterTabClass += " tabStyle";
    }
    return (
      <div className={filterTabClass} onClick={this.changeSelectedTab}>
        {tab}
      </div>
    );
  }
}

export default FilterTab;

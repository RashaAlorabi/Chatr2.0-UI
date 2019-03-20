import React, { Component } from "react";
import { Link } from "react-router-dom";

class AddChannelCard extends Component {
  render() {
    return (
      <div>
        <div className="col-md-4  float-left">
          <Link className="nav-link heading" to="/createChannel">
            <div className="card card-chart ">
              <div className="card-header card-header-success">
                <div className="ct-chart" id="dailySalesChart" />
                <img
                  src="http://clipart-library.com/images/8TAMXLeTa.png"
                  class="card-img-top"
                  alt="..."
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default AddChannelCard;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

class AddChannelCard extends Component {
  render() {
    return (
      <div className="card w-75 h-2 col-md-5 mt-5 ml-5 mr-5 pb-3 rounded-pill rounded-0  float-left">
        {/* <div class="alert alert-success" role="alert">
          {this.state.messages}
        </div> */}
        <Link className="text-dark" to="/createChannel">
          <div className="row no-gutters">
            <div className="col-md-2 ">
              <img
                src="https://cdn1.iconfinder.com/data/icons/designer-skills/128/slack-512.png"
                className="card-img-top pt-3"
                alt="..."
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title pt-4">
                  {" "}
                  <FontAwesomeIcon icon={faPlusCircle} /> Add New Channel
                </h5>
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped bg-danger"
                    role="progressbar"
                    style={{ width: 750 }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="75"
                  />
                  <p className="card-text">
                    <small className="text-muted"> </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default AddChannelCard;

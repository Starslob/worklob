import React, { useState } from "react";
import person from "../../assets/address.jpg";
import { FaEdit, FaPlus, FaFileAlt } from "react-icons/fa";

const Freelancepro = () => {
  const [editingSection, setEditingSection] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({
    specialization: "",
    hourlyRate: "",
    preferredPaymentOptions: [],
    profileImage: person,
  });
  const [portfolio, setPortfolio] = useState([
    { projectName: "", description: "", files: [] },
  ]);

  const handleToggleEditing = (section) => {
    setEditingSection(editingSection === section ? null : section);
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const handleFileChange = (index, files) => {
    const newPortfolio = [...portfolio];
    newPortfolio[index].files = Array.from(files);
    setPortfolio(newPortfolio);
  };

  const handlePreferredPaymentChange = (option) => {
    if (!personalInfo.preferredPaymentOptions.includes(option)) {
      setPersonalInfo({
        ...personalInfo,
        preferredPaymentOptions: [
          ...personalInfo.preferredPaymentOptions,
          option,
        ],
      });
    }
  };

  const removePaymentOption = (option) => {
    setPersonalInfo({
      ...personalInfo,
      preferredPaymentOptions: personalInfo.preferredPaymentOptions.filter(
        (item) => item !== option
      ),
    });
  };

  const handlePortfolioChange = (index, field, value) => {
    const newPortfolio = [...portfolio];
    newPortfolio[index] = { ...newPortfolio[index], [field]: value };
    setPortfolio(newPortfolio);
  };

  const addPortfolio = () => {
    setPortfolio([
      ...portfolio,
      { projectName: "", description: "", files: [] },
    ]);
  };

  return (
    <div className="gigprofile container">
      {/* Freelancer Info Section */}
      <div className="card gigprofile-section">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2>Freelancer info</h2>
          <button
            type="button"
            className="usbutton"
            onClick={() => handleToggleEditing("personalInfo")}
          >
            <FaEdit />
          </button>
        </div>
        <div className="card-body">
          {editingSection === "personalInfo" ? (
            <div className="gigprofile-section-content editing">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Specialization</label>
                    <input
                      type="text"
                      name="specialization"
                      placeholder="Full stack Software"
                      value={personalInfo.specialization}
                      onChange={handlePersonalInfoChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Hourly Rate</label>
                    <input
                      type="number"
                      name="hourlyRate"
                      placeholder="$0.00"
                      value={personalInfo.hourlyRate}
                      onChange={handlePersonalInfoChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Preferred Payment Options</label>
                    <div className="payment-options">
                      {["USDT", "USDC", "NEAR"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handlePreferredPaymentChange(option)}
                          className="payment-btn"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    <div className="selected-options">
                      {personalInfo.preferredPaymentOptions.map((option) => (
                        <span key={option} className="payment-tag">
                          <img
                            src={`/${option}.png`} // Assuming coin images are named as USDT.png, etc.
                            alt={option}
                            className="payment-image"
                          />
                          {option}
                          <button
                            type="button"
                            onClick={() => removePaymentOption(option)}
                            className="remove-tag"
                          >
                            x
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleToggleEditing("personalInfo")}
                  >
                    Cancel
                  </button>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    type="button"
                    className="usbutton"
                    onClick={() => handleToggleEditing("personalInfo")}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="gigprofile-section-content">
              <div>
                <p>
                  <strong>Specialization:</strong> {personalInfo.specialization}
                </p>
                <p>
                  <strong>Hourly Rate:</strong> {personalInfo.hourlyRate}
                </p>
                <p>
                  <strong>Preferred Payment Options:</strong>{" "}
                  {personalInfo.preferredPaymentOptions.join(", ")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="card gigprofile-section">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2>Portfolio</h2>
          <button
            type="button"
            className="usbutton"
            onClick={() => handleToggleEditing("portfolio")}
          >
            <FaEdit />
          </button>
        </div>
        <div className="card-body">
          {editingSection === "portfolio" ? (
            <div className="gigprofile-section-content editing">
              {portfolio.map((project, index) => (
                <div
                  style={{ borderBottom: "1px solid white" }}
                  key={index}
                  className="form-group"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>Project Name</label>
                      <input
                        type="text"
                        value={project.projectName}
                        onChange={(e) =>
                          handlePortfolioChange(
                            index,
                            "projectName",
                            e.target.value
                          )
                        }
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Files</label>
                      <input
                        type="file"
                        multiple
                        onChange={(e) =>
                          handleFileChange(index, e.target.files)
                        }
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-12">
                      <label>Description</label>
                      <textarea
                        value={project.description}
                        onChange={(e) =>
                          handlePortfolioChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className="form-control"
                      />
                      <br />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" className="usbutton" onClick={addPortfolio}>
                <FaPlus /> Add More Portfolio
              </button>
              <br />
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleToggleEditing("portfolio")}
                  >
                    Cancel
                  </button>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    type="button"
                    className="usbutton"
                    onClick={() => handleToggleEditing("portfolio")}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="gigprofile-section-content">
              <div className="portfolio-list row">
                {portfolio.map((project, index) => (
                  <div className="col-md-6" key={index}>
                    <div
                      style={{
                        border: "1px solid white",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                      id="portfolio-item"
                    >
                      <p>
                        <strong>Project Name:</strong> {project.projectName}
                      </p>
                      <p>
                        <strong>Description:</strong> {project.description}
                      </p>
                      <div className="file-list">
                        {project.files.map((file, i) => (
                          <div key={i} className="file-item">
                            <FaFileAlt className="file-icon" />
                            <p className="filetag-name">{file.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <br />
              <button
                type="button"
                className="usbutton"
                onClick={() => handleToggleEditing("portfolio")}
              >
                <FaPlus /> Add More Portfolio
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Freelancepro;

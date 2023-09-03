import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./all.css"

const Add = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    phone: "",
  });
  const [alldata, setAlldata] = useState([]);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    let obj = {
      id: Math.floor(Math.random() * 10000),
      name: input.name,
      phone: input.phone,
    };
    let data = [...alldata, obj];
    localStorage.setItem("crud", JSON.stringify(data));
    setAlldata(data);
    setInput({
      name: "",
      phone: "",
    });
    navigate("/viewdata");
  };

  useEffect(() => {
    let re = JSON.parse(localStorage.getItem("crud"));
    if (re === null) {
      setAlldata([]);
    } else {
      setAlldata(re);
    }
  }, []);

  return (
    <>
      <center>
        <h1>Add Record</h1>
        <table className="form-table">
          <tbody>
            <tr>
              <td>Name:</td>
              <td>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={input.name}
                />
              </td>
            </tr>
            <tr>
              <td>Phone:</td>
              <td>
                <input
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  value={input.phone}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <input
                  type="button"
                  onClick={() => handleSubmit()}
                  value="Submit"
                  className="submit-button"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <Link to="/viewdata" className="view-link">
          View
        </Link>
      </center>
    </>
  );
};

export default Add;

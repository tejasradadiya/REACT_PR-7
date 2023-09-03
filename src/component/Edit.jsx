import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./all.css";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const getRecord = () => {
    let all = JSON.parse(localStorage.getItem("crud"));
    if (all === null) {
      return [];
    } else {
      return all;
    }
  };

  const [record, setRecord] = useState(getRecord);
  const [input, setInput] = useState({
    name: "",
    phone: "",
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    let name = input.name;
    let phone = input.phone;
    let ans = record.map((item) => {
      if (item.id === parseInt(id)) {
        return {
          ...item,
          name: name,
          phone: phone,
        };
      }
      return item;
    });
    setRecord(ans);
    localStorage.setItem("crud", JSON.stringify(ans));
    navigate("/viewdata");
    setInput({
      name: "",
      phone: "",
    });
  };

  useEffect(() => {
    let ans = record.filter((item) => {
      return item.id == id;
    });
    setInput(ans[0]);
  }, []);

  return (
    <div className="edit-container">
      <h1 className="edit-heading">Edit Record</h1>
      <table className="edit-table">
        <tbody>
          <tr>
            <td>Name :</td>
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
            <td>Phone :</td>
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
                value="Edit"
                className="edit-button"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Edit;

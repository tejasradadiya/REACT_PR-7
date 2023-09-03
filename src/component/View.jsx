import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./all.css";

const View = () => {
  let all = localStorage.getItem("crud") ? JSON.parse(localStorage.getItem("crud")) : [];
  const [alldata, setAlldata] = useState(all);
  const [search, setSearch] = useState("");
  const [option, setOption] = useState("");

  const deleteData = (id) => {
    let ans = alldata.filter((item) => {
      return item.id !== id;
    });
    setAlldata(ans);
  }

  useEffect(() => {
    let select = [...alldata];
    if (option === "asc") {
      setAlldata(select.sort((a, b) => a.name.localeCompare(b.name)));
    } else if (option === "dsc") {
      setAlldata(select.sort((a, b) => b.name.localeCompare(a.name)));
    } else {
      setAlldata(all);
    }
  }, [option]);

  useEffect(() => {
    let searchname = all.filter((item) => {
      return item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    });
    setAlldata(searchname);
  }, [search]);

  return (
    <center>
        <div className="view-container">
        <table className="view-table" border={1}>
            <thead>
            <tr className="view-header">
                <td>Id</td>
                <td>Name</td>
                <td>Phone</td>
                <td>
                    Action
                    <select className="view-select" onClick={(e) => setOption(e.target.value)}>
                        <option>--Select--</option>
                        <option value="asc">--Asc--</option>
                        <option value="dsc">--Dsc--</option>
                        <option value="all">--All--</option>
                    </select>

                </td>
            </tr>
            </thead>
            <tbody>
            {alldata.map((val) => {
                const { id, name, phone } = val;
                return (
                <tr className="view-row" key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{phone}</td>
                    <td>
                    <button className="view-button" onClick={() => deleteData(id)}>
                        Delete
                    </button>{" "}
                    ||
                    <button className="view-edit">
                        <Link to={`/edit/${id}`}>Edit</Link>
                    </button>
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
        <Link to="/" className="view-add">
            Add
        </Link>
        </div>
    </center>
  );
};

export default View;

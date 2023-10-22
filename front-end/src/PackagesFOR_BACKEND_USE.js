import React, { useState, useEffect } from "react";

const PackageBE = () => {
  const [backendData, setBackendData] = useState([{}]);
  const fetchData = () => {
    fetch("http://localhost:2000/api", {
      method: "GET",
    })
      .then((response) => {
        var res = response.json();
        return res;
      })
      .then((data) => {
        setBackendData(data);
        // check console to see if you see data
        console.log(backendData);
      });
  };
  useEffect(() => {
    if (Object.keys(backendData[0]).length === 0) {
      fetchData();
    }
  });
  return (
    <>
      {backendData.map((pack, idx) => {
        return (
          <div key={`${pack.shipment_id}_${idx}`}>
            <p>{JSON.stringify(pack)}</p>
          </div>
        );
      })}
    </>
  );
};

export default PackageBE;

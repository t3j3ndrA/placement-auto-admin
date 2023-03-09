import React from "react";
import Data from "./Input1.json";
import { useState, useEffect } from "react";
import { Axios } from "axios";
export const Demo = () => {
  const [data, setdata] = useState([]);

  useEffect (() =>{
      const getValues =async () =>{
          const post = {
            name : "Flipkart"
          }

          
      };

      getValues()
      return () =>{

      };
  },[])

  function JsonDataDisplay() {
    console.log("data: ", Data);
    Data.map((info) => {
    //   return (
        <tr>
          <td>{info.id}</td>
          <td>{info.name}</td>
          <td>{info.city}</td>
        </tr>
    //   );
    }
    );
  }

  return (
    // <div>
    //     <ul>
    //         {
    //             data.map((item) =>{
    //                 <li>
    //                 <p>id: {item.id}</p><br/>
    //                 <p>Name: {item.name}</p><br/>
    //                 <p>City: {item.city}</p><br/>
    //                 </li>
    //             })
    //         }
    //     </ul>
    // </div>

    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sr.NO</th>
            <th>Name</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {Data.map((info) => {
      return (
        <tr>

          <td>{info.id}</td>
          <td>{info.name}</td>
          <td>{info.city}</td>

          
        </tr>
      );
    })}
        </tbody>
      </table>
    </div>
  );
};
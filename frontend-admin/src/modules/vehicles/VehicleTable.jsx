import { Link } from "react-router-dom";

import "./VehicleTable.css";
import {
  deleteVehicle,
} from "../../services/vehicleService";

const VehicleTable = ({
  vehicles,
}) => {


  const handleDelete =
  async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this vehicle?"
      );

    if (!confirmDelete)
      return;

    try {

      await deleteVehicle(id);

      alert(
        "Vehicle Deleted"
      );

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert(
        "Delete Failed"
      );
    }
};
  return (
    <div className="vehicle-table-container">

      <table className="vehicle-table">

        <thead>

          <tr>

            <th>Image</th>

            <th>Vehicle Name</th>

            <th>Vehicle Number</th>

            <th>Type</th>

            <th>Brand</th>

            <th>Price/Day</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {vehicles.map((vehicle) => (

            <tr key={vehicle._id}>

              <td>

                <img
                  src={vehicle.image}
                  alt={vehicle.vehicleName}
                  className="vehicle-image"
                />

              </td>

              <td>
                {vehicle.vehicleName}
              </td>

              <td>
                {vehicle.vehicleNumber}
              </td>

              <td>
                {vehicle.type}
              </td>

              <td>
                {vehicle.brand}
              </td>

              <td>
                ₹{vehicle.pricePerDay}
              </td>

              <td>

                <span
                  className={`status ${vehicle.status}`}
                >
                  {vehicle.status}
                </span>

              </td>

              <td>

                <div
  style={{
    display: "flex",
    gap: "10px",
  }}
>

  <Link
    to={`/vehicles/edit/${vehicle._id}`}
    className="edit-btn"
  >
    Edit
  </Link>

  <button
    onClick={() =>
      handleDelete(vehicle._id)
    }
    className="delete-btn"
  >
    Delete
  </button>

</div>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default VehicleTable;
import React, { useEffect, useState } from "react";
import "../../resources/Prices.css"; // Import CSS
import axios from "axios";

const Prices = () => {
  const [prices, setPrices] = useState([]);
  const [formData, setFormData] = useState({ type: "hourly", amount: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch prices from the backend
  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/prices");
        setPrices(response.data);
      } catch (error) {
        console.error("Failed to fetch prices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Display messages
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  // Handle saving a price (either adding or updating)
  const handleSavePrice = async () => {
    if (!formData.type || !formData.amount) {
      showMessage("Please fill all fields.");
      return;
    }

    // Check if the price already exists, only for adding new prices
    if (!isEditing) {
      const priceExists = prices.some((price) => price.type === formData.type);
      if (priceExists) {
        showMessage(
          `${
            formData.type === "hourly" ? "Hourly" : "Daily (24 hours)"
          } price already exists.`
        );
        return;
      }
    } else {
      // When editing, check if the new amount is the same as the previous amount
      const priceExists = prices.some(
        (price) =>
          price.type === formData.type &&
          price.amount === formData.amount &&
          price._id !== editId // Ensure we don't check against the current price being edited
      );
      if (priceExists) {
        showMessage(
          `${
            formData.type === "hourly" ? "Hourly" : "Daily (24 hours)"
          } price already exists.`
        );
        return;
      }

      // Check if the new price is actually different from the current price
      const currentPrice = prices.find((price) => price._id === editId);
      if (currentPrice && currentPrice.amount === formData.amount) {
        showMessage("The price is the same. No update needed.");
        return;
      }
    }

    try {
      if (isEditing) {
        // If price is different from the previous, update the price
        const response = await axios.put(`/api/prices/${editId}`, formData);
        setPrices(
          prices.map((price) =>
            price._id === editId ? { ...price, ...response.data } : price
          )
        );
        showMessage("Price updated successfully!");
      } else {
        const response = await axios.post("/api/prices", formData);
        setPrices([...prices, response.data]);
        showMessage("Price added successfully!");
      }
      setFormData({ type: "hourly", amount: "" });
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      console.error("Failed to save price:", error);
      showMessage("An error occurred.");
    }
  };

  // Handle deleting a price
  const handleDeletePrice = async (id) => {
    try {
      await axios.delete(`/api/prices/${id}`);
      setPrices(prices.filter((price) => price._id !== id));
      showMessage("Price deleted successfully!");
    } catch (error) {
      console.error("Failed to delete price:", error);
      showMessage("An error occurred.");
    }
  };

  // Start editing a price
  const handleEditClick = (price) => {
    setIsEditing(true);
    setEditId(price._id);
    setFormData({ type: price.type, amount: price.amount });
  };

  return (
    <div className="prices-container">
      <h1>Manage Prices</h1>
      {loading && <p>Loading...</p>}
      {message && <p className="message">{message}</p>}
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount (₹)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price) => (
            <tr key={price._id}>
              <td>{price.type === "hourly" ? "Hourly" : "Daily (24 hours)"}</td>
              <td>₹{price.amount}</td>
              <td>
                <button
                  onClick={() => handleEditClick(price)}
                  className="update-btn"
                >
                  {isEditing && price._id === editId ? "Update" : "Update"}
                </button>
                <button
                  onClick={() => handleDeletePrice(price._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="form-container">
        <h2>{isEditing ? "Update Price" : "Add Price"}</h2>
        <select name="type" value={formData.type} onChange={handleInputChange}>
          <option value="hourly">Hourly</option>
          <option value="daily">Daily (24 hours)</option>
        </select>
        <input
          type="number"
          name="amount"
          placeholder="Amount (₹)"
          value={formData.amount}
          onChange={handleInputChange}
        />
        <button onClick={handleSavePrice} className="save-btn">
          {isEditing ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default Prices;

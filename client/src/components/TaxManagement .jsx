import React, { useState } from "react";
import "../styles/Admin.css";

const TaxManagement = () => {
  const [taxRate, setTaxRate] = useState(0);

  const handleTaxChange = (e) => {
    setTaxRate(e.target.value);
  };

  return (
    <div className="tax-management">
      <h2 className="h2-admin">Manage Tax Rate</h2>
      <input
        className="input-admin"
        type="number"
        value={taxRate}
        onChange={handleTaxChange}
        placeholder="Tax rate (%)"
      />
      <button className="button-admin">Update Tax Rate</button>
    </div>
  );
};

export default TaxManagement;

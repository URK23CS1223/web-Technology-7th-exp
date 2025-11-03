import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [existingEmi, setExistingEmi] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [result, setResult] = useState(null);

  const calculateEligibility = () => {
    if (!name || !age || !salary || !loanAmount) {
      alert("Please fill all fields!");
      return;
    }

    const principal = parseFloat(loanAmount);
    const annualRate = 10.5; // fixed interest
    const monthlyRate = annualRate / 12 / 100;
    const months = 60; // 5 years

    // Calculate EMI
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayable = emi * months;
    const totalInterest = totalPayable - principal;

    // Calculate Debt to Income ratio
    const dti = ((parseFloat(existingEmi) + emi) / salary) * 100;

    let eligible = salary >= 15000 && loanAmount >= 50000 && dti < 40;

    setResult({
      name,
      age,
      salary,
      existingEmi,
      loanAmount,
      emi: emi.toFixed(0),
      totalPayable: totalPayable.toFixed(0),
      totalInterest: totalInterest.toFixed(0),
      dti: dti.toFixed(2),
      eligible,
    });
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">🏦 Loan Eligibility Checker</h1>

        <div className="inputs">
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div className="input-group">
            <label>Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
            />
          </div>

          <div className="input-group">
            <label>Monthly Salary (₹)</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Enter your monthly salary"
            />
            <p className="hint">Minimum: ₹15,000 per month</p>
          </div>

          <div className="input-group">
            <label>Existing EMI/Debts (₹)</label>
            <input
              type="number"
              value={existingEmi}
              onChange={(e) => setExistingEmi(e.target.value)}
              placeholder="Enter existing EMI (if any)"
            />
          </div>

          <div className="input-group">
            <label>Loan Amount Requested (₹)</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter requested loan amount"
            />
            <p className="hint">Minimum: ₹50,000</p>
          </div>
        </div>

        <button className="btn-glow" onClick={calculateEligibility}>
          Check Eligibility
        </button>

        {result && (
          <div
            className={`result ${result.eligible ? "success" : "fail"}`}
          >
            {result.eligible ? (
              <>
                <h2>✅ Eligible for Loan</h2>
                <p>Congratulations {result.name}! You are eligible for the loan.</p>
              </>
            ) : (
              <>
                <h2>❌ Not Eligible for Loan</h2>
                <p>Sorry {result.name}, you are not eligible based on your inputs.</p>
              </>
            )}

            <div className="details">
              <h3>Loan Details:</h3>
              <p><strong>Debt-to-Income Ratio:</strong> {result.dti}%</p>
              <p><strong>Proposed Monthly EMI:</strong> ₹{result.emi}</p>
              <p><strong>Loan Tenure:</strong> 5 years (60 months)</p>
              <p><strong>Interest Rate:</strong> 10.5% per annum</p>
              <p><strong>Total Interest Payable:</strong> ₹{result.totalInterest}</p>
              <p><strong>Total Amount Payable:</strong> ₹{result.totalPayable}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

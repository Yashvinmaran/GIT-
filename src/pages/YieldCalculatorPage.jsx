import React, { useState, useEffect } from 'react';
import { FaCalculator, FaInfoCircle } from 'react-icons/fa';
import api from '../utils/api';
// import './YieldCalculatorPage.css';

const YieldCalculatorPage = () => {
  const [crops, setCrops] = useState([]);
  const [soilTypes, setSoilTypes] = useState([]);
  const [regions, setRegions] = useState([]);
  const [irrigationTypes, setIrrigationTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    crop: '',
    area: '',
    areaUnit: 'acre',
    soilType: '',
    region: '',
    irrigationType: '',
    seedVariety: '',
    fertilizerUse: 'medium' // options: low, medium, high
  });

  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFormOptions = async () => {
      try {
        const [cropsRes, soilRes, regionRes, irrigationRes] = await Promise.all([
          api.get('/yield-calculator/crops'),
          api.get('/yield-calculator/soil-types'),
          api.get('/yield-calculator/regions'),
          api.get('/yield-calculator/irrigation-types')
        ]);
        setCrops(cropsRes.data);
        setSoilTypes(soilRes.data);
        setRegions(regionRes.data);
        setIrrigationTypes(irrigationRes.data);
      } catch (err) {
        console.error('Error fetching options:', err);
        setError('Failed to load calculator options');
      } finally {
        setLoading(false);
      }
    };

    fetchFormOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setShowResults(false);
    setResults(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/yield-calculator/calculate', formData);
      setResults(res.data);
      setShowResults(true);
    } catch (err) {
      console.error('Calculation error:', err);
      setError(err.response?.data?.message || 'Failed to calculate yield');
    }
  };

  if (loading) {
    return <div className="loading">Loading calculator...</div>;
  }

  return (
    <div className="yield-calculator-page">
      <div className="calculator-header">
        <div className="calculator-icon"><FaCalculator /></div>
        <div className="calculator-title">
          <h1>Crop Yield Calculator</h1>
          <p>Estimate your potential crop yield and value based on various factors</p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="calculator-container">
        <div className="calculator-form-container">
          <form className="calculator-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="crop">Select Crop*</label>
              <select name="crop" id="crop" value={formData.crop} onChange={handleChange} required>
                <option value="">Choose a crop</option>
                {crops.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group area-input">
                <label htmlFor="area">Land Area*</label>
                <input
                  type="number"
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  min="0.1"
                  step="0.1"
                  required
                  placeholder="Enter area"
                />
              </div>
              <div className="form-group area-unit">
                <label htmlFor="areaUnit">Unit</label>
                <select name="areaUnit" id="areaUnit" value={formData.areaUnit} onChange={handleChange}>
                  <option value="acre">Acre</option>
                  <option value="hectare">Hectare</option>
                  <option value="bigha">Bigha</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="soilType">Soil Type*</label>
              <select name="soilType" id="soilType" value={formData.soilType} onChange={handleChange} required>
                <option value="">Select soil type</option>
                {soilTypes.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="region">Region*</label>
              <select name="region" id="region" value={formData.region} onChange={handleChange} required>
                <option value="">Select your region</option>
                {regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="irrigationType">Irrigation Type*</label>
              <select name="irrigationType" id="irrigationType" value={formData.irrigationType} onChange={handleChange} required>
                <option value="">Select irrigation type</option>
                {irrigationTypes.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="seedVariety">Seed Variety</label>
              <input
                type="text"
                id="seedVariety"
                name="seedVariety"
                value={formData.seedVariety}
                onChange={handleChange}
                placeholder="Optional: Specify seed variety"
              />
            </div>

            <div className="form-group">
              <label htmlFor="fertilizerUse">Fertilizer Use</label>
              <select name="fertilizerUse" id="fertilizerUse" value={formData.fertilizerUse} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <button type="submit" className="calculate-button">Calculate Yield</button>
          </form>
        </div>

        {showResults && results && (
          <div className="calculator-results">
            <h3>Estimated Yield</h3>
            <p>
              Based on your inputs, the estimated yield for <strong>{crops.find(c => c.id === formData.crop)?.name}</strong> on
              <strong> {formData.area} {formData.areaUnit}</strong> of <strong>{soilTypes.find(s => s.id === formData.soilType)?.name}</strong> soil in the
              <strong> {regions.find(r => r.id === formData.region)?.name}</strong> region with <strong>{irrigationTypes.find(i => i.id === formData.irrigationType)?.name}</strong> irrigation is:
            </p>
            <div className="yield-output">
              <h4>{parseFloat(results.estimatedYield).toFixed(2)} {results.yieldUnit}</h4>
              {results.estimatedValue && (
                <p>Estimated Market Value: ₹ {parseFloat(results.estimatedValue).toFixed(2)}</p>
              )}
            </div>
            <div className="disclaimer">
              <FaInfoCircle className="info-icon" />
              <p><strong>Disclaimer:</strong> This is an estimated yield. Actual results may vary due to weather, pest impact, and practices.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YieldCalculatorPage;

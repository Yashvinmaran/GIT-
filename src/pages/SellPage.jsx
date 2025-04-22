
const SellPage = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    variety: '',
    description: '',
    price: '',
    unit: 'kg', // kg, quintal, ton
    availableQuantity: '',
    minOrder: '1',
    harvestDate: '',
    location: user?.address || '',
    isOrganic: false,
    isChemicalFree: false,
    cultivationMethod: 'traditional', // traditional, organic, hydroponics
    nutritionalValue: '',
    storageInstructions: '',
    images: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login?redirect=/sell');
      return;
    }
    
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load product categories');
      }
    };
    
    fetchCategories();
  }, [isAuthenticated, navigate, user]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData({
        ...formData,
        images: [...formData.images, ...filesArray]
      });
    }
  };
  
  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      // Create form data object to handle file uploads
      const productData = new FormData();
      
      // Append text fields
      Object.keys(formData).forEach(key => {
        if (key !== 'images') {
          productData.append(key, formData[key]);
        }
      });
      
      // Append image files
      formData.images.forEach(image => {
        productData.append('images', image);
      });
      
      // Submit to API
      const res = await api.post('/products', productData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSuccess('Your product has been successfully listed!');
      // Reset form after successful submission
      setFormData({
        name: '',
        category: '',
        variety: '',
        description: '',
        price: '',
        unit: 'kg',
        availableQuantity: '',
        minOrder: '1',
        harvestDate: '',
        location: user?.address || '',
        isOrganic: false,
        isChemicalFree: false,
        cultivationMethod: 'traditional',
        nutritionalValue: '',
        storageInstructions: '',
        images: []
      });
      
      // Optionally redirect to product page
      // navigate(`/product/${res.data.id}`);
    } catch (err) {
      console.error('Error creating product listing:', err);
      setError(err.response?.data?.message || 'Failed to create product listing');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="sell-page">
      <div className="sell-header">
        <h1>Sell Your Agricultural Products</h1>
        <p>List your farm produce directly on FasalBazaar and reach thousands of buyers</p>
      </div>
      
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <div className="sell-container">
        <div className="seller-guidelines">
          <h3>Seller Guidelines</h3>
          <ul>
            <li>Ensure your produce meets quality standards</li>
            <li>Upload clear images of your actual products</li>
            <li>Set fair prices based on market rates</li>
            <li>Accurately describe your products</li>
            <li>Mention harvesting date for freshness</li>
            <li>Be ready to arrange delivery or pickup</li>
          </ul>
          <div className="verification-notice">
            <h4>Verification Process</h4>
            <p>All new sellers go through a quick verification process. Our team may contact you within 24 hours to verify your listing details.</p>
          </div>
        </div>
        
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Basic Information</h3>
            
            <div className="form-group">
              <label htmlFor="name">Product Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Basmati Rice, Red Onions"
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category*</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="variety">Variety/Grade*</label>
                <input
                  type="text"
                  id="variety"
                  name="variety"
                  value={formData.variety}
                  onChange={handleChange}
                  placeholder="e.g., Grade A, Premium Quality"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description*</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your product, including quality, freshness, etc."
                rows="4"
                required
              ></textarea>
            </div>
          </div>
          
          <div className="form-section">
            <h3>Pricing & Quantity</h3>
            
            <div className="form-row">
              <div className="form-group price-input">
                <label htmlFor="price">Price per Unit*</label>
                <div className="input-with-icon">
                  <FaRupeeSign className="input-icon" />
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g., 50"
                    min="1"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="unit">Unit*</label>
                <select
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                >
                  <option value="kg">Kilogram (kg)</option>
                  <option value="quintal">Quintal</option>
                  <option value="ton">Ton</option>
                  <option value="dozen">Dozen</option>
                  <option value="piece">Piece</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="availableQuantity">Available Quantity*</label>
                <div className="input-with-icon">
                  <FaWeightHanging className="input-icon" />
                  <input
                    type="number"
                    id="availableQuantity"
                    name="availableQuantity"
                    value={formData.availableQuantity}
                    onChange={handleChange}
                    placeholder="Total quantity available"
                    min="1"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="minOrder">Minimum Order</label>
                <input
                  type="number"
                  id="minOrder"
                  name="minOrder"
                  value={formData.minOrder}
                  onChange={handleChange}
                  placeholder="Minimum quantity per order"
                  min="1"
                />
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h3>Additional Details</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="harvestDate">Harvest Date*</label>
                <input
                  type="date"
                  id="harvestDate"
                  name="harvestDate"
                  value={formData.harvestDate}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Location*</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Farm/Village location"
                  required
                />
              </div>
            </div>
            
            <div className="form-row checkboxes">
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="isOrganic"
                  name="isOrganic"
                  checked={formData.isOrganic}
                  onChange={handleChange}
                />
                <label htmlFor="isOrganic">Organically Grown</label>
              </div>
              
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="isChemicalFree"
                  name="isChemicalFree"
                  checked={formData.isChemicalFree}
                  onChange={handleChange}
                />
                <label htmlFor="isChemicalFree">Chemical Free</label>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="cultivationMethod">Cultivation Method</label>
              <select
                id="cultivationMethod"
                name="cultivationMethod"
                value={formData.cultivationMethod}
                onChange={handleChange}
              >
                <option value="traditional">Traditional</option>
                <option value="organic">Organic</option>
                <option value="hydroponics">Hydroponics</option>
                <option value="natural">Natural Farming</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="nutritionalValue">Nutritional Value</label>
              <textarea
                id="nutritionalValue"
                name="nutritionalValue"
                value={formData.nutritionalValue}
                onChange={handleChange}
                placeholder="Add nutritional information if available"
                rows="2"
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="storageInstructions">Storage Instructions</label>
              <textarea
                id="storageInstructions"
                name="storageInstructions"
                value={formData.storageInstructions}
                onChange={handleChange}
                placeholder="Suggest how to store your product for maximum freshness"
                rows="2"
              ></textarea>
            </div>
          </div>
          
          <div className="form-section">
            <h3>Product Images</h3>
            <p className="image-instructions">Upload clear images of your products. First image will be the main display image.</p>
            
            <div className="image-upload-container">
              <div className="image-upload-button">
                <input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="file-input"
                />
                <label htmlFor="images" className="file-label">
                  <FaCamera /> Upload Images
                </label>
              </div>
              
              <div className="image-preview-container">
                {formData.images.map((img, index) => (
                  <div key={index} className="image-preview">
                    <img src={URL.createObjectURL(img)} alt={`Product preview ${index + 1}`} />
                    <button 
                      type="button" 
                      className="remove-image" 
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </button>
                    {index === 0 && <span className="main-image-badge">Main</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-listing-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'List Your Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellPage;


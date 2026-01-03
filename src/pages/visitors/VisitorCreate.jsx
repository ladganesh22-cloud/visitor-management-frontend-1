import { useState, useEffect, useRef } from "react";
import { useVisitorContext } from "../../hooks/useVisitorContext";
import { useAuthContext } from '../../hooks/useAuthContext'
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import useFetchUserList from '../../hooks/useFetchUser';
import useFetchVisitorList from "../../hooks/useFetchVisitor";


const CreateVisitor = () => {
  const { dispatch } = useVisitorContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { user } = useAuthContext()
  const { loading, error, createVisitor, singleVisitor } = useFetchVisitorList()
  const fileInputRef = useRef(null);
  const {
    getUserListById,
    singleToDo
  } = useFetchUserList();


  useEffect(() => {
    if (user?.token) {
      const { userId } = jwtDecode(user.token);
      getUserListById(userId);
      setCreatedBy(userId)
    }
  }, [user]);


  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const visitor = {
      name,
      email,
      phone,
      address,
      photo,
      createdBy,
    };
    console.log(visitor)

    createVisitor(visitor)

    // dispatch({ type: "CREATE_VISITOR", payload: visitor });
    if (name) {
      setSuccessMsg(`Visitor "${name}" created successfully`);
    }

    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setPhoto("");
    setCreatedBy("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  setTimeout(() => setSuccessMsg(""), 3000);

  return (
    <div className="create-visitor-wrapper">
      {/* <section className="host-link-section">
        <Link to="/host-dashboard">
          <button className="btn">Home</button>
        </Link>
      </section> */}
      <section className="create-visitor-section">
        <div className="row container">
          {successMsg && (
            <div className="success-message">
              {successMsg}
            </div>
          )}
          <form className='visitor-form' onSubmit={handleSubmit}>
            <h1>Create Visitor</h1>
            <div className="visitor-wrapper">
              <div className='form-content-wrapper'>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='form-content-wrapper'>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='form-content-wrapper'>
                <input
                  type="number"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className='form-content-wrapper'>
                <textarea
                  placeholder="Enter address"
                  value={address}
                  rows={4}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="form-content-wrapper">
                <label className="form-label">Upload Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  ref={fileInputRef}
                />
              </div>
              <button disabled={loading} className="btn create-visitor-btn">Add Visitor</button>
              {error && <div className="error">{error}</div>}
            </div>
          </form >
        </div >
      </section>
    </div >
  );
};

export default CreateVisitor;

import "../styles/AdminOrg.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Foot from "../components/Foot";
import AdminOrgCard from "../components/AdminOrgCard";
import DoneAction from "../components/dialogs/DoneAction";
import { fetchDocuments, updateOrganizer } from "../firebaseCom/firebase";

function AdminOrg() {
  const location = useLocation();
  const [editStates, setEditStates] = useState({});
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = (index) => {
    const newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
  };

  useEffect(() => {
    async function fetchOrganizers() {
      const fetched = await fetchDocuments(`organizatoriFestivala`);
      setItems(fetched);
      const initialEditStates = {};
      fetched.forEach((org, index) => {
        initialEditStates[index] = {
          adresa: org.adresa,
          email: org.email,
          festivali: org.festivali,
          godinaOsnivanja: org.godinaOsnivanja,
          kontaktTelefon: org.kontaktTelefon,
          logo: org.logo,
          naziv: org.naziv,
          isEditing: false,
        };
      });
      setEditStates(initialEditStates);
    }
    fetchOrganizers();
  }, []);

  const handleEditToggle = async (index) => {
    const isCurrentlyEditing = editStates[index]?.isEditing;

    if (isCurrentlyEditing) {
      if (validateForm(index)) {
        handleOpenModal();

        const updatedOrg = {
          adresa: editStates[index].adresa,
          email: editStates[index].email,
          festivali: editStates[index].festivali,
          godinaOsnivanja: editStates[index].godinaOsnivanja,
          kontaktTelefon: editStates[index].kontaktTelefon,
          logo: editStates[index].logo,
          naziv: editStates[index].naziv,
        };
        await updateOrganizer(updatedOrg, items[index].id);
        setEditStates((prevState) => ({
          ...prevState,
          [index]: {
            ...prevState[index],
            isEditing: false,
          },
        }));
      }
    } else {
      setEditStates((prevState) => ({
        ...prevState,
        [index]: {
          ...prevState[index],
          isEditing: true,
        },
      }));
    }
  };

  const validateForm = (index) => {
    const formData = editStates[index];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{3}\/\d{4}-\d{4}$/;

    if (
      !formData.adresa ||
      !formData.email ||
      !formData.godinaOsnivanja ||
      !formData.kontaktTelefon ||
      !formData.logo ||
      !formData.naziv
    ) {
      alert("All fields are required.");
      return false;
    }

    if (!formData.adresa.match(/^[a-zA-Z0-9\s]+,\s*[a-zA-Z\s]+,\s*\d{5}$/)) {
      alert(
        "Invalid address format. Please use: Street Address, City, Postal Code"
      );
      return false;
    }

    if (!formData.email.match(emailRegex)) {
      alert("Invalid email address.");
      return false;
    }

    if (!formData.godinaOsnivanja.match(/^\d{4}$/)) {
      alert("Invalid founding year format. Please use a four-digit year.");
      return false;
    }

    if (!formData.kontaktTelefon.match(phoneRegex)) {
      alert("Invalid phone number format. Please use XXX/XXXX-XXXX format.");
      return false;
    }

    if (!formData.logo.match(/\.(jpeg|jpg|gif|png|webp)$/)) {
      alert("Invalid image URL.");
      return false;
    }

    return true;
  };

  const handleInputChange = (index, field, value) => {
    setEditStates((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        [field]: value,
      },
    }));
  };

  return (
    <div className='admin-org-container'>
      <Navbar />
      <DoneAction
        show={showModal}
        handleClose={handleCloseModal}
        title='EDITING ORGANIZER'
      />
      <div className='org-data-container'>
        {items.map((org, index) => (
          <AdminOrgCard
            key={index}
            org={org}
            index={index}
            isEditing={editStates[index]?.isEditing}
            editData={editStates[index]}
            onDelete={handleDelete}
            onEditToggle={handleEditToggle}
            onInputChange={handleInputChange}
          />
        ))}
      </div>
      <Foot />
    </div>
  );
}

export default AdminOrg;

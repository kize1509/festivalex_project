import Navbar from "../components/Navbar";
import Foot from "../components/Foot";
import UserCard from "../components/UserCard";
import "../styles/AdminUser.css";
import { useEffect, useState } from "react";
import { fetchDocuments, updateUser } from "../firebaseCom/firebase";
import DoneAction from "../components/dialogs/DoneAction";

function AdminUser() {
  const [items, setItems] = useState([]);
  const [editStates, setEditStates] = useState({});

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    async function fetchUsers() {
      const fetched = await fetchDocuments(`korisnici`);
      setItems(fetched);

      const initialEditStates = {};
      fetched.forEach((user, index) => {
        initialEditStates[index] = {
          korisnickoIme: user.korisnickoIme,
          lozinka: user.lozinka,
          ime: user.ime,
          prezime: user.prezime,
          email: user.email,
          datumRodjenja: user.datumRodjenja,
          adresa: user.adresa,
          telefon: user.telefon,
          zanimanje: user.zanimanje,
          isEditing: false,
        };
      });
      setEditStates(initialEditStates);
    }
    fetchUsers();
  }, []);

  const handleDelete = (index) => {
    const newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
  };

  const handleEditToggle = async (index) => {
    const isCurrentlyEditing = editStates[index]?.isEditing;

    if (isCurrentlyEditing) {
      if (validateData(index)) {
        handleOpenModal();

        const updatedUser = {
          korisnickoIme: editStates[index].korisnickoIme,
          lozinka: editStates[index].lozinka,
          ime: editStates[index].ime,
          prezime: editStates[index].prezime,
          email: editStates[index].email,
          datumRodjenja: editStates[index].datumRodjenja,
          adresa: editStates[index].adresa,
          telefon: editStates[index].telefon,
          zanimanje: editStates[index].zanimanje,
        };
        await updateUser(items[index].id, updatedUser);
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

  const handleInputChange = (index, field, value) => {
    setEditStates((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        [field]: value,
      },
    }));
  };

  const validateData = (index) => {
    const data = editStates[index];

    if (
      !data.korisnickoIme ||
      !data.lozinka ||
      !data.ime ||
      !data.prezime ||
      !data.email ||
      !data.datumRodjenja ||
      !data.adresa ||
      !data.telefon ||
      !data.zanimanje
    ) {
      alert("All fields are required.");
      return false;
    }

    const isUsernameUnique = items.every((item, i) => {
      if (i === index) return true;
      return item.korisnickoIme !== data.korisnickoIme;
    });
    if (!isUsernameUnique) {
      alert("Username already exists.");
      return false;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!data.lozinka.match(passwordRegex)) {
      alert(
        "Password must contain at least 8 characters, including letters and numbers."
      );
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.match(emailRegex)) {
      alert("Invalid email address.");
      return false;
    }

    if (!validateDatumRodjenja(data.datumRodjenja)) {
      alert("Invalid birth date format.");
      return false;
    }

    const addressRegex = /^[a-zA-Z0-9šđžćč\s]+,\s*[a-zA-Zšđžćč\s]+,\s*\d{5}$/;
    if (!data.adresa.match(addressRegex)) {
      alert(
        "Invalid address format. Please use: Street Address, City, Postal Code"
      );
      return false;
    }

    const phoneRegex = /^06[0-6]\d{6,7}$/;
    if (!data.telefon.match(phoneRegex)) {
      console.log(data.telefon);
      alert("Invalid Serbian mobile phone number format.");
      return false;
    }

    return true;
  };

  const validateDatumRodjenja = (datumRodjenja) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(datumRodjenja)) {
      return false;
    }

    const [year, month, day] = datumRodjenja.split("-").map(Number);

    const date = new Date(year, month - 1, day);

    if (isNaN(date.getTime())) {
      return false;
    }

    const [parsedYear, parsedMonth, parsedDay] = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    ];
    if (year !== parsedYear || month !== parsedMonth || day !== parsedDay) {
      return false;
    }

    return true;
  };

  return (
    <div className='admin-user-container'>
      <Navbar />
      <div className='user-data-container'>
        <DoneAction
          show={showModal}
          handleClose={handleCloseModal}
          title='EDITING USER DATA'
        />
        {items.map((user, index) => (
          <UserCard
            key={index}
            user={user}
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

export default AdminUser;

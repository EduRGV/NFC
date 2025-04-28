// src/components/Listing/ListingPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../services/UserService';
import { Modal, Button, Spinner, Alert } from 'react-bootstrap';
import { ProfileService } from '../../services/ProfileServices';

const ListingPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'edit' o 'delete'
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    position: '',
    phonenumber: '',
    email: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await ProfileService.getProfile();

      console.log("Data:", data); // Verifica la estructura de los datos

      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setFormData({
      id: user.id,
      name: user.name,
      position: user.position,
      phoneNumber: user.phoneNumber,
      email: user.email,
      description: user.description,

    });
    setModalType('edit');
    setShowModal(true);
  };



  const handleDelete = (user) => {
    setCurrentUser(user);
    setModalType('delete');
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await ProfileService.deleteProfile(currentUser.id);
      fetchUsers();
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSave = async () => {
    try {
      await ProfileService.updateProfile(currentUser.id, formData);


      fetchUsers();
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return (
    <div className="d-flex justify-content-center mt-5">
      <Spinner animation="border" variant="primary" />
    </div>
  );

  if (error) return (
    <Alert variant="danger" className="m-3">
      Error: {error}
    </Alert>
  );

  console.log()

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-4">Listado de Usuarios</h1>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Posicion</th>
              <th>Numero</th>
              <th>Acciones</th>

            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.position}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/profile/${user.id}`)}
                    >
                    Ver perfil
                  </Button>

                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEdit(user)}
                    className="me-2"
                  >
                    <i className="bi bi-pencil"></i> Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(user)}
                  >
                    <i className="bi bi-trash"></i> Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Edición */}
      <Modal show={showModal && modalType === 'edit'} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <input
                type="hidden"
                className="form-control"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
              />
              <label htmlFor="name" className="form-label">Nombre de Usuario</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Descripcion</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Numero</label>
              <input
                type="number"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="position" className="form-label">Posicion</label>
              <input
                type="text"
                className="form-control"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </div>

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Eliminación */}
      <Modal show={showModal && modalType === 'delete'} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar al usuario <strong>{currentUser?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListingPage;
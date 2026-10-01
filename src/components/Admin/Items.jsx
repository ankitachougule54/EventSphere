import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Table,
  
  Container,
  
  InputGroup,
  Badge,
  Spinner,
} from "react-bootstrap";

import axios from "axios";

import {
  MdEdit,
  MdDelete,
  MdSearch,
  MdAdd,
  MdClose,
  MdInventory,
  MdImage,
} from "react-icons/md";

import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const API_URL = "https://eventsphere-5fey.onrender.com/item";
const IMAGE_URL = "https://eventsphere-5fey.onrender.com/uploads";

const Items = () => {
  // =========================
  // STATES
  // =========================

  const [items, setItems] = useState([]);

  const [itemData, setItemData] = useState({
    itemName: "",
    quantity: "",
    description: "",
    category: "",
    itemImage: null,
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [itemId, setItemId] = useState(null);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);

  // =========================
  // INIT
  // =========================

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    fetchItems();
  }, []);

  // =========================
  // FETCH ITEMS
  // =========================

  const fetchItems = async () => {
    try {
      setLoading(true);

      const response = await axios.get(API_URL);

      setItems(response.data.items || []);
    } catch (error) {
      console.error("Error fetching items:", error);

      alert(
        error.response?.data?.message ||
          "Error fetching items"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "itemImage") {
      const file = files?.[0];

      setItemData((previous) => ({
        ...previous,
        itemImage: file,
      }));

      if (file) {
        setImagePreview(URL.createObjectURL(file));
      }

      return;
    }

    setItemData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // CLEAR FORM
  // =========================

  const clearForm = () => {
    setItemData({
      itemName: "",
      quantity: "",
      description: "",
      category: "",
      itemImage: null,
    });

    setIsEditMode(false);
    setItemId(null);
    setImagePreview(null);

    const imageInput =
      document.getElementById("itemImage");

    if (imageInput) {
      imageInput.value = "";
    }
  };

  // =========================
  // ADD / UPDATE
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "itemName",
        itemData.itemName
      );

      formData.append(
        "quantity",
        itemData.quantity
      );

      formData.append(
        "description",
        itemData.description
      );

      formData.append(
        "category",
        itemData.category
      );

      if (itemData.itemImage) {
        formData.append(
          "itemImage",
          itemData.itemImage
        );
      }

      if (isEditMode && itemId) {
        await axios.put(
          `${API_URL}/${itemId}`,
          formData
        );

        alert("Item updated successfully!");
      } else {
        await axios.post(
          API_URL,
          formData
        );

        alert("Item added successfully!");
      }

      await fetchItems();

      clearForm();

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (item) => {
    setItemData({
      itemName: item.itemName || "",
      quantity: item.quantity || "",
      description: item.description || "",
      category:
        typeof item.category === "object"
          ? item.category?._id || ""
          : item.category || "",
      itemImage: null,
    });

    setItemId(item._id);
    setIsEditMode(true);

    if (item.itemImage) {
      setImagePreview(
        `${IMAGE_URL}/${item.itemImage}`
      );
    } else {
      setImagePreview(null);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Do you really want to delete this item?"
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      await axios.delete(
        `${API_URL}/${id}`
      );

      setItems((previousItems) =>
        previousItems.filter(
          (item) => item._id !== id
        )
      );

      if (itemId === id) {
        clearForm();
      }

      alert("Item deleted successfully!");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Error deleting item"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SEARCH
  // =========================

  const filteredItems = items.filter((item) => {
    const searchText =
      search.toLowerCase();

    const categoryName =
      typeof item.category === "object"
        ? item.category?.categoryName ||
          item.category?.name ||
          ""
        : item.category || "";

    return (
      item.itemName
        ?.toLowerCase()
        .includes(searchText) ||

      categoryName
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  // =========================
  // UI
  // =========================

  return (
    <div className="management-page">

      <Container>

        {/* ================= HEADER ================= */}

        <div
          className="management-header"
          data-aos="fade-down"
        >

          <div className="header-content">

            <div>

              <div className="small-heading">
                INVENTORY MANAGEMENT
              </div>

              <h1>
                Manage Your Items
              </h1>

              <p>
                Add, update and manage all inventory
                items in one place.
              </p>

            </div>

            <div className="total-card">

              <div className="total-icon">
                <MdInventory />
              </div>

              <div>
                <span>
                  Total Items
                </span>

                <strong>
                  {items.length}
                </strong>
              </div>

            </div>

          </div>

        </div>

        {/* ================= FORM ================= */}

        <div
          className="form-card"
          data-aos="fade-up"
        >

          <div className="form-heading">

            <div className="plus-icon">

              {isEditMode ? (
                <MdEdit />
              ) : (
                <MdAdd />
              )}

            </div>

            <div>

              <h2>
                {isEditMode
                  ? "Edit Item"
                  : "Add New Item"}
              </h2>

              <p>
                {isEditMode
                  ? "Update the item information."
                  : "Enter details to add a new item."}
              </p>

            </div>

          </div>

          <Form onSubmit={handleSubmit}>

            <Row>

              {/* ITEM NAME */}

              <Col md={6}>

                <div className="input-group-custom">

                  <Form.Label>
                    Item Name
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="itemName"
                    placeholder="Enter item name"
                    value={itemData.itemName}
                    onChange={handleChange}
                    required
                  />

                </div>

              </Col>

              {/* QUANTITY */}

              <Col md={6}>

                <div className="input-group-custom">

                  <Form.Label>
                    Quantity
                  </Form.Label>

                  <Form.Control
                    type="number"
                    name="quantity"
                    placeholder="Enter quantity"
                    value={itemData.quantity}
                    onChange={handleChange}
                    required
                  />

                </div>

              </Col>

              {/* CATEGORY */}

              <Col md={6}>

                <div className="input-group-custom">

                  <Form.Label>
                    Category
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="category"
                    placeholder="Enter category"
                    value={itemData.category}
                    onChange={handleChange}
                    required
                  />

                </div>

              </Col>

              {/* IMAGE */}

              <Col md={6}>

                <div className="input-group-custom">

                  <Form.Label>
                    Item Image
                  </Form.Label>

                  <Form.Control
                    id="itemImage"
                    type="file"
                    name="itemImage"
                    accept="image/*"
                    onChange={handleChange}
                  />

                </div>

              </Col>

              {/* DESCRIPTION */}

              <Col md={12}>

                <div className="input-group-custom">

                  <Form.Label>
                    Description
                  </Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    placeholder="Write item description..."
                    value={itemData.description}
                    onChange={handleChange}
                  />

                </div>

              </Col>

            </Row>

            {/* IMAGE PREVIEW */}

            {imagePreview && (

              <div className="preview-box">

                <img
                  src={imagePreview}
                  alt="Item Preview"
                />

                <div>
                  <MdImage size={25} />

                  <span>
                    Image Preview
                  </span>
                </div>

              </div>

            )}

            {/* BUTTONS */}

            <div className="form-buttons">

              <button
                type="submit"
                className={
                  isEditMode
                    ? "update-button"
                    : "add-button"
                }
                disabled={loading}
              >

                {loading ? (
                  <>
                    <Spinner
                      animation="border"
                      size="sm"
                    />

                    Processing...
                  </>
                ) : isEditMode ? (
                  <>
                    <MdEdit />
                    Update Item
                  </>
                ) : (
                  <>
                    <MdAdd />
                    Add Item
                  </>
                )}

              </button>

              {isEditMode && (

                <button
                  type="button"
                  className="cancel-button"
                  onClick={clearForm}
                >
                  <MdClose />
                  Cancel
                </button>

              )}

            </div>

          </Form>

        </div>

        {/* ================= LIST HEADER ================= */}

        <div
          className="list-header"
          data-aos="fade-up"
        >

          <div>

            <div className="small-heading">
              YOUR INVENTORY
            </div>

            <h2>
              Item Inventory
            </h2>

            <p>
              Manage all available items.
            </p>

          </div>

          <InputGroup className="search-box">

            <InputGroup.Text>
              <MdSearch />
            </InputGroup.Text>

            <Form.Control
              type="text"
              placeholder="Search item or category..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </InputGroup>

        </div>

        {/* ================= TABLE ================= */}

        <div
          className="table-card"
          data-aos="fade-up"
        >

          <div className="table-responsive">

            <Table hover>

              <thead>

                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Item Details</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="empty-row"
                    >

                      <Spinner animation="border" />

                      <p>
                        Loading...
                      </p>

                    </td>

                  </tr>

                ) : filteredItems.length === 0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="empty-row"
                    >
                      No items found.
                    </td>

                  </tr>

                ) : (

                  filteredItems.map(
                    (item, index) => {

                      const categoryName =
                        typeof item.category === "object"
                          ? item.category?.categoryName ||
                            item.category?.name ||
                            "-"
                          : item.category;

                      return (

                        <motion.tr
                          key={item._id}
                          initial={{
                            opacity: 0,
                            y: 20,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay: index * 0.08,
                          }}
                        >

                          <td>
                            {index + 1}
                          </td>

                          <td>

                            {item.itemImage ? (

                              <img
                                src={`${IMAGE_URL}/${item.itemImage}`}
                                alt={item.itemName}
                                className="table-image"
                              />

                            ) : (

                              <div className="image-placeholder">
                                <MdImage />
                              </div>

                            )}

                          </td>

                          <td>

                            <strong>
                              {item.itemName}
                            </strong>

                            <small>
                              {item.description ||
                                "No description"}
                            </small>

                          </td>

                          <td>

                            <Badge className="blue-badge">
                              {categoryName}
                            </Badge>

                          </td>

                          <td>

                            <Badge className="quantity-badge">
                              {item.quantity}
                            </Badge>

                          </td>

                          <td>

                            <button
                              className="table-edit"
                              onClick={() =>
                                handleEdit(item)
                              }
                            >
                              <MdEdit />
                            </button>

                            <button
                              className="table-delete"
                              onClick={() =>
                                handleDelete(
                                  item._id
                                )
                              }
                            >
                              <MdDelete />
                            </button>

                          </td>

                        </motion.tr>

                      );
                    }
                  )

                )}

              </tbody>

            </Table>

          </div>

        </div>

      </Container>

      {/* ================= CSS ================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .management-page {
          min-height: 100vh;
          background: #061a2d;
          color: white;
          padding: 40px 0 80px;
        }

        .management-header {
          background: #0b223b;
          border: 1px solid #1478c9;
          border-radius: 24px;
          padding: 50px;
          margin-bottom: 50px;
          box-shadow:
            0 0 30px rgba(0, 119, 255, 0.05);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;
        }

        .small-heading {
          color: #2196f3;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 4px;
          margin-bottom: 20px;
        }

        .management-header h1 {
          font-size: 50px;
          font-weight: 800;
          margin-bottom: 15px;
          color: #ffffff;
        }

        .management-header p {
          color: #91acc8;
          font-size: 20px;
          margin: 0;
        }

        .total-card {
          min-width: 230px;
          padding: 30px;
          border: 1px solid #236ca5;
          border-radius: 20px;
          background: #102e4b;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .total-icon {
          width: 62px;
          height: 62px;
          border-radius: 50%;
          background: #0879ec;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          box-shadow:
            0 0 25px rgba(0, 123, 255, 0.4);
        }

        .total-card span {
          display: block;
          color: #91acc8;
          font-size: 16px;
        }

        .total-card strong {
          font-size: 34px;
        }

        .form-card {
          background: #0b223b;
          border: 1px solid #236ca5;
          border-radius: 24px;
          padding: 55px 60px;
          margin-bottom: 60px;
        }

        .form-heading {
          display: flex;
          align-items: center;
          gap: 22px;
          margin-bottom: 40px;
        }

        .plus-icon {
          width: 74px;
          height: 74px;
          border-radius: 50%;
          background: #0879ec;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 35px;
          box-shadow:
            0 0 25px rgba(0, 123, 255, 0.35);
        }

        .form-heading h2 {
          margin: 0 0 8px;
          font-size: 36px;
          font-weight: 700;
        }

        .form-heading p {
          margin: 0;
          color: #91acc8;
          font-size: 18px;
        }

        .input-group-custom {
          margin-bottom: 28px;
        }

        .input-group-custom label {
          color: #ffffff;
          font-weight: 600;
          font-size: 17px;
          margin-bottom: 10px;
        }

        .input-group-custom input,
        .input-group-custom textarea {
          width: 100%;
          background: #143654;
          border: 1px solid #246c9e;
          color: #ffffff;
          border-radius: 14px;
          padding: 15px 18px;
          font-size: 16px;
        }

        .input-group-custom input::placeholder,
        .input-group-custom textarea::placeholder {
          color: #7795b3;
        }

        .input-group-custom input:focus,
        .input-group-custom textarea:focus {
          background: #163b5d;
          color: white;
          border-color: #2196f3;
          box-shadow:
            0 0 0 3px rgba(33, 150, 243, 0.12);
        }

        .input-group-custom input[type="file"] {
          padding: 11px;
        }

        .preview-box {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 18px;
          border: 1px dashed #2877ad;
          border-radius: 15px;
          margin-top: 10px;
          color: #91acc8;
        }

        .preview-box img {
          width: 85px;
          height: 85px;
          object-fit: cover;
          border-radius: 12px;
        }

        .form-buttons {
          display: flex;
          gap: 12px;
          margin-top: 30px;
        }

        .add-button,
        .update-button,
        .cancel-button {
          border: none;
          padding: 13px 28px;
          border-radius: 10px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .add-button {
          background: #0879ec;
          color: white;
          box-shadow:
            0 0 20px rgba(0, 123, 255, 0.25);
        }

        .update-button {
          background: #f0ad4e;
          color: white;
        }

        .cancel-button {
          background: #34495e;
          color: white;
        }

        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 25px;
          margin-bottom: 30px;
        }

        .list-header h2 {
          font-size: 36px;
          margin: 0 0 8px;
          font-weight: 700;
        }

        .list-header p {
          color: #91acc8;
          margin: 0;
        }

        .search-box {
          max-width: 350px;
        }

        .search-box .input-group-text,
        .search-box .form-control {
          background: #102e4b;
          border-color: #236ca5;
          color: white;
        }

        .search-box .form-control::placeholder {
          color: #7795b3;
        }

        .table-card {
          background: #0b223b;
          border: 1px solid #236ca5;
          border-radius: 20px;
          overflow: hidden;
        }

        .table {
          margin: 0;
          color: white;
          vertical-align: middle;
        }

        .table thead {
          background: #123452;
        }

        .table thead th {
          color: #ffffff;
          border-bottom: 1px solid #2877ad;
          padding: 18px;
          white-space: nowrap;
        }

        .table tbody tr {
          background: #0b223b;
          color: white;
          border-color: #173e5d;
          transition: 0.25s;
        }

        .table tbody tr:hover {
          background: #102f4d;
        }

        .table tbody td {
          padding: 18px;
          border-color: #173e5d;
        }

        .table tbody small {
          display: block;
          color: #7897b5;
          margin-top: 5px;
          max-width: 230px;
        }

        .table-image,
        .image-placeholder {
          width: 55px;
          height: 55px;
          border-radius: 12px;
        }

        .table-image {
          object-fit: cover;
        }

        .image-placeholder {
          background: #143654;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7795b3;
          font-size: 25px;
        }

        .blue-badge {
          background: #123f67 !important;
          color: #69b8ff !important;
          border: 1px solid #236ca5;
          padding: 9px 14px;
        }

        .quantity-badge {
          background: #0879ec !important;
          color: white !important;
          padding: 9px 14px;
        }

        .table-edit,
        .table-delete {
          width: 38px;
          height: 38px;
          border: none;
          border-radius: 9px;
          margin-right: 7px;
          cursor: pointer;
          font-size: 18px;
        }

        .table-edit {
          background: #f0ad4e;
          color: white;
        }

        .table-delete {
          background: #dc3545;
          color: white;
        }

        .empty-row {
          text-align: center;
          padding: 60px !important;
          color: #7897b5 !important;
        }

        .empty-row p {
          margin-top: 10px;
        }

        @media (max-width: 768px) {

          .management-page {
            padding: 20px 0 50px;
          }

          .management-header {
            padding: 30px 25px;
          }

          .header-content {
            flex-direction: column;
            align-items: flex-start;
          }

          .management-header h1 {
            font-size: 36px;
          }

          .management-header p {
            font-size: 16px;
          }

          .total-card {
            width: 100%;
          }

          .form-card {
            padding: 30px 20px;
          }

          .form-heading h2 {
            font-size: 27px;
          }

          .list-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .search-box {
            max-width: 100%;
            width: 100%;
          }

        }

      `}</style>

    </div>
  );
};

export default Items;
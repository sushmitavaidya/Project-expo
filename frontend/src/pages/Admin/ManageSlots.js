// import React, { useEffect, useState } from "react";
// import { Table, Button, Modal, Form, Input, message, Popconfirm } from "antd";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons"; // Import icons
// import axios from "axios";
// import "../../resources/ManageSlots.css"; // Link CSS file

// function ManageSlots() {
//   const [slots, setSlots] = useState([]);
//   const [editingSlot, setEditingSlot] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [form] = Form.useForm();
//   // Fetch slots
//   const fetchSlots = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("/api/slots");
//       if (response.data.success) {
//         setSlots(response.data.slots);
//       } else {
//         message.error("Failed to fetch slots");
//       }
//     } catch (error) {
//       console.error("Error fetching slots:", error);
//       message.error("Failed to fetch slots");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create or update slot
//   const handleCreateOrUpdateSlot = async (values) => {
//     try {
//       if (editingSlot) {
//         const response = await axios.put(
//           `/api/slots/${editingSlot._id}`,
//           values
//         );
//         if (response.data.success) {
//           message.success("Slot updated successfully");
//         } else {
//           message.error(response.data.message);
//         }
//       } else {
//         const response = await axios.post("/api/slots", values);
//         if (response.data.success) {
//           message.success("Slot created successfully");
//         } else {
//           message.error(response.data.message);
//         }
//       }
//       setIsModalOpen(false);
//       fetchSlots();
//     } catch (error) {
//       console.error("Error saving slot:", error);
//       message.error("Failed to save slot");
//     }
//   };

//   // Delete slot
//   const handleDeleteSlot = async (id) => {
//     try {
//       const response = await axios.delete(`/api/slots/${id}`);
//       if (response.data.success) {
//         message.success("Slot deleted successfully");
//         fetchSlots();
//       } else {
//         message.error(response.data.message);
//       }
//     } catch (error) {
//       console.error("Error deleting slot:", error);
//       message.error("Failed to delete slot");
//     }
//   };

//   useEffect(() => {
//     fetchSlots();
//   }, []);

//   const columns = [
//     {
//       title: "Slot ID",
//       dataIndex: "_id",
//     },
//     {
//       title: "Floor",
//       dataIndex: "floor",
//     },
//     {
//       title: "Slot Label",
//       dataIndex: "label",
//     },
//     {
//       title: "Actions",
//       render: (_, record) => (
//         <div className="actions">
//           <Button
//             type="primary"
//             shape="round"
//             icon={<EditOutlined />}
//             onClick={() => handleEditSlot(record)}
//           >
//             Edit
//           </Button>
//           <Popconfirm
//             title="Are you sure you want to delete this slot?"
//             onConfirm={() => handleDeleteSlot(record._id)}
//           >
//             <Button
//               type="primary"
//               danger
//               shape="round"
//               icon={<DeleteOutlined />}
//             >
//               Delete
//             </Button>
//           </Popconfirm>
//         </div>
//       ),
//     },
//   ];

//   const handleEditSlot = (slot) => {
//     setEditingSlot(slot);
//     form.setFieldsValue(slot);
//     setIsModalOpen(true);
//   };

//   const openCreateModal = () => {
//     setEditingSlot(null);
//     form.resetFields();
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="manage-slots-container">
//       <h1 className="manage-slots-title">Manage Slots</h1>
//       <div className="button-container">
//         <Button type="primary" onClick={openCreateModal}>
//           Add Slot
//         </Button>
//       </div>
//       <Table
//         columns={columns}
//         dataSource={slots}
//         rowKey="_id"
//         loading={loading}
//         style={{ marginTop: 20 }}
//       />
//       <Modal
//         title={editingSlot ? "Edit Slot" : "Add Slot"}
//         visible={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         footer={null}
//       >
//         <Form form={form} layout="vertical" onFinish={handleCreateOrUpdateSlot}>
//           <Form.Item
//             label="Floor"
//             name="floor"
//             rules={[{ required: true, message: "Please enter floor" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Slot Label"
//             name="label"
//             rules={[{ required: true, message: "Please enter slot label" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Button type="primary" htmlType="submit">
//             {editingSlot ? "Update" : "Create"}
//           </Button>
//         </Form>
//       </Modal>
//     </div>
//   );
// }

// export default ManageSlots;

import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"; // Import icons
import axios from "axios";
import "../../resources/ManageSlots.css"; // Link CSS file

function ManageSlots() {
  const [slots, setSlots] = useState([]);
  const [editingSlot, setEditingSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Fetch slots
  const fetchSlots = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/slots");
      if (response.data.success) {
        setSlots(response.data.slots);
      } else {
        message.error("Failed to fetch slots");
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
      message.error("Failed to fetch slots");
    } finally {
      setLoading(false);
    }
  };

  // Create or update slot
  const handleCreateOrUpdateSlot = async (values) => {
    try {
      if (editingSlot) {
        const response = await axios.put(
          `/api/slots/${editingSlot._id}`,
          values
        );
        if (response.data.success) {
          message.success("Slot updated successfully");
        } else {
          message.error(response.data.message);
        }
      } else {
        const response = await axios.post("/api/slots", values);
        if (response.data.success) {
          message.success("Slot created successfully");
        } else {
          message.error(response.data.message);
        }
      }
      setIsModalOpen(false);
      fetchSlots();
    } catch (error) {
      console.error("Error saving slot:", error);
      message.error("Failed to save slot");
    }
  };

  // Delete slot
  const handleDeleteSlot = async (id) => {
    try {
      const response = await axios.delete(`/api/slots/${id}`);
      if (response.data.success) {
        message.success("Slot deleted successfully");
        fetchSlots();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting slot:", error);
      message.error("Failed to delete slot");
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const columns = [
    {
      title: "Slot ID",
      dataIndex: "_id",
    },
    {
      title: "Floor",
      dataIndex: "floor",
    },
    {
      title: "Slot Label",
      dataIndex: "label",
    },
    
    {
      title: "Actions",
      render: (_, record) => (
        <div className="actions">
          <Button
            type="primary"
            shape="round"
            icon={<EditOutlined />}
            onClick={() => handleEditSlot(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this slot?"
            onConfirm={() => handleDeleteSlot(record._id)}
          >
            <Button
              type="primary"
              danger
              shape="round"
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleEditSlot = (slot) => {
    setEditingSlot(slot);
    form.setFieldsValue(slot);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingSlot(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  return (
    <div className="manage-slots-container">
      <h1 className="manage-slots-title">Manage Slots</h1>
      <div className="button-container">
        <Button type="primary" onClick={openCreateModal}>
          Add Slot
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={slots}
        rowKey="_id"
        loading={loading}
        style={{ marginTop: 20 }}
      />
      <Modal
        title={editingSlot ? "Edit Slot" : "Add Slot"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateOrUpdateSlot}>
          <Form.Item
            label="Floor"
            name="floor"
            rules={[{ required: true, message: "Please enter floor" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Slot Label"
            name="label"
            rules={[{ required: true, message: "Please enter slot label" }]}
          >
            <Input />
          </Form.Item>
          
          <Button type="primary" htmlType="submit">
            {editingSlot ? "Update" : "Create"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default ManageSlots;
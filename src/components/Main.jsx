import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Table, Button, Modal, Form, Input } from "antd";
import 'antd/dist/reset.css'; 
const Main = () => {
  
  const [newsList, setNewsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  const [form] = Form.useForm();

  const handleAddNews = () => {
    setIsModalOpen(true);
    setEditingNews(null);
    form.resetFields();
  };

  const handleEditNews = (record) => {
    setIsModalOpen(true);
    setEditingNews(record);
    form.setFieldsValue(record);
  };

  const handleDeleteNews = (id) => {
    setNewsList(newsList.filter((news) => news.id !== id));
  };

  const handleModalSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingNews) {
         
          setNewsList(
            newsList.map((news) =>
              news.id === editingNews.id ? { ...news, ...values } : news
            )
          );
        } else {
          
          setNewsList([...newsList, { id: uuidv4(), ...values }]);
        }
        setIsModalOpen(false);
      })
      .catch((info) => console.error("Validation Failed:", info));
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button className="text-black" type="link" onClick={() => handleEditNews(record)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>

          <Button className="text-red-600" type="link" danger onClick={() => handleDeleteNews(record.id)}>
            <i className="fa-solid fa-trash"></i>
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
        <div className="flex justify-center">
        <h1 className="inline-block px-4 py-2 text-white text-2xl font-[Parkinsans] bg-blue-600 rounded">
          News Management
        </h1>
        </div>
      <div className="flex justify-end">
      <Button className="flex justify-center" type="primary" onClick={handleAddNews} style={{ marginBottom: "20px" }}>
        Add News +
      </Button>
      </div>
      <Table dataSource={newsList} columns={columns} rowKey="id" />

      <Modal
        title={editingNews ? "Edit News" : "Add News"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleModalSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Main;
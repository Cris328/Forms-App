import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [popularTemplates, setPopularTemplates] = useState([]);
  const [allTemplates, setAllTemplates] = useState([]);
  const [topics, setTopics] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularTemplates = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('/api/v1/templates/popular', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPopularTemplates(data.data || []);
      } catch (error) {
        console.error('Error fetching popular templates', error);
      }
    };

    const fetchTopics = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('/api/v1/topics', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTopics(data.data || []);
      } catch (error) {
        console.error('Error fetching topics:', error.response?.data || error.message);
      }
    };

    fetchPopularTemplates();
    fetchTopics();
  }, []);

  useEffect(() => {
    const fetchAllTemplates = async () => {
      try {
        const searchQuery = search.trim();
        const topicQuery = topic.trim();
    
        if (!searchQuery && !topicQuery) {
          console.log('Both search query and topic are empty. Please provide at least one.');
          return;
        }
    
        const response = await axios.get('/api/v1/templates/search', {
          params: {
            search: searchQuery || undefined,
            topic: topicQuery || undefined,
          },
        });
    
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching templates: ', error.response.data);
      }
    };
    
    

    fetchAllTemplates();
  }, [search, selectedTopicId]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="container-fluid p-0">
      <div className="bg-dark text-white d-flex justify-content-between align-items-center p-3">
        <h2>Welcome to my Forms App</h2>
        <div className="d-flex align-items-center">
          <input
            type="text"
            placeholder="Search templates..."
            value={search}
            onChange={handleSearch}
            className="form-control me-3"
            style={{ maxWidth: 300 }}
          />
          <div
            className="user-icon"
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              color: '#333',
            }}
            onClick={() => navigate('/profile')}
          >
            <i className="fas fa-user" style={{ fontSize: 20 }}></i>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="mb-4">
          <p className="fs-5">
            Welcome to my form app, where you can easily create and answer forms, as well as like and comment on your favorites.
          </p>
        </div>

        <div className="mb-4">
          <h4 className="text-dark mb-3 p-2 rounded" style={{ backgroundColor: '#f7f7f7' }}>
            Top 5 Most Liked Templates
          </h4>
          <div className="row mb-5">
            {Array.isArray(popularTemplates) && popularTemplates.length > 0 ? (
              popularTemplates.map((template) => (
                <div key={template._id} className="col-md-4 mb-3">
                  <Card>
                    <Card.Body>
                      <Card.Title>{template.title}</Card.Title>
                      <Card.Text>{template.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              <p>Templates not found yet.</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-dark mb-3 p-2 rounded" style={{ backgroundColor: '#f7f7f7' }}>
            Explore More Templates
          </h4>

          <div className="mb-3">
            <select
              className="form-select"
              value={selectedTopicId}
              onChange={(e) => setSelectedTopicId(e.target.value)}
            >
              <option value="">All topics</option>
              {topics.map((topic) => (
                <option key={topic._id} value={topic._id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>

          <div className="row">
            {Array.isArray(allTemplates) && allTemplates.length > 0 ? (
              allTemplates.map((template) => (
                <div key={template._id} className="col-md-3 mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>{template.title}</Card.Title>
                      <Card.Text>{template.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              <p>No templates found.</p>
            )}
          </div>
        </div>

        <Button
          variant="primary"
          className="position-fixed"
          style={{
            bottom: 30,
            right: 30,
            borderRadius: '50%',
            width: 60,
            height: 60,
            padding: 0,
          }}
          onClick={() => navigate('/create-template')}
        >
          <span className="text-white" style={{ fontSize: 22 }}>+</span>
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;

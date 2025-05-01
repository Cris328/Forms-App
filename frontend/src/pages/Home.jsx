import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">welcome to Forms app</h1>
      <p className="lead">Create and respond to custom forms quickly and easily</p>

      <div className="mt-4 d-flex justify-content-center gap-3">
        <Link to="/login" className="btn btn-primary btn-lg">Sign In</Link>
        <Link to="/register" className="btn btn-outline-primary btn-lg">Sign Up</Link>
      </div>
    </div>
  );
};

export default Home;

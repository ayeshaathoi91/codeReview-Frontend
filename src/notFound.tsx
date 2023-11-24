import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h1>Page Not found</h1>
      <Link to="/" style={{ color: 'blue' }}>
        Go to home page.
      </Link>
    </>
  );
}
export default NotFound;

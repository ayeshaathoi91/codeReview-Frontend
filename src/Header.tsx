import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <div className="flex items-center justify-between fixed top-0 z-30 w-full py-6 bg-blue-300">
        <div className="flex items-center w-5/6 mx-auto">
          <div>
            <Link to="/">
              <span className="text-2xl font-semibold text-white">
                Code Review Survey
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

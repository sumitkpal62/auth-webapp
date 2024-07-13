import "./About.css";
const About = () => {
  return (
    <div className="max-w-[80%] mx-auto">
      <h1 className="text-3xl font-semibold text-center my-4">About</h1>
      <ul>
        <ul className="listItem">
          <span>Technologies Used:</span>
          <li className="list">
            <span>Frontend:</span> React, React-Router
          </li>
          <li className="list">
            <span>Backend:</span> Node.js, Express
          </li>
          <li className="list">
            <span>Database:</span> MongoDB
          </li>
          <li className="list">
            <span>Authentication:</span> Google OAuth, Firebase
          </li>
          <li className="list">
            <span>Security:</span> JSON Web Tokens (JWT), cookies
          </li>
        </ul>
        <ul className="listItem">
          <span>Key Features:</span>
          <li className="list">
            <span>CRUD Operations:</span> Full support for Create, Read, Update,
            and Delete operations, allowing users to manage their data
            effortlessly.
          </li>
          <li className="list">
            <span>User Authentication:</span> Secure login via Google OAuth,
            enhanced with Firebase for robust authentication mechanisms.
          </li>
          <li className="list">
            <span>Seamless Navigation: </span>Smooth page transitions using
            React-Router, ensuring a user-friendly experience.
          </li>
        </ul>
        <ul className="listItem">
          <span>Security and Efficiency:</span>
          <li className="list">
            <span>JWT and Cookies: </span>Ensures secure user sessions and state
            management.
          </li>
          <li className="list">
            <span>RESTful API: </span> Efficient communication between frontend
            and backend, ensuring reliable data transactions.
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default About;

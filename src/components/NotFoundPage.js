import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    This is from my <strong>not found</strong> component. <Link to="/">Go Home</Link>
  </div>
);

export default NotFoundPage;
import React from 'react';
import Layout from '../components/Layout';
import ContentRouter from '../components/ContentRouter';
import { useLocation } from 'react-router-dom';

const Index = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userType = (params.get('userType') || 'student') as 'admin' | 'student';

  return (
    <Layout userType={userType}>
      <ContentRouter activeTab="dashboard" userType={userType} />
    </Layout>
  );
};

export default Index;

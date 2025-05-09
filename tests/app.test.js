const request = require('supertest');
const app = require('../src/app');
const React = require('react');
const { render } = require('@testing-library/react');
const Dashboard = require('../src/components/Dashboard').default;

describe('API endpoints', () => {
  test('GET / should return HTML', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('text/html');
  });

  test('GET /api/health should return UP status', async () => {
    const response = await request(app).get('/api/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('UP');
  });
});

describe('Dashboard Component', () => {
  test('renders stock symbols', () => {
    const { getByText } = render(<Dashboard />);
    expect(getByText('AAPL')).toBeInTheDocument();
    expect(getByText('GOOGL')).toBeInTheDocument();
    expect(getByText('MSFT')).toBeInTheDocument();
    expect(getByText('AMZN')).toBeInTheDocument();
  });
});
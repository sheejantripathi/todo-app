import request from 'supertest';
import app from '../app'; // Assuming your Express app is exported from app.ts
import Group from '../models/Group'; // Sequelize model
import authMiddleware from '../middleware/auth'; // Mock auth middleware

jest.mock('../middleware/auth'); // Mock the authentication middleware
jest.mock('../models/Group'); // Mock the Group model

describe('Groups API', () => {
  // Mock authentication middleware
  beforeEach(() => {
    (authMiddleware as jest.Mock).mockImplementation((req, res, next) => {
      req.user = { id: 1 };  // Mock user ID
      next();
    });
  });

  // Test for GET /groups
  describe('GET /groups', () => {
    it('should fetch all groups for the authenticated user', async () => {
      const mockGroups = [
        { id: 1, name: 'Group 1', userId: 1 },
        { id: 2, name: 'Group 2', userId: 1 },
      ];

      (Group.findAll as jest.Mock).mockResolvedValue(mockGroups);

      const response = await request(app).get('/groups');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockGroups);
    });

    it('should return 500 if there is a server error', async () => {
      (Group.findAll as jest.Mock).mockRejectedValue(new Error('Server error'));

      const response = await request(app).get('/groups');
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Internal Server Error');
    });
  });

  // Test for GET /groups/:id
  describe('GET /groups/:id', () => {
    it('should return a single group by ID', async () => {
      const mockGroup = { id: 1, name: 'Group 1', userId: 1 };

      (Group.findOne as jest.Mock).mockResolvedValue(mockGroup);

      const response = await request(app).get('/groups/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockGroup);
    });

    it('should return 404 if the group is not found', async () => {
      (Group.findOne as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/groups/999');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Group not found');
    });

    it('should return 500 on server error', async () => {
      (Group.findOne as jest.Mock).mockRejectedValue(new Error('Server error'));

      const response = await request(app).get('/groups/1');
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Internal Server Error');
    });
  });

  // Test for POST /groups
  describe('POST /groups', () => {
    it('should create a new group', async () => {
      const newGroup = { name: 'New Group' };
      const savedGroup = { id: 3, ...newGroup, userId: 1 };

      (Group.create as jest.Mock).mockResolvedValue(savedGroup);

      const response = await request(app).post('/groups').send(newGroup);
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: 'Group created',
        group: savedGroup,
      });
    });

    it('should return 500 on server error', async () => {
      (Group.create as jest.Mock).mockRejectedValue(new Error('Server error'));

      const response = await request(app).post('/groups').send({ name: 'New Group' });
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Internal Server Error');
    });
  });

  // Test for PUT /groups/:id
  describe('PUT /groups/:id', () => {
    it('should update a group', async () => {
      const existingGroup = { id: 7, name: 'Existing Group', userId: 1 };

      (Group.findOne as jest.Mock).mockResolvedValue(existingGroup);
      (Group.prototype.save as jest.Mock).mockResolvedValue(existingGroup);

      const updatedGroup = { name: 'Updated Group' };

      const response = await request(app).put('/groups/7').send(updatedGroup);
      expect(response.status).toBe(200);
      expect(response.body.group.name).toBe(updatedGroup.name);
    });

    it('should return 404 if group not found', async () => {
      (Group.findOne as jest.Mock).mockResolvedValue(null);

      const response = await request(app).put('/groups/999').send({ name: 'Updated Group' });
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Group not found');
    });

    it('should return 500 on server error', async () => {
      (Group.findOne as jest.Mock).mockRejectedValue(new Error('Server error'));

      const response = await request(app).put('/groups/1').send({ name: 'Updated Group' });
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Internal Server Error');
    });
  });

  // Test for DELETE /groups/:id
  describe('DELETE /groups/:id', () => {
    it('should delete a group', async () => {
      const mockGroup = { id: 1, name: 'Test Group', userId: 1 };

      (Group.findOne as jest.Mock).mockResolvedValue(mockGroup);
      (Group.prototype.destroy as jest.Mock).mockResolvedValue(mockGroup);

      const response = await request(app).delete('/groups/1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Group deleted');
    });

    it('should return 404 if group not found', async () => {
      (Group.findOne as jest.Mock).mockResolvedValue(null);

      const response = await request(app).delete('/groups/999');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Group not found');
    });

    it('should return 500 on server error', async () => {
      (Group.findOne as jest.Mock).mockRejectedValue(new Error('Server error'));

      const response = await request(app).delete('/groups/1');
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Internal Server Error');
    });
  });
});

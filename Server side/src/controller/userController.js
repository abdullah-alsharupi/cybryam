import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();

router.post('/add_user', async (req, res) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      },
    });
    return res.status(200).json({ message: "User added successfully", data: newUser });
  } catch (err) {
    console.error('Error adding user:', err);
    return res.status(500).json({ error: 'Failed to add new user' });
  }
});

router.get('/fetch_user', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { is_deleted: false },
    });
    return res.json(users);
  } catch (err) {
    console.error('Error fetching products:', err);
    return res.status(500).json({ message: 'Error fetching products' });
  }
});

router.put('/update_user/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }
    });
    return res.status(200).json({ message: 'Updating successfully', data: updatedUser });
  } catch (err) {
    console.error('Error updating user:', err);
    return res.status(500).json({ message: 'Error updating user' });
  }
});

router.delete('/delete_user/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const deleteUser = await prisma.user.update({
      where: { id: userId },
      data: { is_deleted: true }
    });
    if (deleteUser.is_deleted) {
      return res.status(200).json({ message: 'User deleted successfully' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Error deleting user:', err);
    return res.status(500).json({ message: 'Error deleting user' });
  }
});

router.get('/get_user/:id', async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Error fetching user' });
  }
});
export default router;
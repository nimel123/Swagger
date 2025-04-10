const express=require('express');
const Router=express.Router();
const controller=require('../Controllers/Controller');

/**
         * @swagger
         * /signup:
         *   post:
         *     summary: Register a new user
         *     tags: [Users]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - name
         *               - email
         *               - password
         *             properties:
         *               name:
         *                 type: string
         *               email:
         *                 type: string
         *               password:
         *                 type: string
         *           example:
         *             name: John Doe
         *             email: john@example.com
         *             password: secret123
         *     responses:
         *       200:
         *         description: User created successfully
         *       400:
         *         description: Email already exists
         */
        Router.post('/signup',controller.Signup);

        /**
* @swagger
* /getallusers:
*   get:
*     summary: Retrieve all users
*     tags: [Users]
*     responses:
*       200:
*         description: A list of users
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   name:
*                     type: string
*                   email:
*                     type: string
*                   password:
*                     type: string
*                 example:
*                   name: Ramesh
*                   email: rnimel5@gmail.com
*                   password: ramesh@123
*/
Router.get('/getallusers',controller.GetAllUsers);

/**
 * @swagger
 * /getuser:
 *   post:
 *     summary: Retrieve a user by email
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *           example:
 *             email: john@example.com
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
Router.post('/getuser',controller.GetSingleUser);


/**
 * @swagger
 * /updateuser:
 *   put:
 *     summary: Update user's password by email
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             email: john@example.com
 *             password: newpass123
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
Router.put('/updateuser',controller.Update);

/**
 * @swagger
 * /deleteuser/{email}:
 *   delete:
 *     summary: Delete a user by email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
Router.delete('/deleteuser/:email',controller.DeleteUser);

module.exports =Router;

# 3D Printing Materials API

This project is a Node.js backend application that utilizes MongoDB to manage information about various 3D printing materials. It includes functionality for storing and retrieving images associated with each material.

## Tech Stack

- **Tyepscript**: Programming language.
- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Cloud Storage**: AWS S3 for storing images.
- **swagger**: API documentation

## Implementation

The backend server is built using Node.js, Express, and TypeScript, ensuring a robust and scalable architecture. MongoDB is used for data storage, with Mongoose providing schema definition and CRUD operations. Image handling is managed using AWS S3 for efficient and scalable storage. Swagger and OpenAPI are used for comprehensive API documentation. The server is hosted on Render, providing a reliable deployment environment.

### Key Features:
1. **CRUD Operations**: Implemented for managing 3D printing materials.
2. **Image Handling**: Upload and retrieve images associated with materials.
3. **Endpoints**:
    - Fetch all materials
    - Retrieve a specific material by ID
    - Add a new material
    - Update an existing material
    - Delete a material

 ```plaintext
    Note: In this assignment, I've used a sample image URL to store on S3 for demonstration purposes.
    In a real application, we would store actual images on S3 and save their URLs in the database.
 ```

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/PranitPatil03/materials-server.git
    cd materials-server
    ```

2. Install dependencies:
    ```bash
    yarn install && yarn build
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```plaintext
    PORT=3000
    MONGODB_URI=<your-mongodb-uri>
    MONGO_PASS=<your-mongodb-password>
    AWS_ACCESS_KEY=<your-aws-access-key>
    AWS_SECRET_KEY=<your-aws-secret-key>
    AWS_BUCKET_NAME=<your-aws-bucket-name>
    AWS_REGION=<your-aws-region>
    ```

4. Run the server:
    ```bash
    yarn dev
    ```
    
5. **Open the backend application in Your Browser**

   Visit `http://localhost:3000` for your application, and access documentation at `http://localhost:3000/docs`.
   
## Documentation

For detailed API documentation, including example requests and responses, 
please refer to the Swagger documentation available at: [Swagger API Documentation](https://materials-server-kqjm.onrender.com/docs/)

## Contact

For any queries, feel free to reach out:

- **Portfolio:** [Pranit Patil](https://patilpranit.vercel.app/)
- **Email:** patilpranit3112@gmail.com

Thank you for the opportunity to work on this assignment!

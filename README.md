# React CRUD Application with Class Components

## Overview
This project is a React-based CRUD (Create, Read, Update, Delete) application designed to interact with a JSON-based API backend. It uses class components instead of functional components with hooks, making it suitable for legacy codebases or projects requiring specific lifecycle methods like `componentDidMount`.

## Features

### Core Functionality:
- **Read:** Display a list of users fetched from the backend.
- **Add:** Provide a form to add a new user.
- **Update:** Update an existing user's name and email.
- **Delete:** Remove a user by selecting their ID.

### Technologies:
- React with class components
- Axios for HTTP requests
- CSS for styling
- JSON server as a mock backend (`http://localhost:4500/users`)

## Folder Structure

```
project-directory/
|-- src/
    |-- components/
        |-- Form.jsx
        |-- UserActions.jsx
        |-- UserActions.css
    |-- App.jsx
```

### Components
1. **`Form.jsx`**
   - Handles both `Add` and `Update` operations.
   - Includes validation for name and email fields.
   - Accepts props to dynamically configure the form mode (Add or Update).

2. **`UserActions.jsx`**
   - Manages the application's main logic.
   - Handles CRUD operations by interacting with the backend using Axios.
   - Provides buttons to switch between modes (Read, Add, Update, Delete).
   - Displays user lists and allows ID selection for updates or deletions.

3. **`UserActions.css`**
   - Provides styling for the user list and buttons.
   - Highlights selected users for updates or deletions.

4. **`App.jsx`**
   - Serves as the main entry point.
   - Integrates the `UserActions` component.

## How It Works

### Read:
1. On component mount, `UserActions` fetches users from the backend using Axios (`GET /users`).
2. Displays the list of users with selectable IDs.

### Add:
1. Clicking the "Add" button renders the `Form` component.
2. Submits data to the backend using Axios (`POST /users`).

### Update:
1. Select a user ID from the list and click "Update".
2. Renders the `Form` component pre-filled with user data.
3. Submits updates to the backend using Axios (`PUT /users/:id`).

### Delete:
1. Select a user ID and click "Delete".
2. Deletes the user from the backend using Axios (`DELETE /users/:id`).

## Validation Rules
- **Name:** Required, cannot be empty.
- **Email:** Required, must match the email format (`example@domain.com`).

## Getting Started

### Prerequisites
1. Install Node.js and npm.
2. Install JSON Server:
   ```bash
   npm install -g json-server
   ```

### Setup
1. Clone the repository.
2. Navigate to the project directory and install dependencies:
   ```bash
   npm install
   ```
3. Start the JSON Server:
   ```bash
   json-server --watch db.json --port 4500
   ```
4. Start the React application:
   ```bash
   npm start
   ```

### db.json
Ensure your `db.json` file is structured like this:
```json
{
  "users": [
    { "id": "1", "name": "John Doe", "email": "john@example.com" },
    { "id": "2", "name": "Jane Smith", "email": "jane@example.com" }
  ]
}
```

## Future Improvements
- Use functional components with React hooks for modern implementations.
- Enhance validation with libraries like Formik or Yup.
- Add pagination and search functionality for user lists.
- Implement proper error handling for network failures.

## License
This project is open-source and available under the MIT License.


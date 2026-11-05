
# Tasker - Task Management Application

Tasker is a AI-featured task management application built with Vue.js to help users organize projects, manage tasks, and track their work efficiently.

## 🚀 Features

- User Authentication (Login & Register)
- Project Management
- Section-based Task Organization
- Task Assignment and Management
- Task Status Tracking
- Task Priority Management
- AI-powered Chat Assistant
- Real-time Streaming AI Responses
- Markdown Rendering for AI Responses
- Responsive User Interface

## 🛠️ Tech Stack

- **Frontend:** Vue.js 3
- **State Management:** Pinia
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **AI Integration:** Laravel AI SDK & Google Gemini
- **Markdown:** Marked
- **HTML Sanitization:** DOMPurify
- **Build Tool:** Vite

## 📂 Project Structure

```text
src/
├── api/
│   ├── axios.js
│   └── aiChat.js
├── components/
│   └── common/
│       └── AiChatWidget.vue
├── stores/
│   ├── auth.js
│   └── aiChat.js
├── views/
├── router/
└── App.vue
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Navigate to the Project

```bash
cd tasker-fe
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Update the API URL according to your Laravel backend configuration.

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## 🤖 AI Integration

Tasker includes an AI-powered chatbot built using Laravel AI SDK and Google Gemini.

Key highlights:

- Integrated Google Gemini as the AI provider.
- Custom AI tools to retrieve user-specific task information.
- Real-time streaming responses.
- Interactive chatbot interface using Vue.js.
- Markdown-formatted AI responses.

## 🔗 Backend Repository

The backend is developed separately using Laravel.

**Backend:** https://github.com/Saheer-kp/Tasker-backend

## 📌 Future Improvements

- More AI-powered task management features.
- Improved project planning assistance.
- Additional AI tool integrations.
- Enhanced user experience.

## 👨‍💻 Author

**Saheer KP**

Full Stack Software Engineer

---

⭐ If you find this project interesting, feel free to explore the repository!

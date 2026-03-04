# OrbitMedia Service

A lightweight microservice that provides an **in-app PDF viewer** for the OrbitRMS platform. Instead of opening uploaded documents in an external browser tab, OrbitRMS renders them directly through this dedicated media service — delivering a seamless, embedded viewing experience.

---

## ✨ Features

- **Embedded PDF Viewer** — renders PDFs inside an in-app iframe, no external browser needed
- **Cloudinary Integration** — fetches media assets from Cloudinary using signed URLs
- **Redis Caching** — caches fetched documents (base64, 10-min TTL) for faster repeated access
- **EJS Templating** — server-side rendered viewer and error pages
- **Health Check Endpoint** — built-in `/health` route for monitoring and uptime checks
- **Clean Error Handling** — user-friendly error page with technical details and a return link

---

## 🏗️ Architecture

```
OrbitRMS App
    │
    ▼
/uploads/public/:folder/:id/:file_name
    │
    ▼
view-media.ejs (embedded iframe)
    │
    ▼
/stream/:folder/:id
    │
    ├── Cache HIT  → Serve from Redis
    │
    └── Cache MISS → Fetch from Cloudinary → Cache in Redis (10 min) → Serve
```

---

## 📁 Project Structure

```
OrbitRMS-Media-Service/
├── index.js                # Express server entry point
├── config/
│   └── EnvConfig.js        # Centralized environment config
├── routes/
│   └── media.js            # Media viewer & streaming routes
├── services/
│   ├── caching.js          # Redis client setup & connection
│   └── cloudinary.js       # Cloudinary signed URL generation
├── ui/
│   ├── view-media.ejs      # PDF viewer template
│   └── error.ejs           # Error page template
├── .env                    # Environment variables
├── package.json
└── pnpm-lock.yaml
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+)
- **pnpm** (or npm/yarn)
- **Redis** server running locally or remotely
- **Cloudinary** account with uploaded media assets

### Installation

```bash
# Clone the repository
git clone https://github.com/VarunPatel-07/OrbitRMS-Media-Service.git
cd OrbitRMS-Media-Service

# Install dependencies
pnpm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=500

CACHED_DATABASE_HOST=localhost
CACHED_DATABASE_PORT=6379
CACHED_DATABASE_PASSWORD=

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Run the Service

```bash
# Development (with hot-reload)
pnpm dev

# Or directly
node index.js
```

The service will start on **http://localhost:500**

---

## 📡 API Endpoints

| Method | Endpoint                                 | Description                                        |
| ------ | ---------------------------------------- | -------------------------------------------------- |
| `GET`  | `/uploads/public/:folder/:id/:file_name` | Renders the embedded PDF viewer page               |
| `GET`  | `/stream/:folder/:id`                    | Streams the PDF binary (used by the viewer iframe) |
| `GET`  | `/health`                                | Returns service health status and uptime           |

### Health Check Response

```json
{
  "status": "ok",
  "success": true,
  "service": "OrbitMedia Service",
  "message": "Welcome to the OrbitMedia service",
  "uptime": 123.456
}
```

---

## 🛠️ Tech Stack

| Technology     | Purpose                         |
| -------------- | ------------------------------- |
| **Express**    | Web framework                   |
| **EJS**        | Server-side templating          |
| **Cloudinary** | Cloud media storage & delivery  |
| **Redis**      | Document caching layer          |
| **Axios**      | HTTP client for fetching media  |
| **dotenv**     | Environment variable management |
| **Nodemon**    | Development hot-reload          |

---

## License

The source code of this project is licensed under the
[MIT License](/LICENSE).

The name **OrbitRMS**, the OrbitRMS logo, and all associated branding assets
are trademarks of OrbitRMS and are **not included** under the MIT License.
See the [Trademark & Branding Policy](/TRADEMARK.md) for details.

## Contact

For any inquiries or support, please contact:

- **Varun Patel**
- **Email**: <contact.varunpatel.dev@gmail.com>
- **Website**: [https://varunpatel.vercel.app/](https://varunpatel.vercel.app/)
- **GitHub**: [VarunPatel-07](https://github.com/VarunPatel-07)

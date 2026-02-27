# Personal Web

![Statamic](https://img.shields.io/badge/Statamic-3.0+-FF269E?style=for-the-badge&logo=Statamic&logoColor=white) ![Laravel](https://img.shields.io/badge/Laravel-10.0+-FF2D20?style=for-the-badge&logo=laravel&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-4.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)

A personal website project built with [Statamic](https://statamic.com/), a modern, flat-file CMS powered by [Laravel](https://laravel.com/). This repository contains the source code, content configuration, and frontend assets for the website.

## 📋 Description

This project serves as a personal portfolio or blog website. It leverages Statamic's powerful features to manage content without a traditional database (flat-file), while utilizing Laravel's robust backend capabilities. The frontend is built with modern tooling including Vite and SCSS.

## ✨ Features

- **Flat-File CMS**: Content is stored in Markdown and YAML files, making it version-controllable and easy to manage.
- **Dynamic Templating**: Uses Statamic's Antlers templating engine for flexible and expressive layouts.
- **Modern Frontend**: Integrated with Vite for fast asset bundling and SCSS for styling.
- **Docker Support**: Includes a `Dockerfile` for containerized deployment.
- **Responsive Design**: Built to be mobile-friendly and accessible.
- **SEO Friendly**: Statamic provides built-in tools for SEO management.

## 🛠 Tech Stack

- **Backend Framework**: [Laravel](https://laravel.com/) (PHP)
- **CMS**: [Statamic](https://statamic.com/)
- **Frontend**:
  - [Antlers](https://statamic.dev/antlers) (Templating)
  - [SCSS](https://sass-lang.com/) (Styling)
  - JavaScript
  - [Vite](https://vitejs.dev/) (Build Tool)
- **Package Managers**: [Composer](https://getcomposer.org/) (PHP), [NPM](https://www.npmjs.com/) (JS)
- **DevOps**: [Docker](https://www.docker.com/)

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [PHP](https://www.php.net/) >= 8.1
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) & NPM
- [Docker](https://www.docker.com/) (Optional, for containerized run)

## 🚀 Installation

Follow these steps to set up the project locally:

1. **Clone the repository**
   ```bash
   git clone [https://github.com/divawidia/personal-web.git](https://github.com/divawidia/personal-web.git)
   cd personal-web

```

2. **Install PHP Dependencies**
```bash
composer install

```


3. **Install Frontend Dependencies**
```bash
npm install

```


4. **Environment Configuration**
Copy the example environment file and configure it:
```bash
cp .env.example .env

```


*Note: Update the `APP_URL` in `.env` to match your local development URL (e.g., `http://localhost:8000`).*
5. **Generate Application Key**
```bash
php artisan key:generate

```


6. **Create a User**
Create your first administrative user to access the Control Panel:
```bash
php please make:user

```



## 💻 Usage

### Development Server

To start the development server with hot module replacement (HMR) for assets:

1. Start the Laravel server:
```bash
php artisan serve

```


2. In a separate terminal, start the Vite development server:
```bash
npm run dev

```



Access the site at `http://localhost:8000`.
Access the Control Panel at `http://localhost:8000/cp`.

### Production Build

To build the frontend assets for production:

```bash
npm run build

```

### Docker

To build and run the application using Docker:

1. **Build the image**
```bash
docker build -t personal-web .

```


2. **Run the container**
```bash
docker run -p 8000:80 personal-web

```



## 🧪 Running Tests

This project includes PHPUnit tests. To run them:

```bash
php artisan test

```

## 📂 Project Structure

* `app/`: Core Laravel application code.
* `content/`: Flat-file content (collections, taxonomies, globals).
* `public/`: Publicly accessible files (compiled assets, images).
* `resources/`: Raw frontend assets (views, SCSS, JS).
* `views/`: Antlers templates.
* `css/` & `scss/`: Stylesheets.


* `users/`: User account data (YAML files).
* `vite.config.js`: Vite configuration file.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## 📄 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

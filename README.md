```markdown
# Number Claim App

A web application that allows users to claim unique numbers between 1 and 6.

## Features
- Unique number claiming system
- User authentication via device fingerprinting
- Real-time number availability updates
- Persistent storage with Supabase
- Responsive design with animations

## Setup

### Prerequisites
- Node.js (v16 or higher)
- npm
- Supabase account

### Local Development
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/number-claim-app.git
   cd number-claim-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables
   ```bash
   cp config/.env.example config/.env
   # Edit .env with your Supabase credentials
   ```

4. Run development server
   ```bash
   npm run dev
   ```

### Deployment
1. Create a new project on Netlify
2. Connect your GitHub repository
3. Configure environment variables in Netlify dashboard
4. Deploy!

## Contributing
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License
MIT
```
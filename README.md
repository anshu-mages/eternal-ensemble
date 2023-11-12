# 🌟 Eternal-Ensable: Your Gateway to the Arweave Universe 🌌

Hello there, 🚀 fellow developer! Welcome to *Eternal-Ensable* - my special project crafted for the Arweave Challenge. I'm super excited 😊 to share this journey with you. Let's dive into this wonderful world of permaweb, where we defy the norms of data persistence! 🛸

## Deployment

Current deployment: [Arweave Deployment](ARWEAVE_DEPLOYMENT_LINK)

## 📖 Introduction

This isn't just a repository; it's a showcase 🎨 of passion and skills in the Arweave ecosystem. My mission? To impress in the Dev Challenge: Choose Your Track & Impress! 🛠️ Under Track 1, I've built a 2-page app that's not just functional but also a treat to the eyes. 🌈

## 🌈 Features

Here's what makes *Eternal-Ensable* stand out:

- **🚀 Automated Deployment**: Just push your changes, and bam! 🎉 My GitHub Actions take care of deploying the app directly to Arweave. Efficiency at its finest!
- **🔍 Asset Exploration**: Browse through a collection of assets with ease. It's like having a library 📚 of digital treasures at your fingertips!
- **👀 Detailed Asset View**: Select any asset, and I'll present you with its detailed view. It's like having a magnifying glass 🔍 for digital assets!
- **🎨 Sleek UI**: I've put my heart 💖 and soul into designing a UI that's not just visually appealing but also user-friendly. Prepare to be wowed! 🌟
- **🔎 Smart Search**: Lost in the sea of assets? Worry not! My intuitive search functionality will guide you to your desired asset in no time. 🧭
- **🔗 Live Link Update**: Every time there's a new deployment, my GitHub Actions magic automatically updates the live link in the Readme. It's like having a self-updating treasure map!

## Setting Up GitHub Secrets for Automated Deployment

To ensure the smooth operation of our automated deployment pipeline, it's crucial to set up a few secrets in your GitHub repository. Here's how you can add `ARWEAVE_WALLET_ENCODED` and `SSH_PRIVATE_KEY`:

1. **Encode Your Arweave Wallet File** using Base64 and copy the output.
2. **Prepare Your SSH Private Key** from your SSH key pair.
3. **In Your GitHub Repository's Settings**, click on 'Secrets', then 'New repository secret'.
4. **Create `ARWEAVE_WALLET_ENCODED` Secret** with the encoded wallet content.
5. **Create `SSH_PRIVATE_KEY` Secret** with your SSH private key.
6. **Reference These Secrets in Your Workflow** as `${{ secrets.ARWEAVE_WALLET_ENCODED }}` and `${{ secrets.SSH_PRIVATE_KEY }}`.

For detailed steps, refer to our guide on setting up GitHub Secrets.

## 🛠 Installation

Grab your developer hat 🧢, and let's get this setup:

1. Clone this repository. `git clone [repo-link]`
2. Run `npm install` to get all the dependencies cozy 🛌 and settled in.
3. Fire up the project with `npm start`. And voilà, you're in! 🎉

## 📚 Usage

Once you're in, navigating through the app is a breeze. 💨 Explore, click, and immerse yourself in the world of Arweave assets. Remember, every click is a step into the future of web permanence! 🚀

## 👐 Contributing

Got ideas? Suggestions? Or a magic spell 🪄 to make the app even more awesome? Feel free to fork this repo, make your changes, and send a pull request. Let's make *Eternal-Ensable* better, together! 🤝

## 📜 License

This project is under [insert your preferred license here]. Feel free to use it, modify it, and spread the love of coding! ❤️

---

Thank you for stopping by my *Eternal-Ensable* project. Together, let's make a mark in the permaweb universe! 🌐

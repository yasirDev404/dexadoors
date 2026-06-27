DeepSurf — Project Context Document
1. What Is This Business?
DeepSurf is a paid online platform for cryptocurrency traders. It combines live market data, advanced analytics, AI-powered trade research, and personal trading tools in one place — positioned as a professional “trading intelligence” workspace rather than a simple charting app.

The problem it solves: active crypto traders (especially futures and multi-exchange traders) spend hours jumping between exchanges, news sites, scanners, spreadsheets, and chat tools to decide what to trade and how to size positions. DeepSurf tries to replace that fragmented workflow with a single subscription product that answers questions like “What’s moving?”, “Is this a good trade?”, “How much should I risk?”, and “How am I performing over time?”

The platform operates in the crypto trading tools / fintech SaaS space — similar in spirit to premium charting and analytics products, but with a heavy emphasis on AI-assisted analysis, multi-exchange market scanning, and personal performance tracking (journal, portfolio, watchlists).

Access is marketed as exclusive: the public website promotes a waitlist and invitation-style signup, reinforcing a premium, limited-access brand (deepsurf.io).

2. The User's Perspective
Who uses it?
Primarily individual crypto traders — from active day traders to swing traders — who want institutional-style research and AI help without building their own toolchain. The product also supports referrers (users who invite others and earn commissions) and influencer/partner accounts (comped access granted by the business).

The typical journey
Discovery
A trader lands on the marketing site and reads about AI-driven trading intelligence: market outlook, pro analytics, trading journal, calculators, and AI scanners. They can join a waitlist with their email. Messaging suggests access is by invitation, not open signup.

Getting in
To create an account, a new user needs:

Email and password (or Google sign-in on login)
A 6-character join/referral code from an existing user
Acceptance of terms and conditions
They verify their email with a one-time code, then complete a short profile setup (username and optional photo) before logging in.

First login
After login, they land on a personalized dashboard — a customizable home screen with widgets showing things like AI trade validation, pump scanner highlights, whale activity, and market events. This acts as their command center.

Daily use — what they can see, create, and interact with

Area	What the user gets
Dashboard
Drag-and-drop widgets from AI tools, pro analytics, and market data; layout saves to their account
Charts
Live candlestick charts across symbols and timeframes, with an AI assistant (“MAVI”) that can analyze price action and draw support/resistance, structure, and Fibonacci levels on the chart
AI Tools
Scan the market for potential pumps and dumps; validate any coin with a graded “AI Proof” score; understand Wyckoff market phases (accumulation, markup, distribution, markdown)
Pro Analytics
A deep toolbox: liquidation maps, trade radar, heatmaps, correlation matrices, funding/open-interest analysis, proprietary quant indicators, smart scenarios, and more
Market Outlook
Daily macro view: fear/greed sentiment, sector rotation, whale tracking, news/events, narrative radar, AI market briefing
Calculator
Position sizing with risk management, liquidation math, compound growth simulation, playbook and trade builders
Trading Journal
Log trades, track P&L, view equity curves, analyze mistakes and setup performance, export data, get AI coaching
Watchlist
Track coins, set price alerts, save AI setups and pump/dump ideas, custom pattern alerts
Portfolio
Manually track holdings across exchanges, see allocation, get AI portfolio analysis and coin research
Arbitrage
Scan cross-exchange, basis, and funding-rate opportunities with execution plans and AI Q&A
Notifications
In-app alerts for prices, AI setups, portfolio events, and more
Settings
Profile, language (11 options), timezone, notification preferences, integrations (Telegram, Discord, email), referral earnings, subscription status, achievements
Subscription and payment (user view)
Inside the app, users can see their plan name, whether it’s active, days remaining, and billing history. There is no full checkout flow in the user app today — purchasing or upgrading appears to happen outside this screen (e.g., via a separate payment link, admin provisioning, or a flow not yet wired in the frontend). Ambiguity flagged: the backend supports crypto checkout via NOWPayments; the user-facing purchase step may be incomplete or handled manually.

Referrals and value beyond trading
Users get their own referral code and link. When people they invite pay for a subscription, they earn commission (default 10% of plan price, reference price ~$29.99/month). They can request withdrawals once they reach a minimum balance ($50). The app also shows achievements (gamification for journal activity, referrals, etc.) with messaging that points toward a possible future token/airdrop — likely aspirational marketing rather than a live product today.

Getting value
Value arrives when the trader uses scanners and AI to find setups, validates ideas before entering, sizes positions correctly, tracks performance in the journal, and monitors the market from one dashboard — with MAVI AI available across chart, journal, portfolio, and arbitrage workflows.

3. The Business Owner's Perspective
The company running DeepSurf operates a subscription SaaS business with a referral-driven growth loop. They control the product, customers, money, and internal staff through a separate admin panel.

What they manage
Customers (clients)

View, search, and filter all users (standard vs. influencer, paid vs. unpaid, active vs. blocked)
Create accounts manually (including from the waitlist)
Block/unblock users, extend subscriptions, revoke login sessions
Deep-dive into any client: activity log, trading journal, portfolio, watchlists, sessions
Subscriptions and plans

Create subscription plans (name, price, duration, trial days, feature list, optional user cap)
Assign plans, grant free access (promos, influencers), extend or cancel subscriptions
Run checks for expired subscriptions
Revenue and finance

Revenue dashboard: MRR, ARR, churn, refunds, revenue by plan, cohort analysis
Payment history and CSV export
Invoices: create, update, backfill for paid users
Referral commission settings and withdrawal approval/rejection
Growth and marketing

Waitlist management
Referral program oversight (performance by referrer, payout queue)
User-facing announcements (info, warning, promo, maintenance)
Editable email templates (welcome, OTP, password reset, subscription expiry, withdrawal status)
Support and operations

Support ticket queue with replies and status management
Admin notification inbox (expiry warnings, withdrawal requests, waitlist signups, etc.)
Audit log of all sensitive admin actions
System settings: maintenance mode, registration toggle, referral commission %, login lockout rules, trial period defaults, 2FA enforcement for staff
Team and access control

Admin accounts with role-based permissions (Super Admin, Operations Manager, Support Agent, Finance Officer, Content Manager, Read-Only Viewer, plus custom roles)
57+ granular permissions across dashboard, clients, subscriptions, revenue, referrals, tickets, templates, audit, and team management
How the business model appears to work
Revenue stream	Mechanism
Subscriptions
Recurring paid access to the platform; plans priced in USD, collected via cryptocurrency (BTC, ETH, USDT, etc.) through NOWPayments
Referral commissions
Users invite others; when a referred user pays, the referrer earns a percentage (default 10%); the business pays out approved withdrawals
Comped access
Influencer accounts get free paid-tier access — likely used for partners, creators, and marketing relationships
Growth model: Invite-only signup (referral code required) creates viral loops on top of paid subscriptions. Waitlist captures demand before conversion.

Cost structure (inferred): Third-party APIs (market data, Claude AI, email, crypto payment processing), hosting (Heroku backend, Netlify frontend, Firebase admin), and operational staff using the admin panel.

Ambiguity flagged: Subscription enforcement middleware exists in the backend but is not consistently applied to all premium routes — access gating may rely partly on the frontend or manual account status.

4. Roles in the System
End-user roles
Role	Who they are	What they can do
Waitlist prospect
Someone who signed up on the landing page with email only
Express interest; not a full user until invited/registered
Registered user (unpaid)
Has an account but no active subscription
Log in; likely limited or blocked from premium features depending on enforcement
Paying subscriber (standard)
Active paid customer
Full platform: AI tools, pro analytics, journal, portfolio, watchlist, calculator, MAVI AI, referrals, settings
Influencer / partner
Account flagged as influencer by admin
Same platform access as paid users without paying — used for creators and partners
Blocked user
Account locked by admin or too many failed logins
Cannot use the platform normally
Referrer
Any user with a referral code (usually subscribers)
Invite others, track referral stats, earn commission, request payout withdrawals
Internal admin roles (staff)
Role	Business purpose	Typical powers
Super Admin
Platform owner / technical lead
Everything — full control over clients, money, settings, team, and audit
Operations Manager
Day-to-day platform operations
Clients, subscriptions, revenue monitoring, referrals (view), tickets, announcements
Support Agent
Customer support
View clients, handle tickets, notifications; limited write access elsewhere
Finance Officer
Billing and payouts
Revenue, invoices, payment exports, referral withdrawals, commission settings
Content Manager
Communications
Announcements, email templates, notifications
Read-Only Viewer
Audit / oversight
View all areas; cannot change anything
Custom roles
Flexible staffing
Any combination of the 57+ permissions defined by Super Admin
Note: The admin UI shows the same navigation to all logged-in staff; actual restrictions are enforced by the server when they try to perform actions.

AI persona (not a human role)
MAVI — The in-product AI assistant. Not a login role, but a consistent “copilot” across charts, journal, portfolio, and arbitrage. Powered by Claude with live market context.

5. Core Features of the Platform
Described as a user would see them on a landing page or app store listing:

AI Pump Scanner
Scan the crypto market for coins that may be quietly accumulating before a big move — with scores, risk categories, and suggested entry, stop, and target levels.

AI Dump Scanner
The mirror tool for downside risk — find coins showing signs of distribution or overleveraged longs, with structured short trade setups.

AI Proof — Trade Validation
Enter any coin and timeframe; get a graded score (A+ through D), confidence level, multi-timeframe evidence, and sniper entry/stop/target levels before you commit capital.

Wyckoff Market Regime Analysis
Understand whether a coin is in accumulation, markup, distribution, or markdown — with multi-timeframe alignment, stress points, and strategy guidance for each phase.

MAVI AI Assistant
Your personal trading copilot: ask about charts, get portfolio advice, review your journal, explore arbitrage — with context-aware answers tied to live market data.

Customizable Trading Dashboard
Build your own command center with 30+ widgets from AI tools, pro analytics, and market data — drag, resize, and save your layout.

Professional Charting
Real-time candlestick charts with drawing tools and AI that can annotate support, resistance, structure, and Fibonacci levels on your chart.

Pro Analytics Suite
Institutional-style tools: liquidation heatmaps, trade radar, volume/volatility heatmaps, correlation matrices, funding and open-interest analysis, on-chain flow, proprietary quant indicators, and more.

Market Outlook
Daily macro briefing: global market metrics, fear/greed, sector rotation, whale tracking, news/events hub, and narrative radar.

Position Calculator & Risk Tools
Size positions with ATR-based risk, calculate liquidation levels, simulate compound growth, and build structured playbooks.

Trading Journal
Log every trade, track P&L and equity curve, analyze mistakes and winning setups, set goals, export data, and get AI coaching on your performance.

Portfolio Tracker
Track holdings across exchanges manually, see allocation breakdown, run AI health checks, and research individual coins.

Smart Watchlists & Alerts
Multiple watchlists with price alerts, saved AI setups, pump/dump ideas, and custom pattern notifications (including Telegram/Discord/email delivery).

Arbitrage Scanner
Find cross-exchange, basis, and funding-rate opportunities with risk estimates, execution plans, and AI guidance.

Referral Program
Invite friends with your personal code, earn commission when they subscribe, and withdraw earnings to crypto or other supported methods.

Achievements & Gamification
Unlock badges for trading milestones, referrals, and platform activity — with points that may tie into future rewards.

Multi-Language Support
Use the platform in up to 11 languages with localized market content in key areas.

Admin Operations Suite (for the business, not end users)
Client management, subscription billing, revenue analytics, referral payouts, support tickets, announcements, email templates, team permissions, and audit trails.

6. Technical Overview (Brief)
Layer	Technology
User app
React 19, Vite, Material UI, Zustand, i18next — hosted on Netlify
Admin panel
React, Vite, Material UI — hosted on Firebase
Backend API
Node.js, Express 5, PostgreSQL, JWT auth, WebSockets — hosted on Heroku
ML service
Python 3.11, FastAPI, scikit-learn, XGBoost — separate microservice for pump/dump/regime/direction predictions
Architecture
Multi-service monorepo: frontend + admin + API + ML + PostgreSQL, orchestrated via Docker Compose locally
Database
PostgreSQL with ~40+ business tables (users, subscriptions, payments, referrals, journal, portfolio, AI memory, admin RBAC, etc.) — no ORM; raw SQL in controllers
Key integrations
NOWPayments (crypto billing), Anthropic Claude (MAVI + AI narratives), Google OAuth, SMTP email, Sentry monitoring, Binance/Bybit/OKX/MEXC/KuCoin/Hyperliquid/BingX/Gate.io (market data), CoinGecko, CoinMarketCap, Alternative.me (fear/greed), CryptoCompare (news), FRED (macro data)
Security
JWT access/refresh tokens, account lockout after failed logins, admin TOTP 2FA, rate limiting, CORS whitelist, Helmet headers, audit logging
The ML layer is designed to learn from scan history over time (outcomes at 1h/4h/24h feed model training), but most user-facing intelligence today runs on proprietary scoring algorithms plus Claude AI, with ML as an enhancement path when trained models are deployed.

Ambiguities worth noting for stakeholders
In-app purchase flow — Backend supports crypto checkout; the user app mainly shows subscription status and billing history, not a full upgrade/pay screen.
Access enforcement — Premium gating may not be fully enforced at the API layer on every feature.
Achievements / airdrop — Gamification exists; token/airdrop messaging appears forward-looking, not a live token product.
Admin 2FA at login — Staff can enable 2FA in settings, but the login screen may not always require it unless enforced platform-wide.
Pricing — Default reference plan price is ~$29.99/month; actual plans are configurable by admins and may vary.
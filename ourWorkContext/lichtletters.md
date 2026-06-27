1. What Is This Business?
XXL Lichtletters is a Dutch business that rents and sells large illuminated letters, numbers, and symbols — the kind used to spell names, messages, or logos at weddings, birthdays, corporate events, shop openings, and similar occasions.

This codebase is the backend engine behind that business. It is not the customer-facing website itself; it powers the website and internal tools that sit behind brands like xxllichtletters.nl. Think of it as the “control room” that handles quotes, orders, payments, stock, deliveries, and customer communication.

The problem it solves is operational: light letters are physical inventory (individual letters must be tracked, booked, and released), deliveries can be by post or by the company’s own drivers, rentals have start/end dates and pickups, and custom designs need a human quote before payment. The platform automates pricing, quoting, payment, inventory booking, driver coordination, reminders, and support — so the business can run orders from first inquiry through delivery and pickup without manual spreadsheets.

The business operates in the event décor / signage rental and retail space, focused on the Netherlands (Dutch and English customer communication, Amsterdam timezone for scheduling, PostNL shipping, EUR pricing, 21% VAT).

2. The User's Perspective
There is no customer login account in this system. Customers interact as guests through the public website, email, and payment links.

Typical customer journey
Discovering the business
A customer finds XXL Lichtletters online (website, Google, word of mouth). They may browse blogs, read Google reviews (pulled live from the business’s Google listing), use the on-site AI chat assistant for questions about pricing, availability, or delivery, or fill in a contact form.

Requesting a quote (standard order)
On the quote page (/offerte), the customer builds an order:

Rental: choose letters/numbers/symbols (e.g. “LOVE”), rental duration, event date, delivery and pickup dates/times, delivery address, indoor/outdoor use, and how they want delivery (company driver, PostNL parcel, or self pickup).
Sale: choose standard products (letters, numbers, symbols) or start a custom design (logo, icon, colors, reference image, description).
The system calculates price automatically for standard orders: letter/number prices, multi-day rental surcharges, delivery cost (distance-based for driver delivery or box-based for PostNL), and VAT. The customer receives a PDF quote by email and a link to pay online (checkout page on the website).

Custom order journey (different path)
If the customer orders something bespoke, they submit their design request but do not get an instant price. They are told the team will email them once a price is set. An admin reviews the request, enters a price, and the customer then receives an approval email with a payment link.

Paying
The customer pays by card (and iDEAL where supported) through Stripe on the website checkout. After payment they receive a confirmation email with a price breakdown.

Fulfillment (what the customer experiences)
Depending on delivery method:

Company delivery: a driver delivers (and for rentals, later picks up) the letters.
PostNL: items are shipped in boxes.
Self pickup: the customer collects from the warehouse area.
The customer gets email updates around order confirmation, payment, and delivery. They do not use a “my orders” portal in this backend — status is communicated by email and presumably the frontend where applicable.

Getting help
Customers can use the chatbot (Dutch/English) trained on company Q&A. If the bot cannot help, it can walk them through creating a support ticket, which the business team responds to by email.

Value received
The customer gets illuminated letters for their event or purchase, with transparent quoting, online payment, and coordinated delivery — without needing to understand inventory or logistics.

3. The Business Owner's Perspective
The operator running XXL Lichtletters uses an admin portal (backed by this API) to run day-to-day operations.

What they control
Orders and quotes
View all orders, filter by status, payment, dates, and type. Update order details, change statuses, mark orders paid manually (e.g. bank transfer), close or reopen orders, add internal admin notes, and manage “to be paid” orders (invoice-first workflow where stock may be reserved before payment).

Custom quotes
Review custom design requests and set the final price; the system then emails the customer with payment instructions.

Inventory
Manage every letter, number, symbol, and accessory: how many exist, how many are booked for upcoming orders, rental vs sale prices, discounts, warehouse location, active/inactive status, and stock adjustments. The system warns when items are low stock or overbooked (more booked than physically available).

Drivers and deliveries
Create driver accounts, activate/deactivate them, assign orders to drivers, notify all drivers about unassigned jobs, and track whether drivers accepted, picked up, or delivered. Drivers can reject assignments.

Transport and pricing rules
Configure PostNL costs (per box, items per box), own-delivery pricing (per kilometer from warehouse, static fallback), rental surcharges (extra charge after X rental days), warehouse location, and delivery charge defaults. Public-facing delivery cost estimators help the website quote shipping before checkout.

Payments
Stripe handles card payments; admins can override payment status when needed. Revenue dashboards and paid-order reports support financial oversight.

Communication
Email notifications for new orders, payments, custom quotes, low stock, overdue deliveries/pickups, driver assignments, and support ticket replies. Admins can tune email preferences (e.g. new order alerts, pickup reminders). In-app notifications feed the admin and driver dashboards.

Content and marketing
Blog posts (SEO role can manage content), website content chunks (FAQ, pricing, delivery info — used to inform the chatbot), chatbot Q&A pairs, and display of Google reviews on the site.

Support
View and respond to support tickets created via the website or chatbot; update ticket status.

Automation (runs in the background)
Scheduled jobs (Amsterdam time) handle: overdue delivery alerts, pickup/delivery reminders, weekly low-stock email summaries, automatic inventory release when rental pickup day passes (if enabled per order), and banner alerts when items are overbooked.

Business model (as inferred)
Revenue comes from:

Rentals — time-based hire of letter sets (+ delivery/pickup logistics).
Sales — one-time purchase of standard or custom letter products.
Pricing includes product fees, transport, and 21% VAT. The platform is built for direct-to-customer sales through the website, not marketplace commissions. Ambiguity: subscription or B2B contracts are not evident; the model appears transactional per order.

4. Roles in the System
Role	Who they are	What they can do (in business terms)
Customer (guest)
Anyone on the website
Request quotes, pay online, contact the company, chat with the bot, open support tickets, read blogs and reviews. No account required.
Admin
Business owner / office staff
Full operational control: orders, inventory, drivers, pricing settings, payments, dashboards, custom quotes, support tickets, website content, chatbot Q&A, notifications, email preferences.
Driver
Delivery/pickup staff
Log in to a driver portal; see assigned jobs; accept or reject orders; mark pickups and deliveries complete; set weekly availability; receive job and overdue alerts; update their profile and password.
SEO / content editor
Marketing person (inferred)
Special login path for managing blog posts (create, edit, publish-style content for the website). Limited compared to full admin. Ambiguity: blog routes are not locked down in code the same way as other admin features — access may rely on frontend or environment setup.
There is no “customer user” role with a persistent login in this backend. Customer data lives inside each order (customerDetails), not as standalone accounts (a Customer model exists in the database schema but is not wired into the live application flow).

5. Core Features of the Platform
Online quote builder
Customers configure rental or purchase orders with specific letters, dates, and delivery options; the system validates availability and calculates a full price breakdown.

Instant PDF quotes & email confirmations
Professional quote PDFs are generated and emailed automatically when a standard order is placed.

Online payments
Secure card payments through Stripe, with order confirmation emails after successful payment.

Custom design orders
Bespoke logo/icon orders go through a manual quote step: admin sets price, customer pays afterward.

Letter inventory management
Track every character in stock, what’s booked for upcoming jobs, and what’s still available — preventing double-booking where possible and flagging shortages.

Three delivery options
PostNL shipping, company driver delivery (distance-based pricing), or customer self pickup.

Driver dispatch portal
Assign jobs to drivers; drivers accept, execute pickup/delivery, and update status from their phones or dashboard.

Operations dashboard
Today’s tasks, calendar view of orders, revenue reporting, paid-order lists, and item-level overview for busy periods.

Smart reminders & alerts
Automatic emails and in-app alerts for upcoming deliveries, overdue jobs, late rental pickups, and low or overbooked inventory.

Rental lifecycle automation
After a rental’s pickup date, inventory can be automatically released back into available stock (configurable per order).

AI website assistant
A bilingual (Dutch/English) chat widget powered by Claude, grounded in admin-maintained Q&A and website content; can escalate to a support ticket.

Support ticket desk
Customers submit issues; admins reply by email and track ticket status.

Google reviews on the website
Shows the five most recent Google Business reviews to build trust.

Blog & SEO content
Publish articles with metadata for search visibility.

Contact form
General inquiries emailed to the business with a confirmation to the sender.

Bilingual experience
Customer-facing flows support Dutch and English (emails, chatbot, order language preference).

Admin notification center
Central feed for new orders, payments, driver events, inventory warnings, and custom order requests.

6. Technical Overview (Brief)
Area	Detail
Stack
Node.js, Express 5, MongoDB (Mongoose)
Architecture
REST API backend; separate frontend(s) consume it (e.g. xxllichtletters.nl, admin/driver portals)
Auth
JWT for admin, driver, and SEO users; most customer flows are public
Payments
Stripe Payment Intents + webhooks; EUR
Email
Nodemailer (SMTP, e.g. Hostinger); EJS HTML templates
PDFs
PDFKit for quote/invoice generation
Maps / delivery
Google Maps API for distance-based delivery pricing and Place Details for reviews
AI
Anthropic Claude for chatbot and some support-ticket translation
Scheduling
node-cron, Europe/Amsterdam timezone
Deployment signals
Staging vs production via NODE_ENV and .env.staging; payment links point at xxllichtletters.nl domains
Important inference: This repository is backend-only. The customer website, admin UI, and driver app are separate clients that call this API — the business experience is split across those frontends plus this server.

Ambiguities flagged
Customer accounts: No login/register flow for shoppers; repeat customers are recognized by email on each order only.
SEO role security: Blog create/update/delete endpoints appear publicly reachable in routing; production may depend on network rules or a gateway not visible here.
Exact brand legal entity: Code consistently says “XXL Lichtletters” and Tiel, Netherlands; corporate structure is not defined in code.
Frontend scope: Payment checkout, quote builder UI, and admin dashboards live outside this repo.
If you want, a follow-up can map each landing-page feature to the exact frontend URL or screen where customers see it (that would require the frontend repo, if separate).
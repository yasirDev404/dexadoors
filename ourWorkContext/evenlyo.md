Evenlyo — Project Context Document
1. What Is This Business?
Evenlyo is an online marketplace for event services and supplies — think weddings, parties, corporate events, and celebrations. It connects people who need event help (clients) with businesses that provide it (vendors): caterers, food trucks, baristas, decorators, rental equipment, and similar services.

The platform operates mainly in the Netherlands, with content in Dutch and English.

Problem it solves: Planning an event means finding many separate providers, comparing options, negotiating dates, paying safely, and tracking delivery. Evenlyo brings that into one place: browse by category, request or book services, pay through the platform, track fulfillment, and get support if something goes wrong.

What it offers:

A catalog of bookable services (e.g. hire a BBQ caterer for a day)
A shop for items you can buy outright (e.g. event products with fixed stock)
Secure payments, often with a deposit first and the rest later
Order tracking from request to completion
Protection and dispute handling (Evenlyo Protect) on eligible service types
Messaging between clients and vendors
An AI assistant for common questions, plus human support when needed
Space it operates in: The events and hospitality marketplace — similar in spirit to how Airbnb connects guests and hosts, but focused on booking event vendors and buying event-related products, not accommodation.

2. The User's Perspective
Who is the “user” here?
Mostly clients — individuals or businesses planning an event. They may use a mobile app or website.

Typical journey
Discover
A client opens Evenlyo and browses categories (e.g. Food & Drinks, Decorations). They drill into subcategories (e.g. Barbecue catering, Food trucks), search or filter by location and date, and view featured or popular offerings.

Explore
They open a listing: photos, description, pricing (per hour, day, or event), availability, vendor info, and payment rules (deposit, protection options). They can check calendars and availability for specific dates.

Decide
They add one or more services to a cart with event details (date, time, location, guest count), or send a booking request directly.

Request & wait
For bookable services, the vendor must accept the request. Until then, nothing is charged for the full booking flow (payment comes after acceptance).

Pay
After acceptance, the client pays via card (Stripe). Depending on the service type and timing:

Pay everything upfront, or
Pay a deposit first and the remainder before the event
They may also pay for add-ons like travel distance, extra time, platform fees, VAT, and optional Evenlyo Protect.

Track
They follow the order: on the way → received → completed (wording varies for rentals vs human services). They can get directions, mark items received, and see status updates.

After the event
They can leave a review, re-order something they used before, or file a claim if there was damage or a serious problem (Evenlyo Protect).

Buy (separate path)
For sale items (products, not rentals), they browse, pay, and track delivery — more like a simple online shop, without the accept/reject step.

Support
They can use the AI chatbot, open a support ticket, or message the vendor in chat (vendor contact details may only appear after payment).

Account
They register with email (OTP verification) or Google, manage profile and notification preferences, and see booking history and notifications.

3. The Business Owner's Perspective
The platform operator (Evenlyo the company) runs the marketplace, not the individual vendors.

What they control
Marketplace structure
Main categories and subcategories (e.g. Food & Drinks → Barbecue catering). Subcategories also define payment rules: deposit percentage, escrow timing, and whether Evenlyo Protect applies.

Who can sell
Vendors register and are approved before fully participating. Admins can block users, reset passwords, and send bulk emails.

Money

Platform fees on bookings and sale-item orders (configurable percentages)
VAT handling (Dutch BTW, commonly 21%)
Vendor subscription plans — vendors may pay monthly to use the platform
Evenlyo Protect fees on protected service types
On some cancelled partial-payment bookings, the platform keeps a portion of the deposit (documented as ~12% in payment logic)
Payments flow
Clients pay Evenlyo (via Stripe). Vendors connect Stripe accounts for payouts. Admins release payments to vendors after rules are met — often after job completion plus an escrow waiting period defined per subcategory.

Operations
Admins see dashboards (users, bookings, revenue trends), track all orders, override statuses when needed, handle refunds and vendor claim payouts, and manage support tickets (contact form, in-app, chatbot escalations, booking claims).

Content & trust
They manage blogs, FAQs, and an internal knowledge base for the chatbot. They oversee reviews and claims and can intervene in disputes.

Platform settings
Global fee rates, app version / force-update settings for mobile, and notification behavior.

How the business model appears to work
Evenlyo earns from transaction fees, vendor subscriptions, protection product fees, and retained deposits on certain cancellations — while holding client funds and paying vendors after fulfillment and escrow rules. It acts as a managed marketplace, not a passive listing site.

Ambiguity: Exact fee percentages in production may differ between default settings, admin configuration, and what the client app sends in pricing breakdowns — the codebase shows multiple sources of fee logic.

4. Roles in the System
Client (customer)
Someone planning an event. Can browse publicly, create an account, cart and book services, buy sale items, pay, track orders, chat with vendors, review, claim, manage settings, and get notifications.

Vendor (business owner)
A registered business or sole trader selling on Evenlyo. Can set up a business profile, connect a bank/payout account (Stripe), subscribe to a platform plan, create and manage listings (bookable services) and items (products for sale), manage stock, accept or reject booking requests, update fulfillment status, view earnings and invoices, manage team members with roles, and chat with clients.

Vendor employee
Staff working under a vendor account. Logs in through the vendor login flow and operates with the vendor’s permissions (e.g. handle bookings, update tracking). Intended for teams, not separate businesses.

Admin (platform staff)
Evenlyo internal users on the admin panel. Can view platform analytics, approve/reject vendors, manage clients and vendors, oversee all bookings and sale orders, change tracking statuses, run payouts and refunds, configure fees and plans, manage categories/subcategories, edit blogs/FAQs/knowledge base, handle support and chatbot tickets, and manage other admin team members and their roles.

Public visitor
Anyone not logged in. Can browse the catalog, read blogs and FAQs, view vendor profiles, use the chatbot, submit a contact form, and start registration — but cannot book, pay, or access account features.

Note: The codebase also references legacy admin models; day-to-day admin access uses AdminEmployee accounts, separate from client/vendor user accounts.

5. Core Features of the Platform
Browse & discover event services
Search and filter listings by category, location, date, and popularity. View home feeds, featured services, and vendor storefronts.

Book event services
Request dates and details, get vendor acceptance, and complete payment — with support for deposits and balance payments before the event.

Shopping cart for multiple bookings
Stage several services with event details, then submit them as booking requests in one go.

Buy event products
Purchase stocked items directly (separate from rental/booking flow), with order tracking.

Secure online payments
Card payments through Stripe, including full pay, partial upfront, and remainder payments, with automated payment reminders.

Real-time order tracking
Follow bookings from acceptance through delivery, pickup, return (for rentals), and completion.

Vendor profiles & ratings
See business info, logos, categories, reviews, and reputation signals when choosing a provider.

In-app messaging
Chat with vendors, share attachments, and receive custom offers that can convert into bookings.

Reviews
Rate and review vendors after completed bookings.

Evenlyo Protect & claims
Optional protection on certain service types; clients can file claims for damage or disputes; admins resolve and trigger refunds or vendor payouts.

AI chatbot assistant
Ask questions about listings, availability, pricing, and policies; escalate to human support when needed.

Help center & content
FAQs, blog articles, and structured knowledge for self-service and chatbot answers.

Notifications
Email and push alerts for booking updates, payment reminders, cancellations, and messages.

Vendor business tools
Dashboard, listing and inventory management, booking inbox, earnings reports, billing invoices, and team roles.

Vendor subscriptions
Monthly plans for vendors to access the platform (with admin-managed pricing and discounts).

Admin control center
Full oversight of users, orders, money movement, content, and support — the operational backbone of the marketplace.

Mobile app support
App version checks and update prompts controlled from platform settings.

6. Technical Overview (Brief)
Area	Detail
What this repo is
API-only backend — no customer-facing UI here. Separate client, vendor, and admin frontends talk to it over HTTPS and real-time sockets.
Stack
Node.js, Express, MongoDB (Mongoose), JWT authentication
Architecture
Classic MVC: routes → controllers → models/utilities (no separate service layer)
Payments
Stripe (PaymentIntents, Connect for vendor payouts, subscriptions for vendor plans)
Notifications
Email (SMTP/Nodemailer), push (Firebase Cloud Messaging)
Real-time
Socket.IO for chat and live updates
AI
OpenAI-powered chatbot with database-backed tools
Scheduling
Cron jobs for payment reminders and auto-cancellation of unpaid balances
Media
Images stored as URLs (typically Cloudinary); uploads appear client-side
Deployment
Heroku (evenlyo-backend-production on Herokuapp)
Languages
Bilingual content (en / nl) embedded in data models
Integrations at a glance: MongoDB Atlas, Stripe, Firebase (push + Google sign-in), OpenAI, email SMTP, Socket.IO.

This document reflects what the codebase implements and implies about the business. Product marketing names, exact fee percentages in production, and some escrow timing may differ from live configuration — those should be confirmed with the business team and production settings.

https://www.evenlyo.nl/ web user url. that will be used to redirect.
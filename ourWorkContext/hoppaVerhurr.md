1. What Is This Business?
Hoppa Verhuur is a party and event equipment rental company based in the Netherlands (Beneden-Leeuwen). The platform behind it — branded Hoppa — is a website and back-office system for renting tents, tables, chairs, and other party gear.

The problem it solves is straightforward: someone planning a wedding, birthday, corporate event, or outdoor gathering needs temporary equipment delivered to their venue and collected afterward. Instead of buying or sourcing items themselves, they browse what Hoppa has in stock, pick dates and quantities, see a price upfront (including delivery), and submit a booking request.

The business operates in the event and party rental space — similar to a hire shop, but with delivery, pickup, and online self-service booking. Customers interact through a public website; Hoppa’s staff run operations through an admin dashboard.

2. The User's Perspective
There are two kinds of people who use this system, but only one of them needs an account.

The Customer (no login required)
A typical customer discovers Hoppa through its website — perhaps after searching for tent rental in their area or seeing Google reviews displayed on the site.

Their journey looks like this:

Browse the catalog — They explore available items grouped into categories: Tents, Tables & Chairs, Party accessories, and Others. Each item shows photos, description, daily price, and availability.

Build a rental — They select what they need (e.g., a wedding tent, chairs, accessories), choose quantities, and specify:

Event type and guest count
Delivery date, time window, and address
Pickup date, time window, and address (must be after delivery)
See a live price — Before committing, they get a full breakdown:

Item rental cost (price per day × quantity × number of rental days)
Delivery/transport cost (based on distance from Hoppa’s warehouse; free within a set radius)
Optional service fees (setup/breakdown), with possible surcharges for early-morning or evening time slots
VAT breakdown for transparency (prices already include Dutch VAT, typically 21%)
Submit the booking — They provide name, email, phone, and any extra notes. No account is created. They receive a confirmation email in Dutch (“Bedankt voor uw boeking!”) and an order reference number.

Wait for confirmation — The booking starts as “Planned.” Hoppa’s team reviews it, may confirm payment offline, and sends a detailed confirmation email when the order is approved.

Event day and beyond — Equipment is delivered, used at the event, then picked up. The customer may receive email updates as the order moves through Delivered → Picked Up → Completed.

Alternative paths:

Request a quote — For larger or custom events, they fill in event type, date, location, guest count, desired services, budget, and notes. Hoppa follows up manually.
Contact form — General questions via name, email, phone, subject, and message.
What customers cannot do (based on the codebase):

Create a user account or log in
Pay online (no payment gateway)
Manage bookings themselves after submission (they rely on email and possibly a confirmation page using their order ID)
3. The Business Owner's Perspective
The person or team running Hoppa controls almost everything through an admin dashboard. Every staff login is treated as a full admin — there is no separate “manager vs. staff” hierarchy in the system.

What they manage
Inventory & catalog

Add, edit, and remove rental items (tents, furniture, accessories)
Set daily prices (entered inclusive of VAT), stock quantities, descriptions, and photos
Configure per-item service fees: base fee, evening surcharge (typically 7 PM–midnight), morning surcharge (1 AM–8 AM), and whether the fee is optional or mandatory
Toggle items on/off for rental
Organize products into categories
Orders & operations

View all bookings with search and filters (status, payment, date range)
Move orders through the lifecycle: Planned → Confirmed → Delivered → Picked Up → Completed
Mark payments as Unpaid, Partial, or Paid (collected manually — cash, bank transfer, etc.)
See overdue pickups automatically flagged when pickup date passes without collection
Use a calendar showing delivery and pickup events by day
Get overbooking alerts when more units are booked for a date than are in stock
Pricing & business rules

Set delivery rate per kilometer beyond a free delivery radius (defaults: €0.75/km, 5 km free)
Configure warehouse location for distance calculations
Set VAT percentage for display breakdowns (default 21%)
Customer inquiries

View quote requests and contact messages (with read/replied/archived-style status tracking for contacts; quote status: pending, quoted, accepted, rejected, cancelled)
Reporting & insights

Total orders, completed orders, and revenue
Revenue charts (today, this week, this month)
Completed order history with pricing breakdowns
Top rented products
Communications

Receive in-dashboard notifications for new orders, confirmations, deliveries, pickups, completions, and overdue items
Automatic emails to customers on booking receipt and key status changes
Automatic email to admin when a new order arrives
Account settings

Update admin profile, change password, toggle email notification preferences
How the business model appears to work
Revenue comes from:

Daily rental fees for equipment
Delivery/transport charges based on driving distance from the warehouse
Service fees for setup, breakdown, or out-of-hours delivery/pickup
Payment is handled offline — the system tracks whether money has been received but does not process card or online payments. Marking an order “Completed” automatically marks it as “Paid,” reflecting a model where completion and payment are treated as aligned.

Ambiguity flagged: There is no subscription, membership, or commission model — it is pure rental + delivery + service fees.

4. Roles in the System
Role	Who they are	What they can do
Customer / Visitor
Anyone using the public website. No account.
Browse products and categories; calculate prices; submit bookings; view booking confirmation by order ID; request quotes; send contact messages; see Google reviews.
Admin / Staff
Hoppa employees with a login. All accounts are admins — no sub-roles.
Full operational control: manage inventory, process orders, update statuses and payments, view dashboard/calendar/reports, configure delivery and VAT settings, manage categories, upload product images, handle notifications, and update their own profile.
There are no other roles — no customer accounts, no vendor accounts, no read-only staff tier.

Ambiguity flagged: Admin registration appears to be open (not invite-only), which may be intentional for initial setup but is unusual for production.

5. Core Features of the Platform
Browse & Shop for Event Rentals
A public catalog of tents, tables, chairs, and party accessories with photos, prices, and category filtering.

Instant Price Calculator
Customers see a full quote before booking — rental days, delivery distance, optional service fees, and VAT breakdown — based on their dates, address, and item selection.

Online Booking (Guest Checkout)
Submit a rental request with event details, delivery/pickup schedule, and contact info — no account needed.

Delivery & Pickup Scheduling
Choose delivery and return dates and time windows; the system validates that pickup comes after delivery.

Distance-Based Delivery Pricing
Transport cost is calculated from the warehouse to the event address, with free delivery within a configurable radius.

Smart Service Fees
Optional or mandatory setup/breakdown fees, with higher charges for early-morning or evening slots.

Quote Request Form
For custom or large events where a fixed catalog price may not apply.

Contact Us
General inquiries stored for staff follow-up.

Google Reviews on the Website
Pulls customer reviews to build trust on the landing page.

Email Confirmations & Updates
Customers receive Dutch-language emails when they book and when their order is confirmed or progresses.

Admin Dashboard
At-a-glance view of planned orders, active rentals, completed jobs, overdue pickups, upcoming deliveries, and weekly activity charts.

Operations Calendar
Day-by-day view of deliveries and pickups with quick actions to mark items delivered or picked up.

Order Lifecycle Management
Track every booking from first request through delivery, pickup, and completion.

Payment Tracking (Manual)
Record whether customers have paid in full, partially, or not yet — without online payment processing.

Overdue Pickup Alerts
Automatic detection when equipment hasn’t been collected by the scheduled date.

Overbooking Detection
Warns when more units are booked for a date than are available in stock.

Inventory Management
Add and maintain products, stock levels, pricing, photos, and availability.

Business Reporting
Revenue trends, completed order history, and best-performing rental items.

In-App Admin Notifications
Real-time alerts for new orders and important status changes.

Configurable Business Settings
Adjust delivery rates, free delivery zone, warehouse location, and VAT display percentage.

6. Technical Overview (Brief)
Area	Detail
Product name
Hoppa (backend package: hoppa-backend)
Stack
Node.js, Express, MongoDB (Mongoose)
Architecture
REST API serving a public customer frontend and a separate admin frontend
Auth
JWT for admins only; customers are unauthenticated
Database
MongoDB — bookings, products, categories, quotes, contacts, notifications, settings
Integrations
Google Maps (distance/geocoding), Google Places/Reviews, Cloudinary (images), Nodemailer/Gmail (email), node-cron (hourly overdue checks)
Deployment context
Dutch market (21% VAT, Dutch email copy, .nl domain references)
Ambiguity flagged: Several admin-capable endpoints (categories, notifications, reporting, transport/VAT settings, listing quotes/contacts) are not protected by authentication in the backend code — access control may rely entirely on the frontend, or this may be an incomplete security layer.

This document describes Hoppa Verhuur as a Dutch event equipment rental business: customers book online without accounts; Hoppa’s team runs fulfillment, pricing, and operations through a single admin interface; revenue is rental + delivery + service fees with manual payment collection.